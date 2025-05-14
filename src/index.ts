import {} from '@dcl/sdk/math'
import { engine } from '@dcl/sdk/ecs'
// index.ts
import { Vector3, Quaternion } from '@dcl/sdk/math'
import {createVirtualBrowserClient} from "@zeroxwork/decentraland-virtual-browser-client";
import { dark, ThemeProvider } from 'decentraland-ui2/dist/theme'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'

const SERVER_BASE_URL = "https://dcl-browser.zeroxwork.com";// you can use external server like https://dcl-browser.zeroxwork.com
const WEBSOCKET_URL = "wss://dcl-browser.zeroxwork.com";// you can use external server like wss://dcl-browser.zeroxwork.com

 createVirtualBrowserClient({
    colyseusServerURL:WEBSOCKET_URL,
    baseAPIURL:SERVER_BASE_URL,
    position:Vector3.create(3, 2, 6),
    rotation:Quaternion.fromEulerDegrees(0,270,0),
    scale:Vector3.create(3,768/1024 * 3,1),
    homeURL:"https://youtube.com",
    parent:undefined //it can have a parent Entity
  });



export function main() {

}