var matcher = require('./index');
var preferenceFn = function(other,self) {
	console.log("other elo: " + other.elo);
	console.log("self.elo :"  + self.elo);
	var diff = (other.elo - self.elo);
	if (diff >= 0) return 1;
	else return 0.5;	
};
var generateResultSetFn = function() {
};
matcher()
	.push({id:1,name:"Garry Kasaparov",elo:2100},
	function(el,emitter,self) { 
		setTimeout(function() {
			console.log(el);
			console.log(self.queue());
		var queue = self.queue();
		var resultSet = [];
		queue.forEach(function(obj) {
			console.log("Foreach..");console.log(obj[0]);		
			console.log(preferenceFn(obj[0],el));
		});

			emitter.emit('next');
		},1000);
	})
	.push({id:2,name:"Bobby Fischer",elo:2050},
	function(el,emitter,self) { 
		console.log(el);
		console.log(self.queue());
		emitter.emit('next');
	})
	.push({id:3,name:"Glaurung",elo:2800},
	function(el,emitter,self) { 
		console.log(el);
		console.log(self.queue());
//		self.forEach(function(val){
//			console.log("DFDF");console.log(val)});
		emitter.emit('next');
	})
	.push({name:"Fruit",elo:2750},
	function(el,emitter,self) { 
		console.log(el);
		console.log(self.queue());
		emitter.emit('next');
	});
