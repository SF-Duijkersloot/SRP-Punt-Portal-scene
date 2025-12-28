# SRP — Portal Scene (Three.js)

<img width="1058" height="670" alt="image" src="https://github.com/user-attachments/assets/436ac9f2-53a6-43c4-a6a3-da386b7e756d" />

### Bekijk live project: [Portal scene](https://portal-scene-three-nu.vercel.app/)

Dit project is gemaakt in het kader van een **SRP** voor CMD.  
Het doel van dit project was om mij te verdiepen in **Three.js en WebGL** door het volgen van de *Three.js Journey* cursus en het opleveren van een eigen eindproject: een **Portal Scene**.

Naast het volgen van de tutorials heb ik extra aandacht besteed aan de **projectstructuur**. In plaats van één groot script is de code opgesplitst in duidelijke classes, met één centrale `Experience.js` die de applicatie aanstuurt.

---

## Wat is gemaakt
- Een interactieve **Portal Scene** in Three.js  
- Custom shaders voor de portal en fireflies  
- Gebruikt: Blender (modelling & baking) + Three.js  
- Modulaire code-architectuur (Camera, World, Renderer, Utils)

---

## Setup

Download [Node.js](https://nodejs.org/en/download/) if you haven't already.

Run the following commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local dev server
npm run dev

# Build for production (output in /dist)
npm run build
