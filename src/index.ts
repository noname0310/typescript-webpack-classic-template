import * as THREE from "three/src/Three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100);
camera.position.z = 4;

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xbfe3dd );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const transformControls = new TransformControls(camera, renderer.domElement);
transformControls.addEventListener("dragging-changed", (event) => {
    orbitControls.enabled = !event.value;
});
transformControls.attach(cube);


// object:
// add constraint to position drag (x, y, z) to -1..1


// reference:
//
// docs: https://threejs.org/docs/#examples/en/controls/TransformControls
// js: https://github.com/mrdoob/three.js/blob/dev/examples/jsm/controls/TransformControls.js


// problem:
// d.ts missing properties!

// console.log(transformControls.minX);
// console.log(transformControls.maxX);
// console.log(transformControls.minY);
// console.log(transformControls.maxY);
// console.log(transformControls.minZ);
// console.log(transformControls.maxZ);

// solution
// 1. as unknown as { property: type }
// 2. extend the class and add the properties
// 3. declare module "three/examples/jsm/controls/TransformControls" { ... }
// 4. modify the d.ts file in node_modules/@types/three
// see https://github.com/three-types/three-ts-types/commit/85f9126f255d44f6c2953973bd45a4cb93263749#diff-4aa296977cfd8d50c2b0c2b53e561700a0ccf04953c2000b437afebbaa311693R66

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "t":
            transformControls.setMode("translate");
            break;
        case "r":
            transformControls.setMode("rotate");
            break;
        case "s":
            transformControls.setMode("scale");
            break;
    }
});

const scaleSnapDisplayDiv = document.createElement("div");
scaleSnapDisplayDiv.style.position = "absolute";
scaleSnapDisplayDiv.style.top = "0";
scaleSnapDisplayDiv.style.left = "0";
scaleSnapDisplayDiv.style.color = "white";
scaleSnapDisplayDiv.style.backgroundColor = "black";
document.body.appendChild(scaleSnapDisplayDiv);

transformControls.setScaleSnap(0.1);

// object:
// increase and drcrease scale snap value on key press

// problem:
// d.ts missing properties!

// console.log(transformControls.scaleSnap);

// solution
// same as the previous solution
// + add new field which has the same state as the original field
// see https://github.com/three-types/three-ts-types/pull/1336

// scaleSnapDisplayDiv.innerText = "Scale Snap: " + transformControls.scaleSnap;

// document.addEventListener("keydown", (event) => {
//     switch (event.key) {
//         case "ArrowUp":
//             transformControls.setScaleSnap(Math.min(transformControls.scaleSnap + 0.1, 3.0));   
//             scaleSnapDisplayDiv.innerText = "Scale Snap: " + transformControls.scaleSnap;
//             break;
//         case "ArrowDown":
//             transformControls.setScaleSnap(Math.max(transformControls.scaleSnap - 0.1, 0.1));
//             scaleSnapDisplayDiv.innerText = "Scale Snap: " + transformControls.scaleSnap;
//             break;
//     }
// });

const helper = transformControls.getHelper();
scene.add(helper);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-10, 10, 10);
scene.add(light);

function animate() {
    orbitControls.update();
    renderer.render(scene, camera);
}
