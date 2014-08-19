var oSize = 25;
var maxspeed = 5;
var width = 800;
var height = 600;
var plantPop = 40;
var preyPop = 10;
var predPop = 2;
var vision = 10*oSize;
var calPerSec = .5;
var origin = [0,0] //new PVector(0,0);
var fPS = 30;


// Rank in the ecosystem, diameter, vision radius, maxspeed, starting diet
plantStats = [0,3,3,maxspeed*.1,1,calPerSec];
preyStats = [1,oSize/2,vision*.6,maxspeed*.6,5,calPerSec];
predStats = [2,oSize,vision,maxspeed,25, calPerSec];
ecoStats = [plantStats, preyStats, predStats];

function setup(){
	
	createCanvas(800, 600);
	ecosystem = new Ecosystem;
	for (i = 0; i < plantPop; i++){
		ecosystem.addOrganism(new Organism(ecoStats[0], origin));
	}
	for (i = plantPop; i < preyPop + plantPop; i++){
		ecosystem.addOrganism(new Organism(ecoStats[1], origin));
	}
	for (i = plantPop + preyPop; i < predPop + plantPop + preyPop; i++){
		ecosystem.addOrganism(new Organism(ecoStats[2], origin));
	}
	noStroke();
	smooth();
	frameRate(fPS);
}

function draw(){
	background(52);
	ecosystem.run();
}

function mousePressed(){
	ecosystem.spawn(ecoStats[1], [mouseX,mouseY]);
}
