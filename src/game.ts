import { Entity, InputAction, Material, MeshCollider, MeshRenderer, pointerEventsSystem, Transform, engine } from "@dcl/sdk/ecs";

import { UiEntity } from "@dcl/sdk/react-ecs";
import { Color4, Vector3 } from "@dcl/sdk/math";



export function startGame() {
    // your scene setup logic
    console.log("Game started gg")
  
    // example entity
    const box = engine.addEntity()
    Transform.create(box, { position: Vector3.create(8, 1, 8) })
    MeshRenderer.setBox(box)
  }
  

// Create a clickable object (e.g., a cube)
const menuTrigger = engine.addEntity();
Transform.create(menuTrigger, { position: { x: 8, y: 1, z: 8 } });
MeshRenderer.setBox(menuTrigger);
MeshCollider.setBox(menuTrigger);

// Define a UI element (a container for the menu)
const menuUI = engine.addEntity();
Transform.create(menuUI, { position: { x: 8, y: 2.5, z: 8 }, scale: { x: 2, y: 1, z: 0.1 } });
MeshRenderer.setPlane(menuUI);
Material.setPbrMaterial(menuUI, { albedoColor: Color4.Blue() });

// Hide the menu initially
Transform.getMutable(menuUI).scale = { x: 0, y: 0, z: 0 };

// Make the object clickable
pointerEventsSystem.onPointerDown(
  menuTrigger,
  () => {
    // Toggle menu visibility
    const menuTransform = Transform.getMutable(menuUI);
    if (menuTransform.scale.x === 0) {
      menuTransform.scale = { x: 2, y: 1, z: 0.1 }; // Show menu
    } else {
      menuTransform.scale = { x: 0, y: 0, z: 0 }; // Hide menu
    }
  },
  { button: InputAction.IA_POINTER }
);