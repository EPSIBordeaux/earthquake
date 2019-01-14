const SPEED_EARTH = THREE.Math.degToRad(2);
const SPEED_CLOUDS = SPEED_EARTH / 2;

const environment = setupScene();

var groupterre = new THREE.Group();
environment.scene.add(groupterre);

var earth = createSphere(1.5, 32, 32, groupterre, undefined, false);
var nuages = createSphere(1.51, 32, 32, groupterre, undefined, false);

loadTexture("earth_color.jpg", function (texture) {
    earth.material.map = texture;
    earth.material.needsUpdate = true;
});

loadTexture("earth_cloud.jpg", function (texture) {
    nuages.material.alphaMap = texture;
    nuages.material.transparent = true;
    nuages.material.needsUpdate = true;
});

lightSetup(environment.scene, earth);

var controls = new THREE.OrbitControls(environment.camera);

var animate = function() {
    earth.rotateY(SPEED_EARTH);
    nuages.rotateY(SPEED_CLOUDS);
    controls.update();
    environment.renderer.render(environment.scene, environment.camera);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

