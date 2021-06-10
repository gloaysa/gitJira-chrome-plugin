const foreground_entry_point = document.createElement("div");
let reactJS_script = document.createElement("script");

foreground_entry_point.id = "gitjira-app";
reactJS_script.src = "app.js";

foreground_entry_point.appendChild(reactJS_script);

setTimeout(() => {
	let content = document.getElementById("details-module") || document.getElementById("DETAILS");

	if (content) content.parentNode.insertBefore(foreground_entry_point, content.nextSibling);

	chrome.runtime.sendMessage('app ready');
}, 1000)




