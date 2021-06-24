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
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
});

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5);
scene.add(pointLight)


renderer.render(scene, camera);
