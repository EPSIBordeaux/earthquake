var mouse = new THREE.Vector2(), INTERSECTED;

function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function onDocumentMouseDown(event) {
    event.preventDefault();

    var raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, environment.camera);

    var intersects = raycaster.intersectObjects(dots);

    if (intersects.length > 0)
        showEarthquakeDetails(intersects[0].object, earthquakeFromDot(intersects[0].object));
}

function checkIntersect() {
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, environment.camera );

    var intersects = raycaster.intersectObjects( dots );

    if ( intersects.length > 0 ) {

        if ( INTERSECTED != intersects[ 0 ].object ) {

            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xee0000 );

        }

    } else {

        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

        INTERSECTED = null;

    }
}