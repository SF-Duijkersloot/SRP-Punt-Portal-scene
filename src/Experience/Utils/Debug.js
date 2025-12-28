import GUI from 'lil-gui'

export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'

        // Global debug object
        this.debugObject = {}

        if(this.active)
        {
            this.ui = new GUI()
        }
    }
}