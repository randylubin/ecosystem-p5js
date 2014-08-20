function Ecosystem(){
	this.organisms = [];
	this.killList = [];

	this.run = function() {
		for (var i = 0; i < this.organisms.length; i++){
			var o = this.organisms[i];
			//console.log('organisms:', this.organisms)
			o.run(this.organisms);
			if (o.calories < o.startDiet/2) {
				
				this.killList.push(i);
			}
			//console.log('organism ', i, ' has run')
		}
		//console.log('killList:', this.killList)
		while (this.killList.length){
			var i = this.killList.pop()
			var o = this.organisms[i]
			this.killOrganism(o.foodRank, i, o.calories, o.loc.get());
		}
		this.killList = []

		//console.log('total organisms:', this.organisms.length)
	}

	this.addOrganism = function(o){
		this.organisms.push(o);
	}

	this.spawn = function(foodRank, locale){	
		locale.add(randomVector(5));
		var o = new Organism(ecoStats[foodRank]);
		o.move(locale);
		this.addOrganism(o);
	}

	this.decompose = function(locale, pop){

		for (var i = 0; i < pop; i++){
			locale.add(randomVector(3));
			this.spawn(0,locale)	
		}
	}

	this.killOrganism = function(foodRank, i, cal, locale){
		if (foodRank > 0){
			this.decompose(locale, cal);
			//console.log('dead!')

		}
		//console.log('killing2', ecosystem.organisms[i])

		if (this.organisms.length === 1){
			this.organisms = [];
		}else{
			this.organisms.splice(i,1);
		}
	}
}