/// <reference types="@workadventure/iframe-api-typings" />

import {ActionMessage} from "@workadventure/iframe-api-typings";

export async function displayAnim(animTime: int, layerOn: String, layerOff: String) { 
    
	await setTimeout(5000);
  console.log("Waited 5s");

  await setTimeout(5000);
  console.log("Waited an additional 5s");
  
    WA.room.showLayer(layerOn);
    WA.room.hideLayer(layerOff);
	
    console.log(animTime);
	
	await setTimeout(animTime);
	
    WA.room.hideLayer(layerOn);
    WA.room.showLayer(layerOff);
    
}

