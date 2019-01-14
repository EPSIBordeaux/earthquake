const SPEED_EARTH = THREE.Math.degToRad(1);
const SPEED_CLOUDS = SPEED_EARTH / 2;

const environment = setupScene();

var earthGroup = new THREE.Group();
environment.scene.add(earthGroup);

var earth = createSphere(15, 320, 320, earthGroup, undefined, false);

loadTexture("earth_color.jpg", function (texture) {
    // earth.material.map = texture;
    earth.material.needsUpdate = true;
    earth.material.alphaMap = texture;
    earth.material.transparent = true;
});

lightSetup(environment.scene, earth);

var controls = new THREE.OrbitControls(environment.camera);

function animate() {
    earth.rotateY(SPEED_EARTH);
    controls.update();
    environment.renderer.render(environment.scene, environment.camera);
    requestAnimationFrame(animate);
}

animate();

var raycaster = new THREE.Raycaster();
function drawPoint(event) {
    event.preventDefault();
    var position = new THREE.Vector2();
    // On conserve la position de la souris dans l'espace de coordonnées
    // NDC (Normalized device coordinates).
    var domRect = environment.renderer.domElement.getBoundingClientRect();
    position.x = (event.clientX / domRect.width) * 2 - 1 + domRect.left;
    position.y = - (event.clientY / domRect.height) * 2 + 1 + domRect.top;

    raycaster.setFromCamera(position, environment.camera);
    var selectionnes = raycaster.intersectObjects([earth]);

    console.log("Intersect result")
    console.log(selectionnes[0]);

    var pointGeometry = new THREE.Geometry();
    pointGeometry.vertices.push(position);
    var pointMaterial = new THREE.PointsMaterial({ color: 0xF00 });
    var point = new THREE.Points(pointGeometry, pointMaterial);
    earth.add(point);

    console.log("point")
    console.log(point);
}

environment.renderer.domElement.addEventListener('click', drawPoint);
