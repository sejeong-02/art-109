/* 
glTF import:
- glTF loader imported + enabled
-Global variable added to store cat gltf
-Two directional lights added to view glTF
- Added HELPERS to debug light position (disable after you place them)
-glTF imported from blender (not it is an *embedded* .glTF file, not .glb)
-Changed material on ball from BASIC to STANDARD so that the geometry catches light
*/


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~ Declare Global Variables~~~~~~~~~~~~~~~~
let scene, camera, renderer, cat, fish, mixer;

// animation variables
let actionNod, actionHand;

// ~~~~~~~~~~~~~~~~ Initialize Scene in init() ~~~~~~~~~~~~~~~~
function init() {

    // ~~~~~~Set up scene, camera, + renderer ~~~~~~

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x78bee6);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    // ~~~~~~ Add Lights ~~~~~~
    // Add helpers to debug the lights' position - COMMENT OUT WHEN DONE placing the light! https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper

    // ~~ add directional light 
    const lightRight = new THREE.DirectionalLight(0xe69a78, 3);
    lightRight.position.set(3, 4, 5);
    scene.add(lightRight);

    const helperRight = new THREE.DirectionalLightHelper(lightRight, 5);
    scene.add(helperRight); // comment out when done placing light


    // ~~ add directional light 
    const lightLeft = new THREE.DirectionalLight(0xd6e678, 3);
    lightLeft.position.set(-3, 4, 5);
    scene.add(lightLeft);

    const helperLeft = new THREE.DirectionalLightHelper(lightLeft, 5);
    scene.add(helperLeft); // comment out when done placing light






    // ~~~~~~ Initiate add-ons ~~~~~~

    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); // to load 3d models



    // ~~~~~~ Create Geometry ~~~~~~

    // // ---> create ball
    // const geometry = new THREE.SphereGeometry(0.2, 9, 9);

    // // -> change material from Basic to standard for geometry to capture lights
    // // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

    // const texture = new THREE.TextureLoader().load('textures/grasslight-big.jpg');

    // const material = new THREE.MeshStandardMaterial({ map: texture });
    // // texture.minFilter = THREE.LinearFilter; // makes image sharper but aliased

    // ball = new THREE.Mesh(geometry, material);
    // scene.add(ball);



    // --> Load glTF

    // load fish dish model
    loader.load('assets/fish.gltf', function (gltf) {
        fish = gltf.scene;
        scene.add(fish);
        fish.scale.set(1.5, 1.5, 1.5); // scale your model
        fish.position.set(0,0,0);
        fish.position.y = -2; // set initial position

    })
    // load cat model
    loader.load('assets/cat5.gltf', function (gltf) {
        cat = gltf.scene;
        scene.add(cat);
        cat.scale.set(1, 1, 1); // scale your model
        cat.position.y = 0; // set initial position

    // animation
    mixer = new THREE.AnimationMixer(cat);
    const clips = gltf.animations;

    // load + play animation
    const clipNod = THREE.AnimationClip.findByName(clips,'Noddinghead');
    actionNod = mixer.clipAction(clipNod);
    actionNod.play();

    const clipHand = THREE.AnimationClip.findByName(clips,'Wavinghand');
    actionHand = mixer.clipAction(clipHand);
    actionHand.play();

});
    // ~~~~~~Position Camera~~~~~~
    camera.position.z = 5;
 

}

// event listener

let mouseIsDown = false;

document.querySelector("body").addEventListener("mousedown", () =>{
    actionNod.play();
    actionNod.paused = false;
    mouseIsDown = true;
    console.log("mousedown");

})

document.querySelector("body").addEventListener("mouseup", () =>{
    mouseIsDown = false;
    actionNod.paused = true;
    console.log("mouseup");
})

document.querySelector("body").addEventListener("mousemove", () =>{
    if (mouseIsDown) {
    console.log("mousemove");
    }
})

// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓

    if (mixer)
        mixer.update(clock.getDelta());

    fish.position.x += 0.2;
    fish.position.y += 0.2;
   

    fish.position.x = Math.sin(Date.now() / 2000) * 1.5;
    fish.position.y = Math.sin(Date.now() / 4000) * 1.5;
    fish.position.z = Math.sin(Date.now() / 2000) * 1.5;

   

    
    

    // always end animation loop with renderer
    renderer.render(scene, camera);
    
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);

init(); // execute initialize function
animate(); // execute animation function

