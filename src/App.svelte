<script lang="ts">
  import DialogueBox, { playDialogue } from "./lib/Dialogue.svelte";
  import { characters } from "./lib";
  import * as THREE from "three";
  import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
  import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
  import { onMount } from "svelte";

  let loadingScreen: HTMLDivElement;
  let container: HTMLDivElement;
  let progressBar: HTMLDivElement;

  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();

  let pastHumModel: any;

  mtlLoader.setPath("/sustainable-society-humanities/models/hum/");
  objLoader.setPath("/sustainable-society-humanities/models/hum/");
  mtlLoader.load(
    "hum.mtl",
    (materials: any) => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load(
        "hum.obj",
        (object: any) => {
          pastHumModel = object;
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

    scene.background = new THREE.Color("#001340");

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);

    scene.add(pastHumModel);

    let light = new THREE.DirectionalLight("white", 3);
    scene.add(light);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

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
