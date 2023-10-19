import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export default function getCabinet(afterload) {

    const loader = new GLTFLoader();

    loader.load(
        '/static/models/cabinet.glb',

        //onload
        function (gltf) { afterload(gltf) },

        // onprogress
        function (xhr) { console.log((xhr.loaded / xhr.total * 100) + '% loaded') },

        //onerror
        function (e) { console.log(e) }
    )

}