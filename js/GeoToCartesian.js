function GeoToCartesian(lat, lon, radius, debug) {
    var x = radius * Math.cos(THREE.Math.degToRad(lat)) * Math.cos(THREE.Math.degToRad(lon));
    var y = radius * Math.sin(THREE.Math.degToRad(lat));
    var z = radius * Math.cos(THREE.Math.degToRad(lat)) * Math.sin(THREE.Math.degToRad(lon));

    if(debug){
        console.log([x,y,z]);
    }

    return [x,y,z];
}