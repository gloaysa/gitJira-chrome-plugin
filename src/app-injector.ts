const foreground_entry_point = document.createElement("div");
let reactJS_script = document.createElement("script");

foreground_entry_point.id = "gitjira-app";
reactJS_script.src = "app.js";

foreground_entry_point.appendChild(reactJS_script);

let content = document.getElementById("stalker") || document.getElementById("DETAILS");

if (content) content.parentNode.insertBefore(foreground_entry_point, content.nextSibling);

