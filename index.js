var EventEmitter = require('events').EventEmitter;
var Qlib = require('queuelib');
var Matcher = function(obj) {
	var myEmitter = new EventEmitter;
	var openRequests = Qlib({emitter:myEmitter,noDeleteOnNext:true});
	var self = {};
	self.push = function(obj,fn) {
		var x = new Date();
		obj.enterTime = x.getTime();
		obj.matched = false;
		openRequests.push(obj,fn);
		return self;
	};
	self.queue = function(){
		return openRequests.queue();
	};
	self.update = function() {
		openRequests.update();
		return self;
	};
	return self;
};
Matcher.similarityFn = function(other,self,key) {
	var diff = Math.abs(other[key]- self[key]);
	var ratio = diff / self[key];
	var match = 1 - ratio;
	return match;
};
Matcher.preference = function(el,emitter,self) { 
	var queue = self.queue();
	var resultSet = [];
	queue.forEach(function(obj) {
		if (obj[0].id !== el.id) {
			var result = {match:Matcher.similarityFn(obj[0],el,'elo'),player:obj};
			resultSet.push(result);
		}
	});
	if (resultSet.length <= 3) { 
		setTimeout(function() {
			Matcher.preference(el,emitter,self);
		},1000);
	} else {
		var comp = function(a,b) {
			return b.match - a.match
		};
		el.resultSet = resultSet.sort(comp);
		var opp = el.resultSet[0].player[0];
		console.log(el.name + "("+ el.elo + ") wants to be matched against " + opp.name + "(" + opp.elo + ")");
	}
	emitter.emit('next');
};
exports = module.exports = Matcher;
