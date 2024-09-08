import * as THREE from "three";

export default function createRenderer() {

    const main = document.querySelector("main");
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.shadowMap.enabled = true
    renderer.shadowMap.autoUpdate = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    main.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("canvas-content","cabinet")

    return renderer;
}