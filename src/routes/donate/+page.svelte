<script lang="ts">
  import { onMount } from "svelte";

  let canvasElement: HTMLCanvasElement;
  let canvas: CanvasRenderingContext2D | null;
  let video: HTMLVideoElement;
  let stream: MediaStream;

  onMount(() => {
    canvas = canvasElement.getContext("2d");
    video = document.createElement("video");

    if (!canvas) {
      throw new Error("Failed to get 2D context");
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment", width: 720, height:1280 } })
      .then(function (streamT) {
        stream = streamT;
        video.srcObject = streamT;
        video.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
        video.play();
        const {width, height} = stream.getVideoTracks()[0].getSettings();
       // alert(`width: ${width}, height: ${height}`);
        requestAnimationFrame(tick);
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  function tick() {
    if (!canvas) {
      throw new Error("Failed to get 2D context");
    }

    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    requestAnimationFrame(tick);
  }
</script>

<video>
    <canvas bind:this={canvasElement} class="w-full h-[700]"> </canvas>
</video>
