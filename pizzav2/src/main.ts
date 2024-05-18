import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const loader = new GLTFLoader();

const modelContainer = document.getElementById("model") as HTMLDivElement;
const containerWidth = modelContainer.clientWidth;
const containerHeight = modelContainer.clientHeight;

const camera = new THREE.PerspectiveCamera(
  75,
  containerWidth / containerHeight,
  0.1,
  1000
);
camera.position.set(35, 35, 0);

const light = new THREE.PointLight(0xfffc7f, 1000);
const light1 = new THREE.PointLight(0xffbb7f, 1500);
const light2 = new THREE.PointLight(0xffbb7f, 500);
const amblight = new THREE.AmbientLight(0xfff4eb, 2);
light.position.set(0, 30, 0);
light1.position.set(10, 30, 10);
light2.position.set(-10, 30, -10);
light1.rotateZ(90);
scene.add(light, light1, light2, amblight);

loader.load(
  "pizza/scene.gltf",
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.log(error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(containerWidth, containerHeight);
modelContainer.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.enableRotate = true;
controls.enableDamping = true;
controls.update();
controls.autoRotate = true;
controls.minPolarAngle = controls.maxPolarAngle = Math.PI * 0.3;

// const gridHelper = new THREE.GridHelper(1000, 100);
// const lightHelper = new THREE.PointLightHelper(light);
// const light1Helper = new THREE.PointLightHelper(light1);
// const light2Helper = new THREE.PointLightHelper(light2);
// const axisHelper = new THREE.AxesHelper(100);
// scene.add(gridHelper, lightHelper, axisHelper, light1Helper, light2Helper);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();

window.addEventListener("resize", () => {
  const containerWidth = modelContainer.clientWidth;
  const containerHeight = modelContainer.clientHeight;

  camera.aspect = containerWidth / containerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(containerWidth, containerHeight);
});
