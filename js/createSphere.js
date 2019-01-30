function createSphere(radius, widthSegments, heightSegments, addToGroup, lookAt, debug) {
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, widthSegments, heightSegments), new THREE.MeshPhongMaterial());
    addToGroup.add(sphere);
    if (debug) {
        sphere.add(new THREE.AxesHelper(radius*3));
    }

    if (lookAt != undefined) {
        sphere.lookAt(lookAt.position)
    }

    return sphere;
}
