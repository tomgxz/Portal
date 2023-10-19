import * as THREE from "three";

export default function createScene() {
    const scene = new THREE.Scene();
    //scene.add(new THREE.AxesHelper(5))
    scene.background = new THREE.Color(0x000000);
    return scene;
}