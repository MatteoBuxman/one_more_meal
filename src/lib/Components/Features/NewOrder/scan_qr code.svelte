<script lang="ts">
  import type { Point, SuccessfulQRCodeScanCallback } from "$lib/Types/qr_code";
  import jsQR from "jsqr";
  import { onMount, onDestroy } from "svelte";
  import { Camera, X } from "lucide-svelte";

  let { scanSuccess }: { scanSuccess: SuccessfulQRCodeScanCallback } = $props();

  //0 = loadingCamera, 1 = scanning, 2 = success intermission, 3 = error
  let scanState: 0 | 1 | 2 | 3 = $state(0);

  let video: HTMLVideoElement;
  let canvasElement: HTMLCanvasElement;
  let canvas: CanvasRenderingContext2D | null;
  let stream: MediaStream;

  let scannedData: string = $state("");

  function drawLine(begin: Point, end: Point, color: string) {
    if (canvas === null) {
      throw Error("Canvas is null. Failed to get 2D context.");
    }

    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 3;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  onMount(() => {
    canvas = canvasElement.getContext("2d", { willReadFrequently: true });
    video = document.createElement("video");

    if (!canvas) {
      throw new Error("Failed to get 2D context");
    }

    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "environment", width: 256, height: 256 },
      })
      .then(function (streamT) {
        stream = streamT;
        video.srcObject = streamT;
        video.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
        video.play();
        scanState = 1;
        requestAnimationFrame(tick);
      })
      .catch(function (err) {
        scanState = 3;
      });
  });

  onDestroy(() => {
    stopCamera();
  });

  function stopCamera() {
    if (stream) {
      // Stop all tracks
      stream.getTracks().forEach((track) => track.stop());
    }
  }

  function tick() {
    if (!canvas) {
      scanState = 3;
      return;
    }

    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    const imageData = canvas.getImageData(
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    if (code) {
      drawLine(
        code.location.topLeftCorner,
        code.location.topRightCorner,
        "#22c55e"
      );
      drawLine(
        code.location.topRightCorner,
        code.location.bottomRightCorner,
        "#22c55e"
      );
      drawLine(
        code.location.bottomRightCorner,
        code.location.bottomLeftCorner,
        "#22c55e"
      );
      drawLine(
        code.location.bottomLeftCorner,
        code.location.topLeftCorner,
        "#22c55e"
      );

      scannedData = code.data;
      scanState = 2;
      pauseScanningAfterQRCode();
      return;
    }

    requestAnimationFrame(tick);
  }

  function pauseScanningAfterQRCode() {
    setTimeout(() => {
      const rndParam = extractParamsFromURL(scannedData);
      if (rndParam) {
        //Scansuccess returns a bool which determines whether the scanner should continue scanning
        const continueBool = scanSuccess(rndParam);
        if (continueBool) {
          requestAnimationFrame(tick);
          scanState = 1;
        }
      }
    }, 2500);
  }

  function extractParamsFromURL(url: string) {
    const urlParams = new URL(url);
    return urlParams.searchParams.get("rnd");
  }
</script>


    <div class="absolute inset-0">
      <!-- Scanner Viewport -->
      <div
        class="absolute inset-0 flex flex-col gap-4 items-center justify-center"
      >
        {#if scanState === 0}
          <div class="flex items-center space-x-2 text-black">
            <Camera size={24} />
            <span>Starting camera...</span>
          </div>
        {/if}

        {#if scanState === 2}
          <div class="text-green-500 flex flex-col items-center justify-center">
            <h1 class="text-lg font-bold">Success🫡</h1>
            <img
              class="size-8"
              src="/green_tick.svg"
              alt="success_tick_animation"
            />
          </div>
        {/if}

        <!-- Scanning frame -->
        <div
          class="relative w-64 h-64 {scanState === 1 || scanState === 2
            ? 'block'
            : 'hidden'}"
        >
          <canvas
            bind:this={canvasElement}
            class="h-full w-full rounded-lg mx-auto"
          ></canvas>

          <!-- Corner markers -->
          <div
            class="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 {scanState ===
            2
              ? 'border-green-400'
              : 'border-black'}"
          ></div>
          <div
            class="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 {scanState ===
            2
              ? 'border-green-400'
              : 'border-black'}"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 {scanState ===
            2
              ? 'border-green-400'
              : 'border-black'}"
          ></div>
          <div
            class="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 {scanState ===
            2
              ? 'border-green-400'
              : 'border-black'}"
          ></div>

          <!-- Scanning animation -->
          <div
            class="absolute top-0 left-0 right-0 h-1 {scanState === 2
              ? 'border-green-400'
              : 'border-black'}  animate-scan"
          ></div>

          <!-- Camera icon -->
          <div
            class="absolute inset-0 flex items-center justify-center text-white opacity-20"
          >
            <Camera size={48} />
          </div>
        </div>

        {#if scanState === 3}
          <div
            class="flex flex-col gap-4 items-center space-x-2 text-red-400 px-4"
          >
            <span class="text-center"
              >Please grant permission to access your camera.</span
            >
            <X size={24} />
          </div>
        {/if}
      </div>

      <!-- Instructions -->
      <div class="absolute bottom-0 left-0 right-0 p-8 text-center text-black">
        <p class="text-lg mb-2">Position QR code within frame</p>
        <p class="text-sm text-gray-400">
          Scanner will automatically detect the code
        </p>
      </div>
    </div>


<style>
  /* Scanning animation */
  @keyframes scan {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(256px);
    }
    100% {
      transform: translateY(0);
    }
  }

  :global(.animate-scan) {
    animation: scan 4s linear infinite;
  }
</style>
