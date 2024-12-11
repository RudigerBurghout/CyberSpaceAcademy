/// <reference types="@workadventure/iframe-api-typings" />

import 	{ } from "https://unpkg.com/@workadventure/scripting-api-extra@^1/dist/bundle.js";
import {webVoteReset} from "./web.js";

console.log('Script started successfully');

// const delay = ms => new Promise(res => setTimeout(res, ms));
let resultPopup = undefined;

// Waiting for the API to be ready
WA.onInit().then(async () => {
	
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
	
	await WA.players.configureTracking({
        players: true,
        movement: false,
    });
	
	WA.room.onEnterLayer('zones/yellow').subscribe(() => {
		WA.state.voteY ++;
		console.log(WA.state.voteY);
    });
	WA.room.onEnterLayer('zones/green').subscribe(() => {
		WA.state.voteG ++;
		console.log(WA.state.voteG);
    });
	WA.room.onEnterLayer('zones/blue').subscribe(() => {
		WA.state.voteB ++;
		console.log(WA.state.voteB);
    });
	WA.room.onEnterLayer('zones/red').subscribe(() => {
		WA.state.voteR ++;
		console.log(WA.state.voteR);
    });
	WA.room.onEnterLayer('visibleZones/reset').subscribe(() => {
		WA.state.voteY = 0;
		WA.state.voteG = 0;
		WA.state.voteB = 0;
		WA.state.voteR = 0;
		webVoteReset();
    });

    console.log('Scripting API Extra ready');
	

}).catch(e => console.error(e));

export {};
