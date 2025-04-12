// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// global variables 
let scene, camera, renderer, cube, torus;
let sceneContainer = document.querySelector("#scene-container")

// set up scene, camera, + renderer
function init () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, sceneContainer.clientWidth, sceneContainer.clientHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);
    

    // add dirctional light
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set (1,1,5);
    scene.add(light);

    // const helper = new THREE.DirectionalLightHelper(light,5);
    // scene.add(helper);    
      // add BLUE dirctional light
      const lightLeft = new THREE.DirectionalLight(0xf70ff, 3);
      lightLeft.position.set (-1,1,5);
      scene.add(lightLeft);
  
      // const helperLeft = new THREE.DirectionalLightHelper(lightLeft,5);
      // scene.add(helperLeft);    
    
    // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); // to load 3d models

    // load puppy model
    loader.load('puppy/miro.gltf', function (gltf){
        const puppy = gltf.scene;
        scene.add(puppy);
        puppy.scale.set (1,1,1);
    })

    // ~~~~~~~~~~~~~~~~ Create Geometry ~~~~~~~~~~~~~~~~

    
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const geometry1 = new THREE.TorusGeometry( 3,0.6,5,100 );

    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    const texture = new THREE.TextureLoader().load('textures/ice.jpg');
    const material = new THREE.MeshStandardMaterial( { map: texture} );
     cube = new THREE.Mesh( geometry, material );
     cube.position.set (2.5,1,1);
     const material1 = new THREE.MeshStandardMaterial( { map: texture} ); 
    torus = new THREE.Mesh( geometry1, material1 ); 
    scene.add( torus );
    scene.add(cube);
    
    // ~~~~~~~~~~~~~~~~ Camera Position ~~~~~~~~~~~~~~~~

    camera.position.z = 5;
    
}

// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~


function animate() {
    requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  torus.rotation.x += 0.001;
  torus.rotation.y += 0.01;
  renderer.render( scene, camera );

}

function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth,  sceneContainer.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
// ~~~~~~~~~~~~~~~~ Create scene here ~~~~~~~~~~~~~~~~
// →→→→→→ Follow next steps in tutorial: 
// // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


