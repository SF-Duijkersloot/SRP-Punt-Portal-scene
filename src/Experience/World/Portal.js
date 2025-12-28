import * as THREE from "three"
import Experience from "../Experience"
import portalVertexShader from '../shaders/portal/vertex.glsl'
import portalFragmentShader from '../shaders/portal/fragment.glsl'

export default class Portal
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Portal')
        }

        // Setup
        this.resource = this.resources.items.portalModel

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.scene.add(this.model)

        // Materials
        const bakedTexture = this.resources.items.bakedTexture
        if(bakedTexture)
        {
            bakedTexture.flipY = false
            bakedTexture.colorSpace = THREE.SRGBColorSpace
            bakedTexture.needsUpdate = true
        }

        const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

        // Debug colors container
        const debugObject = this.debug.debugObject
        debugObject.portalColorStart = debugObject.portalColorStart || '#cd6204'
        debugObject.portalColorEnd = debugObject.portalColorEnd || '#ffffff'

        // Portal light material
        const portalLightMaterial = new THREE.ShaderMaterial({
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
            uniforms:
            {
                uTime: { value: 0 },
                uColorStart: { value: new THREE.Color(debugObject.portalColorStart) },
                uColorEnd: { value: new THREE.Color(debugObject.portalColorEnd) }
            }
        })
        

        // Pole light material
        const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })

        // Assign materials by mesh name
        const bakedMesh = this.model.children.find(child => child.name === 'baked')
        const portalLightMesh = this.model.children.find(child => child.name === 'PortalLight')
        const poleLightAMesh = this.model.children.find(child => child.name === 'PoleLightA')
        const poleLightBMesh = this.model.children.find(child => child.name === 'PoleLightB')

        if(bakedMesh) bakedMesh.material = bakedMaterial
        if(portalLightMesh) portalLightMesh.material = portalLightMaterial
        if(poleLightAMesh) poleLightAMesh.material = poleLightMaterial
        if(poleLightBMesh) poleLightBMesh.material = poleLightMaterial

        // Shadows & interactable settings
        this.model.traverse((child) => 
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.receiveShadow = true
            }
        })

        // Keep reference for update
        this.portalLightMaterial = portalLightMaterial

        // Debug GUI for portal colors
        if(this.debug.active)
        {
            this.debugFolder
                .addColor(debugObject, 'portalColorStart')
                .name('portalColorStart')
                .onChange(() =>
                {
                    portalLightMaterial.uniforms.uColorStart.value.set(debugObject.portalColorStart)
                })

            this.debugFolder
                .addColor(debugObject, 'portalColorEnd')
                .name('portalColorEnd')
                .onChange(() =>
                {
                    portalLightMaterial.uniforms.uColorEnd.value.set(debugObject.portalColorEnd)
                })
            // Add pole light material
            this.debugFolder
                .addColor({ poleLightColor: '#ffffe5' }, 'poleLightColor')
                .name('poleLightColor')
                .onChange((value) =>
                {
                    poleLightMaterial.color.set(value)
                })
        }
    }

    update()
    {
        this.portalLightMaterial.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}