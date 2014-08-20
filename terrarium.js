var oSize = 25;
var maxspeed = 5;
var width = 800;
var height = 600;
var plantPop = 40 //40; FIX
var preyPop = 10 //10;
var predPop = 2 //2;
var vision = 5*oSize;
var calPerSec = .5;
var fPS = 30


// Rank in the ecosystem, diameter, vision radius, maxspeed, starting diet

plantStats = {
	rank: 0,
	diameter: 3,
	visionRadius: 3,
	maxspeed: maxspeed*0.1,
	startingDiet: 1,
	calorieBurnRate: calPerSec
}

preyStats = {
	rank: 1,
	diameter: oSize*0.6,
	visionRadius: vision*0.6,
	maxspeed: maxspeed*0.6,
	startingDiet: 5,
	calorieBurnRate: calPerSec
}

predStats = {
	rank: 2,
	diameter: oSize,
	visionRadius: vision,
	maxspeed: maxspeed,
	startingDiet: 25,
	calorieBurnRate: calPerSec
}

ecoStats = [plantStats, preyStats, predStats];

function setup(){
	
	createCanvas(800, 600);
	ecosystem = new Ecosystem;
	for (var i = 0; i < plantPop; i++){
		ecosystem.addOrganism(new Organism(ecoStats[0]));
	}
	for (var i = plantPop; i < (preyPop + plantPop); i++){
		ecosystem.addOrganism(new Organism(ecoStats[1]));
	}
	for (var i = (plantPop + preyPop); i < (predPop + plantPop + preyPop); i++){
		ecosystem.addOrganism(new Organism(ecoStats[2]));
	}
	noStroke();
	smooth();
	frameRate(fPS);
}

function draw(){
	background(50);
	ecosystem.run();
}

function mousePressed(){
	var mouseVector = new p5.Vector(mouseX, mouseY);
	ecosystem.spawn(1, mouseVector);
}

function randomVector(x){
	var tempVector = new p5.Vector(random(-x,x),random(-x,x));
	return tempVector;
}
