import Experience from "../Experience.js";
import Portal from "./Portal.js";
import Fireflies from "./Fireflies.js";


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources


        this.resources.on('ready', () =>
        {
            // Setup
            this.portal = new Portal()
            this.fireflies = new Fireflies()
        })

    }

    update()
    {
        if(this.portal)
        {
            this.portal.update()
        }

        if(this.fireflies)
        {
            this.fireflies.update()
        }
    } 
}