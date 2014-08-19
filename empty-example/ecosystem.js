function Ecosystem(){
	this.organisms = [];

	this.run = function() {
		for (i = 0; i < this.organisms.length; i++){
			var o = this.organisms[i];
			o.run(this.organisms);
			if (o.calories < o.startDiet/2) this.killOrganism(o.foodRank, i, o.calories, o.loc);

		}
	}

	this.addOrganism = function(o){
			this.organisms.push(o);
	}

	this.spawn = function(oS, tempL){	
		l = tempL;
		o = new Organism(oS, l);
		l.push([random(-3,3),random(-3,3)]);
		o.move(l);
		ecosystem.addOrganism(o);	
	}

	this.decompose = function(l, pop){

		for (i = 0; i < pop; i++){
			l.add([random(-3,3),random(-3,3)]);
			o = new Organism(ecoStats[0], l);
			addOrganism(o);	
		}
	}

	this.killOrganism = function(fr, i, cal, l){
		this.organisms.remove(i);
		if (fr > 0){
			decompose(l, int(cal));
		}
	}
}