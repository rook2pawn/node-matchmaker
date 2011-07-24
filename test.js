var matcher = require('./index');
// so conceptually, the way to write a preference fn -> [0%,100%] is
// to have an idealized opponent, and then return the percentage that your
// current possible opponent matches this idealized opponent.

// so this preference function has an idealized opponent that matches ones own ELO
// thus the closer the opp is to him/her/itself then the closer it is to 100%.
var preferenceFn = function(other,self) {
	console.log("other elo: " + other.elo);
	console.log("self.elo :"  + self.elo);
//2100 - 2100 / 2100 = 0% diff,  -> 100% - 0% = 100% match
//2300 - 2100 / 2100 = 10% difference.-> 100% - 10% = 90% match
	var diff = Math.abs(other.elo - self.elo);
	var ratio = diff / self.elo;
	var match = 1 - ratio;
	return match;

};
var generateResultSetFn = function() {
};
var mymatcher = matcher();
mymatcher.push({id:1,name:"Garry Kasaparov",elo:2100,win:190,loss:20},
	function foo(el,emitter,self) { 
		var queue = self.queue();
		var resultSet = [];
		queue.forEach(function(obj) {
			var result = {match:preferenceFn(obj[0],el),player:obj};
			resultSet.push(result);
		});
		console.log("Result set for " + el.name); console.log(resultSet);
		if (resultSet.length == 0) { 
			setTimeout(function() {
				self.push(el,foo(el,emitter,self));
			},3000);
		} else {
			emitter.emit('next');
		}
	});
mymatcher.push({id:2,name:"Bobby Fischer",elo:2050,win:100,loss:38},
	function foo(el,emitter,self) { 
		var queue = self.queue();
		var resultSet = [];
		queue.forEach(function(obj) {
			var result = {match:preferenceFn(obj[0],el),player:obj};
			resultSet.push(result);
		});
		console.log("Result set for " + el.name); console.log(resultSet);
		if (resultSet.length == 0) { 
			setTimeout(function() {
				self.push(el,foo(el,emitter,self));
			},3000);
		} else {
			emitter.emit('next');
		}
	});
mymatcher.push({id:3,name:"Glaurung",elo:2800,win:129,loss:33},
	function foo(el,emitter,self) { 
		var queue = self.queue();
		var resultSet = [];
		queue.forEach(function(obj) {
			var result = {match:preferenceFn(obj[0],el),player:obj};
			resultSet.push(result);
		});
		console.log("Result set for " + el.name); console.log(resultSet);
		if (resultSet.length == 0) { 
			setTimeout(function() {
				self.push(el,foo(el,emitter,self));
			},3000);
		} else {
			emitter.emit('next');
		}
	});
mymatcher.push({name:"Fruit",elo:2750,win:201,loss:10},
	function foo(el,emitter,self) { 
		var queue = self.queue();
		var resultSet = [];
		queue.forEach(function(obj) {
			var result = {match:preferenceFn(obj[0],el),player:obj};
			resultSet.push(result);
		});
		console.log("Result set for " + el.name); console.log(resultSet);
		if (resultSet.length == 0) { 
			setTimeout(function() {
				self.push(el,foo(el,emitter,self));
			},3000);
		} else {
			emitter.emit('next');
		}
	});

