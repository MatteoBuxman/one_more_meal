<script lang="ts">
  import type { Point, SuccessfulQRCodeScanCallback } from "$lib/Types/qr_code";
  import jsQR from "jsqr";
  import { onMount, onDestroy } from "svelte";

  let { scanSuccess } : {scanSuccess : SuccessfulQRCodeScanCallback} = $props();

  let video: HTMLVideoElement;
  let canvasElement: HTMLCanvasElement;
  let canvas: CanvasRenderingContext2D;
  let loadingMessage: HTMLDivElement;
  let outputContainer: HTMLDivElement;
  let stream: MediaStream


  let scannedData: string = $state('');

  function drawLine(begin: Point, end: Point, color: string) {
    if (canvas === null) {
      throw Error("Canvas is null. Failed to get 2D context.");
    }

    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  onMount(() => {
    video = document.createElement("video");
    canvas = canvasElement.getContext("2d") as CanvasRenderingContext2D;
    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
        stream = stream;
        video.srcObject = stream;
        video.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
        video.play();
        requestAnimationFrame(tick);
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  onDestroy(() => {
    stopCamera();
  });

  function extractURLParamFromURL(url: string): string {
    const urlParams = url.split("?")[1];
    const params = new URLSearchParams(urlParams);
    return params.get("rnd") as string;
  }

  function tick() {
    if (loadingMessage === null) {
      throw Error("Loading message is null.");
    }

    if (outputContainer === null) {
      throw Error("Output container is null.");
    }

    if (canvas === null) {
      throw Error("Canvas is null. Failed to get 2D context.");
    }

    loadingMessage.innerText = "⌛ Loading video...";
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      loadingMessage.hidden = true;
      canvasElement.hidden = false;
      outputContainer.hidden = false;

      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          "#FF3B58"
        );
        
        scannedData = code.data;
        scanSuccess(extractURLParamFromURL(scannedData));
      } 
    }
    requestAnimationFrame(tick);
  } 

  function stopCamera() {
    if (stream) {
      // Stop all tracks
      stream.getTracks().forEach((track) => track.stop());
      console.log("Camera stopped.");
    }
  }
</script>

<div class="flex flex-col gap-4 font-lexend">
    <h1 class="font-bold text-lg">Scan QR Code</h1>
    <div bind:this={loadingMessage}>
        Please allow access to your camera.
    </div>
    <canvas bind:this={canvasElement} hidden class="aspect-[10/16] w-72 rounded-lg mx-auto"></canvas>
    <div id="output" bind:this={outputContainer} hidden>
        
        <div>
            <b>Data:</b> <span>{scannedData}</span>
        </div>
    </div>
</div>
