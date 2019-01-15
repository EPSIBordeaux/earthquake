const SPEED_EARTH = THREE.Math.degToRad(1);
const SPEED_CLOUDS = SPEED_EARTH / 2;

const environment = setupScene();

var groupterre = new THREE.Group();
environment.scene.add(groupterre);

var earth = createSphere(15, 120, 120, groupterre, undefined, false);
var nuages = createSphere(15.1, 120, 120, groupterre, undefined, false);

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

var controls = new THREE.OrbitControls(environment.camera);

var animate = function() {
    earth.rotateY(SPEED_EARTH);
    nuages.rotateY(SPEED_CLOUDS);
    controls.update();
    environment.renderer.render(environment.scene, environment.camera);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

