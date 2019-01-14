function lightSetup(scene, earth) {
    // Ambient light
    var ambientLight = new THREE.AmbientLight(0xffffff, .1);
    scene.add(ambientLight);

    // Directional light
    var directionalLight = new THREE.DirectionalLight(0xffdddd, 1);
    directionalLight.position.set(1, 1, 1);
    directionalLight.lookAt(earth.position);
    scene.add(directionalLight);

    // Point light
    var pointLight = new THREE.DirectionalLight(0xaaaaff, .3);
    pointLight.position.set(-2, 1, 1);
    scene.add(pointLight);
}
