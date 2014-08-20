function Organism(stats) {
		this.foodRank = stats.rank;
		this.radius = stats.diameter/2;
		this.visionR = stats.visionRadius;
		this.maxVel = stats.maxspeed;
		this.startDiet = stats.startingDiet;
		this.calories = stats.startingDiet;
		this.burnRatePerUpdate = stats.calorieBurnRate*(1.0/fPS);
		this.hunting = false;
		this.hunted = false;
		this.nearestDist = null;
		this.nearestPV = null;
		this.orgNumber = ecosystem.organisms.length;

		this.loc = new p5.Vector(random(this.radius, width - this.radius), random(this.radius, height - this.radius));

		this.vel = new p5.Vector(random(-this.maxVel, this.maxVel),random(-this.maxVel, this.maxVel));
		
		this.acc = new p5.Vector(0,0);

	this.colorize = function(foodRank){
		switch(foodRank){
			case 0:
				var mainColor = color(random(0,50),random(150,255),random(0,50));				
				break;
			case 1:
				var mainColor = color(random(240,255),random(240,255),random(0,50));
				break;
			case 2:
				var mainColor = color(random(150,255),random(0,50),random(0,50));
				break;
		}

		this.c1 = mainColor
		this.c2 = color(mainColor.rgba[0], mainColor.rgba[1], mainColor.rgba[2], 20);
	},

	this.run = function(organisms){
		if (this.foodRank != 0){
			this.interact(organisms);
			if (this.calories >= 2*this.startDiet) this.reproduce();
			this.burnCal();
			//console.log('cal for ', this.orgNumber, ": ", this.calories)
		}

		//plant reproduction
		if ((this.foodRank == 0) && (organisms.length < 200)){
			f = random(0,1);
			if (f < 1.0/120.0) this.reproduce();
		}
		this.update();
		this.render();
	},

	this.interact = function(organisms){
		if (this.foodRank < 2) this.findPred(organisms);
		if (!this.hunted) this.findPrey(organisms);
	},

	this.findPred = function(organisms){
		this.hunted = false;
		for (var i = 0; i < organisms.length; i++){
			this.other = organisms[i];
			if ((this.foodRank == this.other.foodRank - 1) && (this.loc.dist(this.other.loc.get()) < (this.visionR + this.other.radius))){
				this.acc = this.steer(this.other.loc.get());
				this.acc.mult(-1);
				this.hunted = true;
				//console.log('hunted')
				break;
			}
		}
	},

	this.findPrey = function(organisms){
		var place = this.loc.get()
		this.hunting = false;
		this.nearestDist = null;
		this.nearestPV = null
		// for each organism
		for (var i = 0; i < organisms.length; i++){
			this.other = organisms[i];
			//if it is edible and in range
			if ((this.foodRank == this.other.foodRank + 1) && (place.dist(this.other.loc.get()) < (this.visionR + this.other.radius))){
				// if is underneath, eat it
				if(place.dist(this.other.loc.get()) <= this.radius){
					ecosystem.killOrganism(this.foodRank - 1, i, this.other.calories*.25, this.other.loc.get());
					this.calories += this.other.calories*.75;
					this.hunting = false;
					this.nearestDist = null;
					this.nearestPV = null;
					//console.log('nomnomnom')
					break;
				// otherwise evaluate for hunt
				} else {
					//console.log('targeting')
					this.tempDist = place.dist(this.other.loc.get());
					if (!this.nearestDist){
						this.nearestDist = this.tempDist;
					}
					//if closest
					if (this.tempDist <= this.nearestDist){
						this.nearestDist = this.tempDist;
						this.nearestPV = this.other.loc.get();
						this.hunting=true;
						//console.log('hunting')
						this.acc = this.steer(this.nearestPV);
					}
					
					
	
					
				}
			}
		}	
	},

	this.steer = function(target){
		var heading;  // The steering vector
	    var desired = target.sub(this.loc.get());  // A vector pointing from the location to the target
	    var d = desired.mag(); // Distance from the target is the magnitude of the vector
	    // If the distance is greater than 0, calc steering (otherwise return zero vector)
	    if (d > 0) {
			// Normalize desired
			desired.normalize();
			desired.mult(this.maxVel);
			// Steering = Desired minus Velocity
			heading = desired.sub(this.vel);
			heading.limit(this.maxVel);  // Limit to maximum steering force
	    } else {
	    	heading = new p5.Vector(0,0);
	    }
	    return heading;
	},

	this.reproduce = function(){
		ecosystem.spawn(this.foodRank, this.loc);
		this.calories -= (this.startDiet - 1);
	},

	this.burnCal = function(){
		this.calories -= this.burnRatePerUpdate;
	},

	this.update = function() {
		if ((this.hunting == false) && (this.hunted == false)){

			// Update velocity
			this.vel.add(randomVector(1));

		} else{
			this.vel.add(this.acc);
		}

		
		this.vel.limit(this.maxVel);
		this.checkWallCollision();

		// Update org position
		this.loc.add(this.vel);

		//zero out acceleration
		this.acc.mult(0);

	},

	this.checkWallCollision = function(){
		if (this.loc.x < this.radius) this.vel.x = 1;
		if (this.loc.x > width - this.radius) this.vel.x = -1
		if (this.loc.y < this.radius) this.vel.y = 1
		if (this.loc.y > height - this.radius) this.vel.y = -1
	},

	this.render = function(){
		var place = this.loc.get()

		// Draw
		fill(this.c2);
		ellipse(place.x, place.y, this.visionR*2, this.visionR*2);
		fill(this.c1);
		ellipse(place.x, place.y, this.radius*2, this.radius*2);
	},

	this.move = function(newLoc){
		this.loc = newLoc.get();
	}
	//console.log('new org of troph', this.foodRank)
	this.colorize(this.foodRank)
}