function Organism(orgStats, startLoc) {
		this.foodRank = orgStats[0];
		this.r = orgStats[1]/2;
		this.visionR = orgStats[2]/2;
		this.maxVel = orgStats[3];
		this.startDiet = orgStats[4];
		this.calories = orgStats[4];
		this.burnRatePerUpdate = orgStats[5]*(1.0/fPS);
		this.hunting = false;
		this.nearest = 1000;
		this.nearestPV = [0,0];

		this.loc = [random(this.r, width - this.r), random(this.r, height - this.r)];

		this.vel = [random(-this.maxVel, this.maxVel),random(-this.maxVel, this.maxVel)];
		
		this.acc = [0,0];
		//render();

	this.colorize = function(foodRank){
		switch(foodRank){
			case 0:
				this.c1 = color(random(0,50),random(150,255),random(0,50));
				break;
			case 1:
				this.c1 = color(random(0,50),random(0,50),random(150,255));
				break;
			case 2:
				this.c1 = color(random(150,255),random(0,50),random(0,50));
				break;
		}
		this.c2 = color(this.c1, 10);
	},

	this.run = function(organisms){
		if (this.foodRank != 0){
			this.interact(organisms);
			if (this.calories >= 2*this.startDiet) this.reproduce(organisms);
			this.burnCal();
		}

		//plant reproduction
		if ((this.foodRank == 0) && (organisms.length < 100)){
			f = random(0,1);
			if (f < 1.0/120.0) this.reproduce(organisms);
		}
		this.update();
		this.render();
	},

	this.interact = function(organisms){
		if (this.foodRank < 2) this.findPred(organisms);
		if (!this.hunted) this.findPrey(organisms);
	},

	this.findPred = function(organisms){
		/*hunted = false;
		for (i = 0; i < organisms.length; i++){
			other = organisms[i];
			if ((this.foodRank == other.foodRank - 1) && (loc.dist(other.loc) < visionR)){
				acc.add(steer(other.loc));
				acc.mult(-1);
				hunted = true;
				break;
			}
		}*/

	},

	this.findPrey = function(organisms){
		/*hunting = false;
		nearest = 1000;
		for (i = 0; i < organisms.length; i++){
			other = organisms[i];
			if ((this.foodRank == other.foodRank + 1) && (loc.dist(other.loc) < visionR)){
				if(loc.dist(other.loc) <= r){
					ecosystem.killOrganism(this.foodRank - 1, i, other.calories*.25, other.loc);
					calories += other.calories*.75;
					hunting = false;
					nearest = 1000;
					break;
				} else {

					tempDist = loc.dist(other.loc);
					if (tempDist < nearest){
						nearest = tempDist;
						nearestPV = other.loc;
					}
					hunting=true;
	
					acc.set(steer(nearestPV));
				}
			}
		}	*/	
	},

	this.steer = function(target){
		steer;  // The steering vector
	    desired = target.sub(target,loc);  // A vector pointing from the location to the target
	    d = desired.mag(); // Distance from the target is the magnitude of the vector
	    // If the distance is greater than 0, calc steering (otherwise return zero vector)
	    if (d > 0) {
			// Normalize desired
			desired.normalize();
			desired.mult(maxVel);
			// Steering = Desired minus Velocity
			steer = target.sub(desired,vel);
			steer.limit(maxVel);  // Limit to maximum steering force
	    } else {
	    	steer = [0,0];
	    }
	    return steer;
	},

	this.reproduce = function(organisms){
	
		ecosystem.spawn(ecoStats[this.foodRank], this.loc);
		this.calories -= this.startDiet - 1;

	},

	this.burnCal = function(){
		this.calories -= this.burnRatePerUpdate;
	},

	this.update = function() {
		if ((this.hunting == false) && (this.hunted == false)){

			// Update velocity
			//FIX vel.add(new [random(-1,1),random(-1,1)]);

		} else{
			//FIX vel.add(acc);
		}

		//FIX vel.limit(maxVel);
		//this.checkWallCollision();

		// Update org position
		//FIX loc.add(vel);

		//FIX acc.mult(0);

	},

	/*this.checkWallCollision = function(){
		if (loc[0] < r ) {
			vel[0] = 1;
		}
		if (loc[0] > width - r) {
			vel[0] = -1;
		}
		if (loc[1] < r) {
			vel[1] = 1;
		}
		if (loc[1] > height - r) {
			vel[1] = -1;
		}
	},*/

	this.render = function(){
		// Draw
		fill(this.c2);
		ellipse(this.loc[0], this.loc[1], this.visionR*2, this.visionR*2);
		fill(this.c1);
		ellipse(this.loc[0], this.loc[1], this.r*2, this.r*2);

	},

	this.move = function(newLoc){
		this.loc = newLoc;
	}

	this.colorize(this.foodRank)
}