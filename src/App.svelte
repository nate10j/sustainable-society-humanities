<script lang="ts">
  import DialogueBox, { playDialogue } from "./lib/Dialogue.svelte";
  import { characters } from "./lib";
  import * as THREE from "three";
  import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
  import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
  import { DRACOLoader } from "three/examples/jsm/Addons.js";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
  import { onMount } from "svelte";

  let loadingScreen: HTMLDivElement;
  let container: HTMLDivElement;
  let progressBar: HTMLDivElement;

  const dracoLoader = new DRACOLoader();
  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();

  let pastHumModel: any;

  dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
  );
  dracoLoader.setPath("/sustainable-society-humanities/models/hum/");
  mtlLoader.setPath("/sustainable-society-humanities/models/hum/");
  objLoader.setPath("/sustainable-society-humanities/models/hum/");

  dracoLoader.setDecoderConfig({ type: "js" });

  mtlLoader.load(
    "hum.mtl",
    (materials: any) => {
      materials.preload();
      dracoLoader.load(
        "hum.drc",
        (geometry: any) => {
          console.log(geometry);
          const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
          });
          const mesh = new THREE.Mesh(geometry, material);
          pastHumModel = mesh;
          initialize();
        },
        (xhr: any) => {
          progressBar.style.width = `${(xhr.loaded / xhr.total) * 100}%`;
        },
        (error: any) => {
          console.error("Error loading OBJ file:", error);
        },
      );
    },
    undefined,
    (error: any) => {
      console.error("Error loading MTL file:", error);
    },
  );

  function initialize() {
    loadingScreen.style.display = "none";
    container.style.display = "flex";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    scene.background = new THREE.Color("#011226");

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    pastHumModel.position.set(9, -5, 14);
    pastHumModel.scale.set(5, 5, 5);
    scene.add(pastHumModel);

    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    scene.add(ambientLight);

    camera.position.z = 5;
    controls.update();

    function animate() {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }

    animate();

    playDialogue([
      {
        character: characters.Nathan,
        content:
          "Hello ladies and gentlemen! Hello ladies and gentlemen! Hello ladies and gentlemen!",
      },
      {
        character: characters.Nathan,
        content: "Our names are... Lets start with me, my name is Nathan!",
      },
      { character: characters.Lucas, content: "And my name is lucas" },
      { character: characters.ChunYin, content: "And my name is ChunYin" },
      { character: characters.Joshua, content: "I am Joshua" },
    ]);
  }
</script>

<div class="loading-screen" bind:this={loadingScreen}>
  <h1 class="loading-text">LOADING...</h1>
  <div class="progress-container">
    <div id="progress-bar" class="progress-bar" bind:this={progressBar}></div>
  </div>
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
