import * as THREE from 'three';

class ChromaKeyMaterial extends THREE.ShaderMaterial {

constructor(url, keyColor) {

const video = document.createElement('video');
video.src = url;
video.load();

const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

super({
  uniforms: {
    videoTexture: { value: videoTexture },
    color: { value: new THREE.Color(keyColor) },
  },
  vertexShader: /* glsl */ `
    out vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D videoTexture;
    uniform vec3 color;
    in vec2 vUv;
    void main() {
      gl_FragColor.rgb = texture(videoTexture, vUv).rgb;
      gl_FragColor.a = (length(gl_FragColor.rgb - color) - 0.5) * 7.0;
    }
  `,
  transparent: true,	  

})


////////////////////////////////////////////////////////////////////////
// AFTER SUPER CALL, DECLARE FUNCTIONS HERE
	

this.startVideo = function() {	
	video.play();
}

this.stopVideo = function() {	
	video.pause();
	video.src = "";
}

this.update = function() {		
	if (video.readyState === video.HAVE_ENOUGH_DATA) {
		// videoImageContext.drawImage(video, 0, 0);
		if (videoTexture) {
			videoTexture.needsUpdate = true;
		}
	}
};		
}
}

export { ChromaKeyMaterial };