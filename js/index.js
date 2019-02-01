const SPEED_EARTH = THREE.Math.degToRad(0.03);
const SPEED_CLOUDS = SPEED_EARTH / 2;

const environment = setupScene();

var groupterre = new THREE.Group();
environment.scene.add(groupterre);

var earth = createSphere(15, 120, 120, groupterre, undefined, new THREE.MeshPhongMaterial(), false);
var nuages = createSphere(15.1, 120, 120, groupterre, undefined, new THREE.MeshPhongMaterial(), false);

var earthquakes = getEarthquakes().features;
var dots = [];

for(i = 0; i < earthquakes.length; i++)
    dots[i] = createEarthquakeMarker(earthquakes[i], 15, groupterre);

function earthquakeFromDot(dot) {
    for(i=0;i<dots.length;i++)
    {
        if(dots[i] == dot)
            return (earthquakes[i]);
    }
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

function toScreenPosition(obj, camera)
{
    corners = [
        new THREE.Vector3,
        new THREE.Vector3,
        new THREE.Vector3,
        new THREE.Vector3 ];

    var widthHalf = 0.5*environment.renderer.context.canvas.width;
    var heightHalf = 0.5*environment.renderer.context.canvas.height;

    var halfWidth = 0.5;
    var halfDepth = 0.5;

    corners[0].set(obj.position.x - halfWidth, obj.position.y, obj.position.z + halfDepth);
    corners[1].set(obj.position.x + halfWidth, obj.position.y, obj.position.z + halfDepth);
    corners[2].set(obj.position.x - halfWidth, obj.position.y, obj.position.z - halfDepth);
    corners[3].set(obj.position.x + halfWidth, obj.position.y, obj.position.z - halfDepth);

    for(i=0;i<corners.length;i++)
    {
        corners[i].project(camera);
        corners[i].x = ( corners[i].x * widthHalf ) + widthHalf;
        corners[i].y = - ( corners[i].y * heightHalf ) + heightHalf;
    }

    return corners;
}

var animate = function() {
    groupterre.rotateY(SPEED_EARTH);
    nuages.rotateY(SPEED_CLOUDS);
    controls.update();
    checkIntersect();

    toScreenPosition(dots[0], environment.camera)

    environment.renderer.render(environment.scene, environment.camera);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

