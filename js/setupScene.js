function setupScene() {
    // création du renderer
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('container').appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // création de la caméra
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

    // positionnement de la caméra
    camera.position.z = 100;
    // création de la scène
    var scene = new THREE.Scene();

    // couleur de fond noire
    scene.background = new THREE.Color(0, 0, 0);

    return {
        renderer: renderer,
        camera: camera,
        scene: scene
    };
}

