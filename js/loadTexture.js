var textureLoader = new THREE.TextureLoader();

function loadTexture(texture, callback) {
    textureLoader.load(texture, callback);
}
