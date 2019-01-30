function createEarthquakeMarker(lat, lon, radius, addToGroup) {
    var cone = createCone({color: 0xffff00}, 0.7, 0.7, 4, 1, addToGroup);

    cone.rotateZ(-Math.PI/2 + THREE.Math.degToRad(lat))
    cone.rotateX(THREE.Math.degToRad(lon));

    var xyz = GeoToCartesian(lat, lon, radius, false);

    cone.position.set(xyz[0], xyz[1], xyz[2]);

    return cone;
}