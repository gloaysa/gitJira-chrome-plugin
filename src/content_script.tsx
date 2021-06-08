import { Addon } from "./components/addon";


let currentTicket: string;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	// listen for messages sent from background.js
	if (request.message === 'jira ticket changed') {
		if (request.ticket === currentTicket) return;

		currentTicket = request.ticket;
		Addon(currentTicket);
	}
});


