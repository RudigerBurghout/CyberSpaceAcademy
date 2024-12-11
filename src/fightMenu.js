/// <reference types="@workadventure/iframe-api-typings" />

import 	{ } from "https://unpkg.com/@workadventure/scripting-api-extra@^1/dist/bundle.js";

console.log('Script started successfully');

//only one action message per player loaded script
let combatMessage = undefined;
let popupMessage = undefined;

const delay = ms => new Promise(res => setTimeout(res, ms));

// Initialization
WA.onInit().then(async () => {
	
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
	
	await WA.players.configureTracking({
        players: true,
        movement: false,
    });
	
	setupPopup();
	setupCombat();
	
    console.log('Scripting API Extra ready');
	
}).catch(e => console.error(e));

function setupPopup () {
	//popup subscription
	WA.room.onEnterLayer('visibleZones/popup').subscribe(() => {
		setPopupMessage("Druk 'spatiebalk' om een popup te openen!");
	});
		
	// When someone leaves the doorstep (inside the room), we remove the message
	WA.room.onLeaveLayer('visibleZones/popup').subscribe(() => {
		if (popupMessage !== undefined) {
			popupMessage.remove();
		}
	});
}

function setupCombat () {
	//in game combat controls
	//does not change health value, but the HTML file does
	WA.room.onEnterLayer('visibleZones/attack1').subscribe(() => {
		setCombatMessage("druk om spatiebalk om 'Heldhaftige Slag' te gebruiken!", 1);
    });
	WA.room.onEnterLayer('visibleZones/attack2').subscribe(() => {
		setCombatMessage("druk om spatiebalk om 'Kwaadaardige Cyber Medicijnen' te gebruiken!", 2);
    });
	WA.room.onEnterLayer('visibleZones/attack3').subscribe(() => {
		setCombatMessage("druk om spatiebalk om 'Kwaadaardige Slag' te gebruiken!", 3);
    });
	WA.room.onEnterLayer('visibleZones/attack4').subscribe(() => {
		setCombatMessage("druk om spatiebalk om 'Heldhaftige Cyber Medicijnen' te gebruiken!", 4);
    });
	
	// When someone leaves the doorstep (inside the room), we remove the message
	WA.room.onLeaveLayer('visibleZones/attack1').subscribe(() => {
		if (combatMessage !== undefined) { combatMessage.remove(); }
	});
	WA.room.onLeaveLayer('visibleZones/attack2').subscribe(() => {
		if (combatMessage !== undefined) { combatMessage.remove(); }
	});
	WA.room.onLeaveLayer('visibleZones/attack3').subscribe(() => {
		if (combatMessage !== undefined) { combatMessage.remove(); }
	});
	WA.room.onLeaveLayer('visibleZones/attack4').subscribe(() => {
		if (combatMessage !== undefined) { combatMessage.remove(); }
	});
}

function displayPopup() { 
    helloWorldPopup = WA.ui.openPopup("popupRectangle", 'Hallo wereld!', [{
        label: "Sluit",
        className: "primary",
        callback: (popup) => {
            // Close the popup when the "Sluit" button is pressed.
            popup.close();
        }
    }]);
}

function addMenuOption() { 
    const menu = WA.ui.registerMenuCommand('menu test',
		{
			callback: () => {
				WA.chat.sendChatMessage('test');
			},
			key: "test"
		}
	);
}

function setPopupMessage(msg = "Druk 'spatiebalk' om een popup te openen!"){
	popupMessage = WA.ui.displayActionMessage({
		message: msg,
		callback: () => {
			displayPopup();
            setPopupMessage("Druk 'spatiebalk' om een popup te openen!");
		}
	});
}
function setCombatMessage(msg, atkID){
	combatMessage = WA.ui.displayActionMessage({
		message: msg,
		callback: () => {
			activateAttack(atkID);
            setCombatMessage(msg, atkID);
		}
	});
}

function activateAttack(atkID){
	switch(atkID){
	case 1:
		WA.state.attack1 ++;
		console.log(WA.state.attack1);
		break;
	case 2:
		WA.state.attack2 ++;
		console.log(WA.state.attack2);
		break;
	case 3:
		WA.state.attack3 ++;
		console.log(WA.state.attack3);
		break;
	case 4:
		WA.state.attack4 ++;
		console.log(WA.state.attack4);
		break;
	}
}

export {};
