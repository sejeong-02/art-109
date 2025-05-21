import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~
let scene, camera, renderer, mixer, mixer2, mixer3, sori, nana, miro,  kitchen, fish, carrot, musicplayer, lightLeft, lightRight, mainlight;
// animation variables
let actionSit, actionHead, actionSit2, actionHead2, actionMiro;
let fishVisible = false;
let carrotVisible = false;
let musicplayerVisible = false;
let nanaVisible = false;
let miroVisible = false;
let lightsOn = true;

const clickSound = document.getElementById('click-sound');

function playClickSound() {
    if (clickSound) {
        clickSound.currentTime = 0; // rewind if playing
        clickSound.play();
    }
}

// ~~~~~~~~~~~~~~~~ Initialize Scene in init() ~~~~~~~~~~~~~~~~
function init() {

    // ~~~~~~Set up scene, camera, + renderer ~~~~~~

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


    camera.position.set (4.6,0,-0.5);
   




//   

 

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    // ~~~~~~ Add Lights ~~~~~~
    // Add helpers to debug the lights' position - COMMENT OUT WHEN DONE placing the light! https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper

    lightRight = new THREE.DirectionalLight(0xe69a78, 4);
    lightRight.position.set(3, 4, 5);
    scene.add(lightRight);
    
    // const helperRight = new THREE.DirectionalLightHelper(lightRight, 5);
    // scene.add(helperRight);
    
    lightLeft = new THREE.SpotLight(0xe6db78, 200);
    lightLeft.position.set(12, 3, 4)
    scene.add(lightLeft);
    
    // const helperLeft = new THREE.SpotLightHelper(lightLeft, 5);
    // scene.add(helperLeft);



    mainlight = new THREE.PointLight(0xe69a78, 50);
    mainlight.position.set(3, 4, 20);
    scene.add(mainlight);
    
    // const helperMain = new THREE.PointLightHelper(mainlight, 5);
    // scene.add(helperMain);

    mainlight = new THREE.PointLight(0xe69a78, 10);
    mainlight.position.set(2, 2, 0);
    scene.add(mainlight);
    
    // const helperMain1 = new THREE.PointLightHelper(mainlight, 5);
    // scene.add(helperMain1);




    // ~~~~~~ Initiate add-ons ~~~~~~

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.maxPolarAngle = Math.PI / 1;
    controls.minPolarAngle = Math.PI / 4;
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
     
     // // load nana model
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

    loader.load('assets/miro.gltf', function (gltf) {
        // Add model to scene
        miro = gltf.scene;
        scene.add(miro);
        miro.scale.set(1, 1, 1);
        miro.position.y = -3;
        miro.visible = miroVisible;
    
        // Setup animation
        mixer3 = new THREE.AnimationMixer(miro);
        const clipMiro = THREE.AnimationClip.findByName(gltf.animations, 'Miro');
    
        if (clipMiro) {
            actionMiro = mixer3.clipAction(clipMiro);
            actionMiro.setLoop(THREE.LoopRepeat); // or THREE.LoopOnce
            actionMiro.play();
        }
    });


}

// event listener

// head animation
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
const clock = new THREE.Clock();
function animate() {

    requestAnimationFrame(animate); // start loop by with frame update

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    if (mixer2) mixer2.update(delta);
    if (mixer3) mixer3.update(delta);

    renderer.render(scene, camera);
    
}

// fish on/off
document.getElementById('fish').addEventListener('click', () => {
    if (fish) {
        fishVisible = !fishVisible;
        fish.visible = fishVisible;
    }
});
// carrot on/off
document.getElementById('carrot').addEventListener('click', () => {
    if (carrot) {
        carrotVisible = !carrotVisible;
        carrot.visible = carrotVisible;
    }
});
// bunny on/off
document.getElementById('bunny').addEventListener('click', () => {
    if (nana) {
        nanaVisible = !nanaVisible;
        nana.visible = nanaVisible;
    }
});
// puppy on/off
document.getElementById('puppy').addEventListener('click', () => {
    if (miro) {
        miroVisible = !miroVisible;
        miro.visible = miroVisible;
    }
});
// light on/off
document.getElementById('lighting').addEventListener('click', () => {
    lightsOn = !lightsOn;
    if (lightLeft) lightLeft.visible = lightsOn;
});

// diff camera angles
let cam1 = new THREE.Vector3(4.6,0,-0.5);
let cam2 = new THREE.Vector3(6, 1.5, -4);
let cam3 = new THREE.Vector3(0,0,5);
let cam4 = new THREE.Vector3(3,0.5,23.2);

let currentCam = 0;

document.getElementById('camera').addEventListener('click', () => {
    currentCam = (currentCam + 1) % 4; //

    switch (currentCam) {
        case 0:
            camera.position.copy(cam1);
            break;
        case 1:
            camera.position.copy(cam2);
            break;
        case 2:
            camera.position.copy(cam3);
            break;
        case 3:
            camera.position.copy(cam4);
            break;
    }

    camera.lookAt(scene.position); 
});

// music on/off
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

// clock+date
function updateClock() {
    const now = new Date();

    // Format time
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convert 0 to 12-hour format
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

    // Format date
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);

    // Update DOM
    document.getElementById('clock-time').textContent = timeString;
    document.getElementById('clock-date').textContent = dateString;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

setInterval(updateClock, 1000);
updateClock();

window.addEventListener('resize', onWindowResize, false);

init(); // execute initialize function
animate(); // execute animation function