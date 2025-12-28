import * as THREE from "three";
import Experience from "./Experience.js";

export default class Renderer 
{
    constructor()
    {
        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.debug = this.experience.debug;

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Renderer');
            this.debugObject = this.debug.debugObject;
        }

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)

        if (this.debug.active) 
        {
            this.debugObject.clearColor = '#141110';
            this.instance.setClearColor(this.debugObject.clearColor);
            this.debugFolder.addColor(this.debugObject, 'clearColor').onChange(() => this.instance.setClearColor(this.debugObject.clearColor));
        }
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}