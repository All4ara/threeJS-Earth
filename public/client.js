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
camera.position.z = 50;
scene.add(camera);

renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

const controls = new OrbitControls(camera, renderer.domElement);

const earthGeometry = new THREE.SphereGeometry(5, 32, 32);

const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map : THREE.ImageUtils.loadTexture('texture/earthmap1k.jpeg'),
    bumpMap : THREE.ImageUtils.loadTexture('texture/earthbump.jpeg'),
    bumpScale: 0.5,
});

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

const cloudGeometry = new THREE.SphereGeometry(5.03, 32, 32);

const cloudMaterial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('texture/earthCloud.png'),
    transparent:  true
});

const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

const starGeomerty = new THREE.SphereGeometry(200,64,64);

const starMaterial = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('texture/galaxy.png'),
    side: THREE.BackSide,
});

const starMesh = new THREE.Mesh(starGeomerty, starMaterial);
scene.add(starMesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(200, 3, 5);
scene.add(pointLight)

const Helper = new THREE.PointLightHelper(pointLight);
scene.add(Helper);

//////////////////Moon

var r = 35;
var theta = 0;
var dTheta = 2 * Math.PI / 1500;


const moonGeometry = new THREE.SphereGeometry(3, 50, 50);

const moonMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map : THREE.ImageUtils.loadTexture('texture/moon1k.jpeg'),
    bumpMap : THREE.ImageUtils.loadTexture('texture/moonBump.jpeg'),
    bumpScale: 0.5,
});

const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
moonMesh.position.set(35,0,0)
scene.add(moonMesh);

///////////Camera Scene
var earthVec = new THREE.Vector3(0,0,0);

var dx = .01;
var dy = -.01;
var dz = -.05;





window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}, false);

const animate = () => {
    requestAnimationFrame(animate);
    earthMesh.rotation.y -= 0.0015;
    cloudMesh.rotation.y -= 0.001;
    starMesh.rotation.y -= 0.002
    theta += dTheta;
    moonMesh.position.x = r * Math.cos(theta);
    moonMesh.position.z = r * Math.sin(theta);

    //Update the camera position
    camera.position.x += dx;
    camera.position.y += dy;
    camera.position.z += dz;

    //Flyby reset
    if (camera.position.z < -100) {
        camera.position.set(0,35,70);
    }

    //Point the camera towards the earth
    camera.lookAt(earthVec);
    controls.update();
    render();
}

const render = () => {
    renderer.render(scene, camera);
}

animate();
