
class GraphicManager {
    constructor() {
        const canvasElement = document.getElementsByClassName('graphic_canvas')[0];
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasElement });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setAnimationLoop(() => {

            this.renderer.render(this.scene, this.camera);
        });
        console.log(this.renderer);
        this.test();
    }
    test() {
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        var thisObject = this;

        document.addEventListener("mousedown", onMouseDown);
        function onMouseDown(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            var a = raycaster.setFromCamera(mouse, thisObject.camera);
            var box = thisObject.addCube();
            var dist = box.position.clone().sub(thisObject.camera.position).length();

            raycaster.ray.at(dist, box.position);

        }
        this.addCube();

        var counter = 12;
        var bindingCounter = new Binding(counter);
        bindingCounter.set(5); 
        bindingCounter.onValueChanges =
        (newValue) =>
         {
            gui.draw("coutner :" + newValue, xpos, ypos);
        }
        bindingCounter.setValue(5);  //counter value is now 5
        bindingCounter.setValue(15); //couter vlaue is now 15
    }

    addCube() {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        cube.rotation.x = 10;
        cube.rotation.y = 5;
        this.scene.add(cube);
        return cube;
    }
}
