<script lang="ts">
  import DialogueBox, {
    playDialogue,
    type dialogue,
  } from "./lib/Dialogue.svelte";
  import { characters } from "./lib";
  import * as THREE from "three";
  import { onMount } from "svelte";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();

  onMount(() => {
    console.log("Hey")
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
  });
</script>

<div class="container">
  <DialogueBox />
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
  }
</style>
