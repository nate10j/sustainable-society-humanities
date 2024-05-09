<script lang="ts">
  import DialogueBox, { sayDialogue } from "./lib/Dialogue.svelte";
  import { characters } from "./lib";
  import * as THREE from "three";

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

  sayDialogue(
    characters.Nathan,
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odit quidem placeat doloremque eligendi inventore eius, necessitatibus exercitationem non enim repellendus illum explicabo ut alias suscipit quos ipsam totam dolorem.",
  );
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
