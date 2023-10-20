import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const prog = $("#page-loader-bar")
const stat = $("#page-loader-content")

export default function getCabinet(afterload) {

    const loader = new GLTFLoader();

    loader.load(
        '/static/models/cabinet.glb',

        //onload
        function (gltf) { $("#page-loader").fadeOut(1000); afterload(gltf) },

        // onprogress
        function (xhr) { 

            var perc = Math.floor(xhr.loaded / xhr.total * 100)
            if (perc > 100) perc = 100

            prog.get(0).animate({
                width: (perc * 0.4) + "%",
                marginRight: (40 - perc * 0.4) + "%"
                }, {
                duration: 8000,
                fill: "forwards"
            });

            stat.text("Loading " + perc + "%")
        },

        //onerror
        function (e) { console.log(e) }
    )

}