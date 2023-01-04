/*$(function() {
	console.log("Loading the fighters in the arena");
	
	function loadFighters() {
		$.getJSON( "http://localhost/api", function (fighters) {
			console.log(fighters);
			var message = "It seems that all the fighters are cowards ...";
			if ( students.length > 0) {
				message = `${fighters[0].name} has ${fighters[0].strenght} in strenght and ${fighters[0].life} points of life`;
			}
			$(".my_js_test").text(message);
		});
	};
});*/

//loadFighters();


function loadFighters() {
	fetch('/api')
	.then((response) => response.json())
	.then((data) => document.getElementById("my_js_test").innerHTML = (data));
};

loadFighters();
