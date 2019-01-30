function createCone(color,radius, height, radialSegments, heightSegments, addToGroup) {

    var geometry = new THREE.ConeBufferGeometry( radius, height, radialSegments, heightSegments );
    var material = new THREE.MeshBasicMaterial( color );
    var cone = new THREE.Mesh( geometry, material );
    addToGroup.add(cone);
    return cone;
}