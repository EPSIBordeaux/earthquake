const SPEED_EARTH = THREE.Math.degToRad(1);
const SPEED_CLOUDS = SPEED_EARTH / 2;

const environment = setupScene();

var groupterre = new THREE.Group();
environment.scene.add(groupterre);

var earth = createSphere(15, 120, 120, groupterre, undefined, true);
var nuages = createSphere(15.1, 120, 120, groupterre, undefined, false);
var dot = createSphere(1, 10, 10, groupterre, undefined, false);
dot.position.set(16, 0, 0);

var pivot = new THREE.Object3D();
groupterre.add(pivot);
pivot.position.set(0, 0, 0);
pivot.add(dot);

var lattitude = document.getElementById('lattitude'),
    longitude = document.getElementById('longitude');
 
lattitude.onchange = function(){
    pivot.rotateY(THREE.Math.degToRad(lattitude.value))
}

longitude.onchange = function(){
    pivot.rotateZ(THREE.Math.degToRad(longitude.value))
}

loadTexture("textures/earth_color.jpg", function (texture) {
    earth.material.map = texture;
    earth.material.needsUpdate = true;
});

loadTexture("textures/earth_cloud.jpg", function (texture) {
    nuages.material.alphaMap = texture;
    nuages.material.transparent = true;
    nuages.material.needsUpdate = true;
});

lightSetup(environment.scene, earth);

var controls = new THREE.OrbitControls(environment.camera, environment.renderer.domElement);

var animate = function() {
    //earth.rotateY(SPEED_EARTH);
    nuages.rotateY(SPEED_CLOUDS);
    controls.update();
    environment.renderer.render(environment.scene, environment.camera);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

