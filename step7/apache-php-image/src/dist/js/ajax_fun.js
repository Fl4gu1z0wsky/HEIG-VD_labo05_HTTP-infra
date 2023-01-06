// We fetch our dynamic resources created before
function fetchFighters() {
	console.log("Loading the fighters in the arena");
	fetch('http://localhost/api')
	.then((response) => response.json())
	.then((data) => loadFighters(data));
};

// We write on the paragraph what we want from our ressource
function loadFighters(fighters) {
	console.log("Changing the ajax id paragraph");
	document.getElementById('ajax').innerText = `${fighters[0].name} has ${fighters[0].strenght} in strenght and ${fighters[0].life} points of life`;
	document.getElementById('ajax2').innerText = `${fighters[1].name} has ${fighters[1].strenght} in strenght and ${fighters[1].life} points of life`;
};

// To change dynamically the resource
setInterval(fetchFighters, 2000);
