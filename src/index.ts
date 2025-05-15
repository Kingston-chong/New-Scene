// Imports start
import { Quaternion, Vector3, Color4 } from '@dcl/sdk/math'
import {
  Animator,
  AudioSource,
  AvatarAttach,
  GltfContainer,
  Material,
  Transform,
  VideoPlayer,
  VisibilityComponent,
  engine,
  pointerEventsSystem,
  Name,
  MeshRenderer,
  MeshCollider,
  InputAction
} from '@dcl/sdk/ecs'
import { onEnterScene, onLeaveScene } from '@dcl/sdk/src/players'
// Imports end

import { createVirtualBrowserClient } from "@zeroxwork/decentraland-virtual-browser-client"
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

// Import triggerEmote from the correct module
import { triggerEmote } from '~system/RestrictedActions'

// Constants for virtual browser
const SERVER_BASE_URL = "https://dcl-browser.zeroxwork.com"
const WEBSOCKET_URL = "wss://dcl-browser.zeroxwork.com"

export function main() {
  // Initialize the virtual browser
  createVirtualBrowserClient({
    colyseusServerURL: WEBSOCKET_URL,
    baseAPIURL: SERVER_BASE_URL,
    position: Vector3.create(3, 2, 6),
    rotation: Quaternion.fromEulerDegrees(0, 270, 0),
    scale: Vector3.create(3, (768 / 1024) * 3, 1),
    homeURL: "https://www.lazada.com.my/tag/688中国风",
    parent: undefined
  })

  // Create a clickable UI entity
  const uiButton = engine.addEntity()

  // Set transform for the UI button
  Transform.create(uiButton, {
    position: Vector3.create(8, 1, 8),
    scale: Vector3.create(1.5, 0.5, 1)
  })

  // Add a plane shape to act as a button
  MeshRenderer.setPlane(uiButton)

  // Add a collider to make the entity interactive
  MeshCollider.setPlane(uiButton)

  // Set material for the button
  Material.setPbrMaterial(uiButton, {
    albedoColor: Color4.create(0.2, 0.6, 1, 1)
  })

  // Add pointer event for click interaction
  pointerEventsSystem.onPointerDown(
    {
      entity: uiButton,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Click Me'
      }
    },
    () => {
      console.log('UI Button clicked!')
      const transform = Transform.getMutable(uiButton)
      transform.scale.y += 0.2

      // Trigger the 'robot' emote
      triggerEmote({ predefinedEmote: 'robot' })
    }
  )
}
