import {} from '@dcl/sdk/math'
import { engine } from '@dcl/sdk/ecs'
// index.ts
import { Vector3, Quaternion } from '@dcl/sdk/math'
import {createVirtualBrowserClient} from "@zeroxwork/decentraland-virtual-browser-client";
import { dark, ThemeProvider } from 'decentraland-ui2/dist/theme'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { Transform, MeshRenderer, pointerEventsSystem, InputAction, UiCanvasInformation, UiText } from '@dcl/sdk/ecs'
import * as ui from "dcl-ui-toolkit";
import { PromptButtonStyles } from 'dcl-ui-toolkit/dist/ui-entities/prompts/Prompt/components/Button';

const SERVER_BASE_URL = "https://dcl-browser.zeroxwork.com";// you can use external server like https://dcl-browser.zeroxwork.com
const WEBSOCKET_URL = "wss://dcl-browser.zeroxwork.com";// you can use external server like wss://dcl-browser.zeroxwork.com

 createVirtualBrowserClient({
    colyseusServerURL:WEBSOCKET_URL,
    baseAPIURL:SERVER_BASE_URL,
    position:Vector3.create(3, 2, 6),
    rotation:Quaternion.fromEulerDegrees(0,270,0),
    scale:Vector3.create(3,768/1024 * 3,1),
    homeURL:"https://www.lazada.com.my/tag/688中国风",
    parent:undefined //it can have a parent Entity
  });



export function main() {

  const cube = engine.getEntityOrNullByName('gravestone.glb')
  if (!cube) {
    console.log('Cube entity not found')
    return
  }

   const state = { idle: true }


  
    // const textInputPrompt = ui.createComponent(ui.OkPrompt, {
    //   text: `This feature is only for testing purposes.\nWon't be available in production.\nEnter URL:`,
    //   onAccept: () => {
    //   textInputPrompt.hide()
    //   }
    // })

    // pointerEventsSystem.onPointerDown({
    //   entity: cube,
    //   opts: { button: InputAction.IA_POINTER, hoverText: 'Show Info' }
    // }, () => {
    //   if (!state.idle) return
    
    //   textInputPrompt.show()
    // })
  
    const prompt = ui.createComponent(ui.CustomPrompt, {
      style: ui.PromptStyles.LIGHT,
      width: 500,
      height: 600,
})

  const image = prompt.addIcon(
    {
      image : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT8SybBmGwcpTOc3PJOYQTFeoZRZC6-62bS6RpF2FAOgUqgGFSn',
      width: 100,
      height: 200,
      xPosition: 0,
      yPosition: 100,
    }
  )

const label = prompt.addText({
  value: '尼玛',
  xPosition: -170,
  yPosition: 0,
  positionAbsolute: true,
  size: 18,
}
  )

   const okButton = prompt.addButton({
    text: 'OK',
    xPosition: -10,
    style: PromptButtonStyles.E,
    yPosition: -160, // X, Y offset
    onMouseDown: () => {
      prompt.hide()
    },
    
   }
  )

  pointerEventsSystem.onPointerDown(
    {
      entity: cube,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Show Info'
      }
    },
    () => {
      if (!state.idle) return
      prompt.show()
    }
  )

}