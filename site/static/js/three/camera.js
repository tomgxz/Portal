import * as THREE from "three";

export default function createCamera() {
    const camera = new THREE.PerspectiveCamera(
        20,
        window.innerWidth / window.innerHeight,
        0.1,
        200
    )

    camera.position.set(15, 8, 5)
    camera.lookAt(1, 2, 0)

    return camera;
}