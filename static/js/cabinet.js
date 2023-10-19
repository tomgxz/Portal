import * as THREE from "three"
import * as TWEEN from "tween";

//import Stats from 'three/examples/jsm/libs/stats.module'

import createCamera from "./three/camera"
import createLights from "./three/lights"
import createRenderer from "./three/renderer"
import createScene from "./three/scene"

import getCabinet from "./three/import/cabinet";

import * as timelines from "./cabinet_timelines"

const renderer = createRenderer();
const scene = createScene();
const camera = createCamera();

var xdiff, prevXpos = window.innerWidth/2, prevCamXPos = camera.position.z,
    ydiff, prevYpos = window.innerHeight/2, prevCamYPos = camera.position.y,
    positer = -1, pos, cammoving = false;

//scene.add(new THREE.CameraHelper(camera))

const lights = createLights();
for (var light of lights)  {
    scene.add(light)

    continue

    try { scene.add(new THREE.DirectionalLightHelper(light)) }
    catch { try{scene.add(new THREE.SpotLightHelper(light))} catch {}}

}


const sceneMeshes = []

getCabinet(cabinet => { 
    cabinet.scene.castShadow = true
    cabinet.scene.recieveShadow = true

    cabinet.scene.traverse( function(child) {
        if (child.isMesh) {
            child.recieveShadow = true
            child.castShadow = true
            sceneMeshes.push(child)
        }
    })

    scene.add(cabinet.scene) 
    
    changepos(0,true)
})

//const stats = new Stats()
//document.body.appendChild(stats.dom)

const animate = () => {
    requestAnimationFrame(animate)

    TWEEN.update();
    renderer.render(scene, camera);
    greenScreenMaterial.update();
    //stats.update()
}


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

var cameraPositions = [
    [ // base
        new THREE.Vector3(15, 7, 0),
        new THREE.Vector3(1, 2, 0),
        timelines.mainview
    ],
    [ // laptop
        new THREE.Vector3(4, 4, 3),
        new THREE.Vector3(1, 2.25, -0.5),
        timelines.laptop
    ],
    [ // book
        new THREE.Vector3(4, 5, 3),
        new THREE.Vector3(.5, 2.25, 0.25),
        timelines.book
    ],
    [ // lanyard
        new THREE.Vector3(2, 4, 2),
        new THREE.Vector3(1, 2.25, 1),
        timelines.lanyard
    ],
    [ // ma3
        new THREE.Vector3(6.5, 2.25, 0),
        new THREE.Vector3(1.5, .5, 0),
        timelines.ma3
    ],
    [ // stuff
        new THREE.Vector3(4, 1, 1),
        new THREE.Vector3(1, .5, 1),
        timelines.stuff
    ],
    [ // necker
        new THREE.Vector3(4, 2.5, -1),
        new THREE.Vector3(1, 1.25, .75),
        timelines.necker
    ],
    [ // knives
        new THREE.Vector3(4, 2.25, -.5),
        new THREE.Vector3(1, 1.25, .35),
        timelines.knives
    ],
    [ // badges
        new THREE.Vector3(4, 2, 0),
        new THREE.Vector3(2, 1.25, -.1),
        timelines.badges
    ],
    [ // lx tape
        new THREE.Vector3(4, 1.5, 0),
        new THREE.Vector3(1.75, 1.25, -.65),
        timelines.lxtape
    ],

]

const changepos = (duration = 2000, forward = true) => {
    if (cammoving) return
    cammoving = true

    if (forward) {
        positer++
        pos = cameraPositions[positer % cameraPositions.length]

    } else {
        positer--
        if (positer < 0) positer = cameraPositions.length - 1
        pos = cameraPositions[positer % cameraPositions.length]
    }

    console.log(pos)
        
    var startPosition = new THREE.Vector3().copy( camera.position );
    var startRotation = new THREE.Euler().copy( camera.rotation );

    camera.position.x = pos[0].x
    camera.position.y = pos[0].y
    camera.position.z = pos[0].z
    camera.lookAt( pos[1] );
    
    var endRotation = new THREE.Euler().copy( camera.rotation );
    
    camera.position.copy( startPosition );
    camera.rotation.copy( startRotation );

    new TWEEN.Tween(camera.position)
        .to({
            x: pos[0].x,
            y: pos[0].y,
            z: pos[0].z
        }, duration)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .onUpdate(() => {renderer.render(scene, camera)})
        .start();


    new TWEEN.Tween(camera.rotation)
        .to({
            x: endRotation.x,
            y: endRotation.y,
            z: endRotation.z
        }, duration)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .onUpdate(() => {renderer.render(scene, camera)})
        .start();

    setTimeout(() => {cammoving = false}, duration)

    prevCamXPos = pos[0].z
    prevCamYPos =  pos[0].y

    console.log(pos[2])

    pos[2].restart()
}

window.addEventListener("click", () => { changepos(2000,true) })


$(window).bind("wheel",function(e) {
    if (cammoving) return

    let deltax = e.originalEvent.wheelDeltaX,
        deltay = e.originalEvent.wheelDeltaY,
        scrollAmt

    if (deltax == 0) scrollAmt = deltay
    else if (deltay == 0) scrollAmt = deltax
    else {
        if (deltax < 0 && deltay < 0) scrollAmt = Math.min(deltax,deltay)
        else if (deltax < 0 && deltax*-1 > deltay) scrollAmt = deltax
        else if (deltax < 0 && deltax*-1 <= deltay) scrollAmt = deltay
        else if (deltay < 0 && deltay*-1 > deltax) scrollAmt = deltay
        else if (deltay < 0 && deltay*-1 <= deltax) scrollAmt = deltay
        else scrollAmt = Math.max(deltax,deltay)
    }
    
    if (scrollAmt < 0) changepos(2000,true)
    else if (scrollAmt > 0) changepos(2000,false)

});

window.addEventListener("mousemove", e => {
    if (cammoving) return

    e.preventDefault()
    
    xdiff = e.clientX - prevXpos;
    prevXpos = e.clientX;
  
    ydiff = e.clientY - prevYpos;
    prevYpos = e.clientY;
  
    prevCamXPos = prevCamXPos + xdiff/10000
    prevCamYPos = prevCamYPos + ydiff/10000
  
    camera.position.z = prevCamXPos
    camera.position.y = prevCamYPos
    camera.lookAt(cameraPositions[positer % cameraPositions.length][1])
    camera.updateMatrix();
})

animate()