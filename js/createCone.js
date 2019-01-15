function createCone(radius, height, radialSegments, heightSegments, addToGroup) {

    var geometry = new THREE.ConeBufferGeometry( radius, height, radialSegments, heightSegments );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var cone = new THREE.Mesh( geometry, material );

    //cone.rotation.z = (THREE.Math.degToRad( -90 ));
    //cone.rotation.y = (THREE.Math.degToRad( 90 ));

    var coneDir = cone.getWorldDirection();

    console.log(coneDir);

    cone.position.add(coneDir);
    addToGroup.add(cone);
    return cone;
}