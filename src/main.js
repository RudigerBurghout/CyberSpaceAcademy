/// <reference types="@workadventure/iframe-api-typings" />

//import { webOut } 	from 	"./web.ts";
import 	{ } 			from 	"https://unpkg.com/@workadventure/scripting-api-extra@^1/dist/bundle.js";

console.log('Script started successfully');

//only one animation action message per player loaded script
let animMessage = undefined;

const delay = ms => new Promise(res => setTimeout(res, ms));

async function displayAnim(animTime, layerOn, layerOff) { 
  
    WA.room.showLayer(layerOn);
    WA.room.hideLayer(layerOff);
	
	await delay(animTime);
	
    WA.room.hideLayer(layerOn);
    WA.room.showLayer(layerOff);
    
}
async function toggleDanger(animTime, dangerOn, dangerOff) { 
  
    WA.room.showLayer(dangerOn);
    WA.room.hideLayer(dangerOff);
	
	await delay(animTime);
	
    WA.room.hideLayer(dangerOn);
    WA.room.showLayer(dangerOff);
	
	await delay(animTime);
    
	toggleDanger(animTime, dangerOn, dangerOff)
}

function setAnimMessage(msg = "Press 'space' to play animation"){
	animMessage = WA.ui.displayActionMessage({
		message: msg,
		callback: () => {
			displayAnim(800,"animations/swing_on","animations/swing_off");
            setAnimMessage("Press 'space' to swing the swing");
		}
	});
}
// Waiting for the API to be ready
WA.onInit().then(async () => {
	
	//webOut(42, 5, 2,'test message')
	
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
	
	await WA.players.configureTracking({
        players: true,
        movement: false,
    });
	
	//initialise all danger layers with their timings
	//toggleDanger(3000, 'visibleZones/danger_1_on', 'visibleZones/danger_1_off');
	//toggleDanger(5000, 'visibleZones/danger_2_on', 'visibleZones/danger_2_off');
	
	// WA.room.onEnterLayer('animationzones/swing').subscribe(() => {
    // setAnimMessage("Press 'space' to swing the swing");
    // });
	
    // When someone leaves the doorstep (inside the room), we remove the message
    // WA.room.onLeaveLayer('animationzones/swing').subscribe(() => {
        // if (animMessage !== undefined) {
            // animMessage.remove();
        // }
    // });

        console.log('Scripting API Extra ready');
	

}).catch(e => console.error(e));

export {};
