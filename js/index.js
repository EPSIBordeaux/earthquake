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
    nuages.material.transparent = true;
});

loadTexture("earth_cloud.jpg", function (texture) {
    nuages.material.alphaMap = texture;
    nuages.material.transparent = true;
    nuages.material.needsUpdate = true;
});

lightSetup(environment.scene, earth);

var controls = new THREE.OrbitControls(environment.camera);

var animate = function () {
    //earth.rotateY(SPEED_EARTH);
    //nuages.rotateY(SPEED_CLOUDS);
    controls.update();
    environment.renderer.render(environment.scene, environment.camera);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

function createCone(earth, radius, radialSegments, heightsSegments) {
    console.log(earth.geometry.parameters);
    var geometry = new THREE.ConeGeometry(radius, radialSegments, heightsSegments);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    var cone = new THREE.Mesh(geometry, material);
    cone.position.add(new THREE.Vector3(earth.geometry.parameters.radius, 0, 0));
    earth.add(cone);
}

createCone(earth, .125, .2, .02);