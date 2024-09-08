import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const loader = new GLTFLoader();

const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  1,
  200
)


camera.position.set(15, 8, 5)
//camera.position.set(-8, 10, -20)

camera.lookAt(1, 2, 0)

/**
 * Scene
 */

const scene = new THREE.Scene()

loader.load(
  // resource URL
  '/static/models/cabinet.glb',
  // called when resource is loaded
  function (gltf) {

    scene.add(gltf.scene);

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

  },
  // called when loading is in progresses
  function (xhr) {

    console.log((xhr.loaded / xhr.total * 100) + '% loaded');

  },
  // called when loading has errors
  function (error) {

    console.log('An error happened');

  }
);


/*
 * Lights
 */

var helpers = [];

// Ambient Light
const ambientLight = new THREE.AmbientLight('#ffffff', .25)
scene.add(ambientLight)

// Point light
const directionalLight = new THREE.DirectionalLight('#fae5cd', 5)
directionalLight.position.x = -8
directionalLight.position.y = 10
directionalLight.position.z = -20


directionalLight.lookAt(0, 0, 0)

directionalLight.castShadow = true

directionalLight.shadow.mapSize.width = 512
directionalLight.shadow.mapSize.height = 512
directionalLight.shadow.camera.far = 500
directionalLight.shadow.camera.near = 0.5

scene.add(directionalLight)

helpers.push(new THREE.CameraHelper(directionalLight.shadow.camera))

// RectAreaLight
const rectAreaLight = new THREE.RectAreaLight('#0000ff', 20, 5, 5)

rectAreaLight.position.x = -5
rectAreaLight.position.y = 12
rectAreaLight.position.z = 5
rectAreaLight.lookAt(0, 0, 0)

scene.add(rectAreaLight)

helpers.push(new THREE.CameraHelper(camera))

for (var helper of helpers) scene.add(helper)

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(window.innerWidth, window.innerHeight - document.querySelector("nav.navbar").getBoundingClientRect().height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)


function tick() {
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

/**
 * Handle `resize` events
 */
window.addEventListener(
  'resize',
  function () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
  },
  false,
)

var xdiff, prevXpos = window.innerWidth/2, prevCamXPos = camera.position.z,
    ydiff, prevYpos = window.innerHeight/2, prevCamYPos = camera.position.y,
    positer = -1, pos


window.addEventListener("mousemove", e => {
  return
  e.preventDefault()
  
  xdiff = e.clientX - prevXpos;
  prevXpos = e.clientX;

  ydiff = e.clientY - prevYpos;
  prevYpos = e.clientY;

  prevCamXPos = prevCamXPos + xdiff/200
  prevCamYPos = prevCamYPos + ydiff/200

  camera.position.z = prevCamXPos
  camera.position.y = prevCamYPos
  camera.lookAt(1, 1, 0)
  camera.updateMatrix();

  tick();
})


var cameraPositions = [
  [ // base
    new THREE.Vector3(15,1,0),
    new THREE.Vector3(1,1,0)
  ],
  [ // laptop
    new THREE.Vector3(4,4,3),
    new THREE.Vector3(1,2.25,-0.5)
  ],
  [ // book & lanyard
    new THREE.Vector3(5,4.5,-4),
    new THREE.Vector3(1,2.25,.25)
  ],
  [ // ma3
    new THREE.Vector3(6.5,2.25,0),
    new THREE.Vector3(1.5,.5,0)
  ],
  [ // necker
    new THREE.Vector3(4,2.5,-1),
    new THREE.Vector3(1,1.25,.75)
  ],
  [ // knives
    new THREE.Vector3(4,2.25,-.5),
    new THREE.Vector3(1,1.25,.35)
  ],
  [ // badges
    new THREE.Vector3(4,2,0),
    new THREE.Vector3(2,1.25,-.1)
  ],
  [ // lx tape
    new THREE.Vector3(4,1.5,0),
    new THREE.Vector3(1.75,1.25,-.65)
  ],
  
]

const changepos = e => {

  positer++
  pos = cameraPositions[positer % cameraPositions.length]

  console.log(pos)

  camera.position.x = pos[0].x
  camera.position.y = pos[0].y
  camera.position.z = pos[0].z
  camera.lookAt(pos[1])
  camera.updateMatrix()

  prevCamXPos = camera.position.z
  prevCamYPos = camera.position.y

  tick()
}

window.addEventListener("click",changepos)

changepos()
tick()