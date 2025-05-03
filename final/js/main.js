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
let scene, camera, renderer, mixer, mixer2, sori, nana, kitchen, fish, carrot, musicplayer, lightLeft, lightRight;
// animation variables
let actionSit, actionHead, actionSit2, actionHead2;

let fishVisible = false;
let carrotVisible = false;
let musicplayerVisible = false;
let nanaVisible = false;
let lightsOn = true;

const clickSound = document.getElementById('click-sound');

function playClickSound() {
    if (clickSound) {
        clickSound.currentTime = 0; // rewind if playing
        clickSound.play();
    }
}

// animation variables
let actionNod;

// ~~~~~~~~~~~~~~~~ Initialize Scene in init() ~~~~~~~~~~~~~~~~
function init() {

    // ~~~~~~Set up scene, camera, + renderer ~~~~~~

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

   camera.position.set (6,2,-4);
//    camera.position.set (2,1,4);




    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    // ~~~~~~ Add Lights ~~~~~~
    // Add helpers to debug the lights' position - COMMENT OUT WHEN DONE placing the light! https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper

    lightRight = new THREE.DirectionalLight(0xe69a78, 3);
    lightRight.position.set(3, 4, 5);
    scene.add(lightRight);
    
    // const helperRight = new THREE.DirectionalLightHelper(lightRight, 5);
    // scene.add(helperRight);
    
    lightLeft = new THREE.DirectionalLight(0xd6e678, 3);
    lightLeft.position.set(-3, 4, 5);
    scene.add(lightLeft);

    
    
    // const helperLeft = new THREE.DirectionalLightHelper(lightLeft, 5);
    // scene.add(helperLeft);





    // ~~~~~~ Initiate add-ons ~~~~~~

    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); // to load 3d models



    // --> Load glTF


    // // load kitchen model
    loader.load('assets/kitchen.gltf', function (gltf) {
        kitchen = gltf.scene;
        scene.add(kitchen);
        kitchen.scale.set(1, 1, 1); // scale your model
        kitchen.position.y = -3; // set initial position
        kitchen.rotate = 90; // set initial position


    }); 

      // // load fish model
      loader.load('assets/fishplate.gltf', function (gltf) {
        fish = gltf.scene;
        scene.add(fish);
        fish.scale.set(1, 1, 1);
        fish.position.y = -3;
        fish.rotate = 90;
    
        fish.visible = fishVisible; // initially hidden
    });

       // // load carrot model
       loader.load('assets/carrot.gltf', function (gltf) {
        carrot = gltf.scene;
        scene.add(carrot);
        carrot.scale.set(1, 1, 1);
        carrot.position.y = -3;
        carrot.rotate = 90;
    
        carrot.visible = carrotVisible; // initially hidden
    });

    // // load music player model
    loader.load('assets/musicplayer.gltf', function (gltf) {
        musicplayer = gltf.scene;
        scene.add(musicplayer);
        musicplayer.scale.set(1, 1, 1);
        musicplayer.position.y = -3;
        musicplayer.rotate = 90;

        musicplayer.visible = musicplayerVisible; // initially hidden
    });

    // characters
     // // load sori model
     loader.load('assets/sori.gltf', function (gltf) {
        sori = gltf.scene;
        scene.add(sori);
        sori.scale.set(1, 1, 1); // scale your model
        sori.position.y = -3; // set initial position



          // animation
          mixer = new THREE.AnimationMixer(sori);
          const clips = gltf.animations;

          clips.forEach(function(clip){
            const action = mixer.clipAction(clip);
       
        });

       // // load + play animation
       const clipHead = THREE.AnimationClip.findByName(clips, 'Head');
       actionHead = mixer.clipAction(clipHead);
       actionHead.setLoop(THREE.LoopRepeat);
       actionHead.paused = true;

       const clipSit = THREE.AnimationClip.findByName(clips,'Sit');
       actionSit = mixer.clipAction(clipSit);
       actionSit.play();
    
     }); 
     
     loader.load('assets/nana.gltf', function (gltf) {
        nana = gltf.scene;
        scene.add(nana);
        nana.scale.set(1, 1, 1);
        nana.position.y = -3;
        nana.visible = nanaVisible;
    
        mixer2 = new THREE.AnimationMixer(nana);
        const clips2 = gltf.animations;
    
        const clipSit2 = THREE.AnimationClip.findByName(clips2, 'Sit2');
        if (clipSit2) {
            actionSit2 = mixer2.clipAction(clipSit2);
            actionSit2.setLoop(THREE.LoopRepeat);
            actionSit2.play(); // plays immediately when Nana is shown
        }
    
        const clipHead2 = THREE.AnimationClip.findByName(clips2, 'Head2');
        if (clipHead2) {
            actionHead2 = mixer2.clipAction(clipHead2);
            actionHead2.setLoop(THREE.LoopRepeat);
            actionHead2.paused = true;
        }
    });

   
   
    // ~~~~~~Position Camera~~~~~~
    



    
 

}

// event listener

// cat
let isNodding = false;

document.querySelector("#music").addEventListener("click", () => {
    if (!isNodding) {
        if (actionHead) {
            actionHead.play();
            actionHead.paused = false;
        }
        if (actionHead2) {
            actionHead2.play();
            actionHead2.paused = false;
        }
       
    } else {
        if (actionHead) actionHead.paused = true;
        if (actionHead2) actionHead2.paused = true;

    }
    isNodding = !isNodding;
});




// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    if (mixer2) mixer2.update(delta);
   

    
    

    // always end animation loop with renderer
    renderer.render(scene, camera);
    
}

// fish on/off
document.getElementById('fish').addEventListener('click', () => {
    if (fish) {
        fishVisible = !fishVisible;
        fish.visible = fishVisible;
    }
});
document.getElementById('carrot').addEventListener('click', () => {
    if (carrot) {
        carrotVisible = !carrotVisible;
        carrot.visible = carrotVisible;
    }
});
document.getElementById('bunny').addEventListener('click', () => {
    if (nana) {
        nanaVisible = !nanaVisible;
        nana.visible = nanaVisible;

       
    }
});
// light on/off
document.getElementById('lighting').addEventListener('click', () => {
    lightsOn = !lightsOn;
    if (lightLeft) lightLeft.visible = lightsOn;
});



const audio = document.getElementById('song');
let isPlaying = false;

document.getElementById('music').addEventListener('click', () => {
    if (!audio) return;

    if (isPlaying) {
        audio.pause();
        audio.currentTime = 0; // rewind to start
    } else {
        audio.play();
    }

    isPlaying = !isPlaying;

    if (musicplayer) {
        musicplayerVisible = !musicplayerVisible;
        musicplayer.visible = musicplayerVisible;
    }
});
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        playClickSound();
    });
});

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('DOMContentLoaded', () => {
    const colorSelect = document.getElementById('color-select');
    if (colorSelect) {
        colorSelect.addEventListener('change', (event) => {
            const hex = event.target.value;
            const newColor = new THREE.Color(hex);
            if (lightLeft) lightLeft.color.set(newColor);
            if (lightRight) lightRight.color.set(newColor);
            playClickSound(); // optional
        });
    }
});

window.addEventListener('resize', onWindowResize, false);

init(); // execute initialize function
animate(); // execute animation function

