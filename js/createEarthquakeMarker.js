function createEarthquakeMarker(earthquake, radius, addToGroup)
{
    var color = new THREE.Color( 0xffffff );
    color.setHex( Math.random() * 0xffffff );
    var material = new THREE.MeshBasicMaterial(color);
    material.color = color;

    var dot = createSphere(0.3 , 10, 10, addToGroup, undefined, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff * 1.3 } ), false);

    var xyz = GeoToCartesian(earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0], radius, false);

    dot.position.set(xyz[0], xyz[1], xyz[2]);

    return dot;
}