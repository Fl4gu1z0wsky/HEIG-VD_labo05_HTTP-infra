var Chance = require('chance');
var chance = new Chance();
const port = 3000
var Express = require('express')
var app = Express()

app.get('/', (req, res) => {
  res.send(generateFight())
})

app.listen(port, () => {
  console.log('Example app listening on port ' + port)
})

function generateFight() {
	var knights = [];
	for (var i = 0; i < 2; i++) {
		knights.push({
			name: chance.name(),
			life: chance.integer({ min: 10, max: 20 }),
			strenght: chance.integer({ min: 1, max: 5 })
		});
	};
	console.log(knights[0].name + " is attacking " + knights[1].name);
	console.log(knights[1].name + " lost " +  knights[0].strenght + " points of life");
	knights[1].life -= knights[0].strenght;
	console.log(knights[1].name + " has now " +  knights[1].life + " points of life");
	return knights;
	
}
