const SPEED_EARTH = THREE.Math.degToRad(1);
const SPEED_CLOUDS = SPEED_EARTH / 2;

const environment = setupScene();

var groupterre = new THREE.Group();
environment.scene.add(groupterre);

var earth = createSphere(15, 120, 120, groupterre, undefined, true);

var nuages = createSphere(15.1, 120, 120, groupterre, undefined, false);

var lattitude = document.getElementById('lattitude'),
    longitude = document.getElementById('longitude');

var earthquakes = getEarthquakes();
var dots = [];

for(i = 0; i < earthquakes.features.length; i++)
{
    var earthquake = earthquakes.features[i];

    //console.log(earthquake);

    var lon = earthquake.geometry.coordinates[0];
    var lat = earthquake.geometry.coordinates[1];

    dots[i] = createEarthquakeMarker(lat, lon, 15, groupterre);
}

lattitude.onchange = function(){
    dot = createEarthquakeMarker(lattitude.value, longitude.value, 15, groupterre);
}

longitude.onchange = function(){
    dot = createEarthquakeMarker(lattitude.value, longitude.value, 15, groupterre);
}

function onMouseDown(e) {
    var vectorMouse = new THREE.Vector3( //vector from camera to mouse
        -(window.innerWidth/2-e.clientX)*2/window.innerWidth,
        (window.innerHeight/2-e.clientY)*2/window.innerHeight,
        -1/Math.tan(22.5*Math.PI/180)); //22.5 is half of camera frustum angle 45 degree
    vectorMouse.applyQuaternion(environment.camera.quaternion);
    vectorMouse.normalize();

    for(i = 0; i < dots.length; i++)
    {
        var vectorObject = new THREE.Vector3(); //vector from camera to object
        vectorObject.set(dots[i].position.x - environment.camera.position.x,
            dots[i].position.y - environment.camera.position.y,
            dots[i].position.z - environment.camera.position.z);
        vectorObject.normalize();
        if (vectorMouse.angleTo(vectorObject)*180/Math.PI < 1)
        {
            //mouse's position is near object's position
            console.log(earthquakes.features[i]);
        }
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

var animate = function() {
    //earth.rotateY(SPEED_EARTH);
    nuages.rotateY(SPEED_CLOUDS);
    controls.update();
    environment.renderer.render(environment.scene, environment.camera);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

