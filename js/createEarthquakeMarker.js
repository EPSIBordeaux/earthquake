function createEarthquakeMarker(lat, lon, radius, addToGroup) {
    var dot = createSphere(0.2, 10, 10, addToGroup, undefined, false);

    var xyz = GeoToCartesian(lat, lon, radius, false);

    dot.position.set(xyz[0], xyz[1], xyz[2]);

    return dot;
}