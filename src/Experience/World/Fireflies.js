import * as THREE from "three"
import Experience from "../Experience"
import firefliesVertexShader from '../shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from '../shaders/fireflies/fragment.glsl'

export default class Fireflies
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Fireflies')
            this.debug.debugObject.firefliesCount = 30
        }

        this.setFireflies()
        this.setDebug()
    }

    setFireflies()
    {
        this.firefliesGeometry = new THREE.BufferGeometry()
        const firefliesCount = this.debug.debugObject.firefliesCount

        this.positionArray = new Float32Array(firefliesCount * 3)
        this.scaleArray = new Float32Array(firefliesCount)

        for(let i = 0; i < firefliesCount; i++)
        {
            this.positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
            this.positionArray[i * 3 + 1] = Math.random() * 1.5
            this.positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4

            this.scaleArray[i] = Math.random()
        }

        this.firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(this.positionArray, 3))
        this.firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(this.scaleArray, 1))

        this.firefliesMaterial = new THREE.ShaderMaterial({
            vertexShader: firefliesVertexShader,
            fragmentShader: firefliesFragmentShader,
            uniforms:
            {
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                uSize: { value: 200 }
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })
        this.fireflies = new THREE.Points(this.firefliesGeometry, this.firefliesMaterial)
        this.scene.add(this.fireflies)
    }

    setDebug()
    {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.firefliesMaterial.uniforms.uSize, 'value')
                .min(0)
                .max(500)
                .step(1)
                .name('firefliesSize')
            
            this.debugFolder
                .add(this.debug.debugObject, 'firefliesCount')
                .min(1)
                .max(250)
                .step(1)
                .name('firefliesCount')
                .onFinishChange(() => {
                    this.scene.remove(this.fireflies)
                    this.setFireflies()
                })
        }
    }

    update()
    {
        this.firefliesMaterial.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}