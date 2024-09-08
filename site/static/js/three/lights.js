import * as THREE from "three";

export default function createLight() {
  var lights = []

  const ambientLight = new THREE.AmbientLight(0xffffff, .25)
  lights.push(ambientLight)


  const directionalLight = new THREE.DirectionalLight('#fae5cd', 5)

  directionalLight.position.x = -8
  directionalLight.position.y = 10
  directionalLight.position.z = -20
  directionalLight.lookAt(0, 0, 0)

  directionalLight.castShadow = true

  directionalLight.shadow.camera.top = 2500;
  directionalLight.shadow.camera.bottom = - 2500;
  directionalLight.shadow.camera.left = - 2500;
  directionalLight.shadow.camera.right = 2500;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 1000;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;


  lights.push(directionalLight)


  const rectAreaLight = new THREE.RectAreaLight('#0000ff', 20, 5, 5)

  rectAreaLight.position.x = -5
  rectAreaLight.position.y = 12
  rectAreaLight.position.z = 5
  rectAreaLight.lookAt(0, 0, 0)

  lights.push(rectAreaLight)


  const laptoplight = new THREE.DirectionalLight("#ffffcc", 2)

  laptoplight.position.x = 0
  laptoplight.position.y = 12
  laptoplight.position.z = 20
  laptoplight.lookAt(1, 2.25, -.5)

  laptoplight.castShadow = true

  lights.push(laptoplight)

  return lights;
}



