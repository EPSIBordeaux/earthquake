// création du renderer
var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

// création de la caméra
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000);

// création de la scène
var scene = new THREE.Scene();

// couleur de fond noire
scene.background = new THREE.Color(0, 0, 0);

var groupterre = new THREE.Group();
scene.add(groupterre);

var grouplune = new THREE.Group();
groupterre.add(grouplune);

var terre = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 32), new THREE.MeshPhongMaterial());
groupterre.add(terre);
var nuages = new THREE.Mesh(new THREE.SphereGeometry(1.51, 32, 32), new THREE.MeshPhongMaterial());
groupterre.add(nuages);

var lune = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshPhongMaterial());
grouplune.add(lune);

//terre.add(new THREE.AxesHelper(1.7));
//lune.add(new THREE.AxesHelper(0.8));

// positionnement de la caméra
camera.position.z = 10;

lune.lookAt(terre.position);

speedterre = .1;
speedNuages = speedterre / 1.5;
speedlune = speedterre / 27;


var textureLoader = new THREE.TextureLoader();
textureLoader.load("earth_color.jpg", function (texture) {
    terre.material.map = texture;
    terre.material.needsUpdate = true;
});
textureLoader.load("earth_cloud.jpg", function (texture) {
    nuages.material.alphaMap = texture;
    nuages.material.transparent = true;
    nuages.material.needsUpdate = true;
});
textureLoader.load("moon_color.jpg", function (texture) {
    lune.material.map = texture;
    lune.material.needsUpdate = true;
});

// Ambient light
var ambientLight = new THREE.AmbientLight(0xffffff, .1);
scene.add(ambientLight);

// Directional light
var directionalLight = new THREE.DirectionalLight(0xffdddd, 1);
directionalLight.position.set(1, 1, 1);
directionalLight.lookAt(terre.position);
scene.add(directionalLight);

// Point light
var pointLight = new THREE.DirectionalLight(0xaaaaff, .3);
pointLight.position.set(-2, 1, 1);
scene.add(pointLight);

var controls = new THREE.OrbitControls(camera);

function animate() {
    terre.rotateY(speedterre);

    nuages.rotateY(speedNuages);

    lune.rotateY(speedlune);
    lune.position.set(0, 0, 0);
    lune.translateX(3);

    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

animate();
