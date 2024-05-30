<script lang="ts">
  import DialogueBox, { playDialogue } from "./lib/Dialogue.svelte";
  import { characters } from "./lib";
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import { DRACOLoader } from "three/examples/jsm/Addons.js";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

  let loadingScreen: HTMLDivElement;
  let container: HTMLDivElement;
  let progressBar: HTMLDivElement;
  let futureContainer: HTMLDivElement;
  let futureInputContainer: HTMLDivElement;
  let futureInput: HTMLInputElement;

  let futureBadVideo: HTMLIFrameElement;
  let futureGoodVideo: HTMLIFrameElement;

  const dracoLoader = new DRACOLoader();
  const gltfLoader = new GLTFLoader();

  let pastHumModel: any;

  dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
  );
  dracoLoader.setPath("/sustainable-society-humanities/models/hum/");
  gltfLoader.setPath("/sustainable-society-humanities/models/hum/");

  dracoLoader.setDecoderConfig({ type: "js" });

  gltfLoader.setDRACOLoader(dracoLoader);

  gltfLoader.load(
    "hum.gltf",
    (gltf: any) => {
      pastHumModel = gltf.scene;
      initialize();
    },
    (xhr: any) => {
      progressBar.style.width = `${(xhr.loaded / xhr.total) * 100}%`;
      console.log((xhr.loaded / xhr.total) * 100);
    },
    (error: any) => {
      console.error("Error loading OBJ file:", error);
    },
  );

  function initialize() {
    loadingScreen.style.display = "none";
    container.style.display = "flex";

    playDialogue([
      {
        character: characters.Nathan,
        content:
          "Hello ladies and gentlemen! Hello ladies and gentlemen! Hello ladies and gentlemen!!!!!! ! ! ! !(Enter to continue)",
      },
      {
        character: characters.Nathan,
        content: "Our names are... Lets start with me, my name is Nathan!",
      },
      { character: characters.Lucas, content: "And my name is lucas" },
      { character: characters.ChunYin, content: "And my name is ChunYin" },
      { character: characters.Joshua, content: "I am Joshua" },
      {
        character: characters.Lucas,
        content: "Anyway, we are sustainable penguins",
      },
      {
        character: characters.Joshua,
        content: `This is the research question “How does redesigning buildings in Hong Kong make them more sustainable?"`,
      },
      {
        character: characters.Joshua,
        content:
          " Our research question was made because our topic was spatial, so we decided to make a building design for redesigning buil-",
      },
      { character: characters.ChunYin, content: "Lets stop that yapicuino" },
      { character: characters.Joshua, content: "😡" },
      { character: characters.Lucas, content: "..." },
      { character: characters.Lucas, content: "Wait... Somethings wrong" },
      { character: characters.Joshua, content: "What is it Lucas?" },
      {
        character: characters.Lucas,
        content: "AHHH WHAT IS HAPPENING????",
      },
      {
        character: characters.Nathan,
        content: "We are going into the PAST!!!! 😱",
      },
      {
        character: characters.Nathan,
        content: "...",
        callback: () => {
          scene.add(pastHumModel);
        },
      },
      {
        character: characters.ChunYin,
        content:
          "Oh! I think I remember this place! This is Kai Tak Area! Pan, drag, scroll to move camera",
      },
      {
        character: characters.Joshua,
        content:
          "The main reason for unsustainable buildings is that most of the recent architecture is all made up of non-eco-friendly material with things like biodegradable materials. There are also things such as not enough green and water and air pollution. They do not use susta-",
      },
      { character: characters.Nathan, content: "ERMMM WHAT THE SIGMA/?" },
      {
        character: characters.Nathan,
        content: "Thats enough, lets go to the future!",
      },
      {
        character: characters.Lucas,
        content: "TYPE FUTURE TO LOOK AT THE FUTURE!",
        callback: () => {
          console.log("FUTURE");
          futureInputContainer.style.display = "flex";
          futureContainer.style.display = "flex";
        },
      },
    ]);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    // light blue background
    scene.background = new THREE.Color("#87ceeb");

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    pastHumModel.position.set(9, -5, 14);
    pastHumModel.scale.set(5, 5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    scene.add(ambientLight);

    camera.position.z = 5;
    controls.update();

    function animate() {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }

    animate();
  }

  function goToFuture() {
    if (futureInput.value.toLowerCase() === "future") {
      futureContainer.style.display = "none";
      futureInputContainer.style.display = "none";

      console.log("FUTURE BALLS");
      playDialogue([
        {
          character: characters.Lucas,
          content: "AHHHH WHAT IS THIS PLACE!!! WHY IS IT SO... HOT! 🥵",
          callback: () => {
            futureContainer.style.display = "flex";
            futureBadVideo.style.display = "block";
          },
        },
        {
          character: characters.Lucas,
          content: "... is this really the future?",
        },
        {
          character: characters.Joshua,
          content:
            "It looks like it. The air and water pollution is so bad!!!!! 😭",
        },
        {
          character: characters.Lucas,
          content: "...",
        },
        {
          character: characters.Nathan,
          content: "Ohhh this is horrible! We have to do something!",
        },
        {
          character: characters.ChunYin,
          content:
            "I think I know what to do! We have change the timeline by going back to the past! ",
        },
        {
          character: characters.ChunYin,
          content: "Be right back!",
        },
        {
          character: characters.ChunYin,
          content: "IM BACK! I MADE BUILDINGS MORE SUSTAINABLE!",
          callback: () => {
            futureGoodVideo.style.display = "block";
            futureBadVideo.style.display = "none";
          },
        },
        {
          character: characters.Nathan,
          content: "WOAHHH! THE FUTURE IS SO SUSTAINABLE!",
        }
      ]);
    }
  }
</script>

<div class="loading-screen" bind:this={loadingScreen}>
  <h1 class="loading-text">LOADING...</h1>
  <div class="progress-container">
    <div id="progress-bar" class="progress-bar" bind:this={progressBar}></div>
  </div>
</div>

<div class="future-container" bind:this={futureContainer}>
  <div class="future-input-container" bind:this={futureInputContainer}>
    <form on:submit|preventDefault={goToFuture}>
      <input
        type="text"
        class="future-input"
        placeholder="FUTURE"
        bind:this={futureInput}
      />
    </form>
  </div>

  <iframe
    title="future-bad-video"
    class="future-bad-video"
    src="https://www.youtube.com/embed/TC1ZWXVyVlk"
    width="100%"
    height="100%"
    bind:this={futureBadVideo}
  ></iframe>

  <iframe
    title="future-good-video"
    class="future-good-video"
    src="https://www.youtube.com/embed/JSgpCpocmgI"
    width="100%"
    height="100%"
    bind:this={futureGoodVideo}
  ></iframe>
</div>

<div class="container" bind:this={container}>
  <DialogueBox />
</div>

<style>
  .container {
    display: none;
    justify-content: center;
  }

  .loading-screen {
    display: flex; /* Initially hidden */
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fff;
    color: #000;
  }

  .future-container {
    position: fixed;
    display: none;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }

  .future-input-container {
    display: none;
  }

  .future-input {
    width: 300px;
    height: 50px;
    border: 1px solid #ddd;
  }

  .future-bad-video {
    display: none;
  }

  .future-good-video {
    display: none;
  }

  .progress-container {
    width: 300px;
    height: 20px;
    background-color: #ddd;
    overflow: hidden;
  }

  .progress-bar {
    width: 0%;
    height: 100%;
    background-color: #4caf50;
  }
</style>
