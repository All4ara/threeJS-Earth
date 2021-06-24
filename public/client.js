import * as THREE from '/build/three.module.js';
//console.log(THREE);
import { OrbitControls } from '/jsm/controls/OrbitControls.js';
//console.log(OrbitControls)
import Stats from '/jsm/libs/stats.module.js';
//console.log(Stats)

let scene;
let camera;
let renderer;
const canvas = document.querySelector('.webgl');

scene = new THREE.Scene();

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixalRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

renderer.render(scene, camera)