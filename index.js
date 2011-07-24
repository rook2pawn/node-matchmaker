var EventEmitter = require('events').EventEmitter;
var Qlib = require('queuelib');
var partial = require('partial');
var Matcher = function(obj) {
	var readyfunc = obj.readyfunc;
	var myEmitter = new EventEmitter;
	var openRequests = Qlib({emitter:myEmitter,noDeleteOnNext:true});
	myEmitter.on('resultsetready',readyfunc);
	var self = {};
	self.push = function(obj,fn) {
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
Matcher.preferenceGeneral = function(el,emitter,self,key) { 
	var queue = self.queue();
	var resultSet = [];
	queue.forEach(function(obj) {
		if (obj[0].id !== el.id) {
			var result = {match:Matcher.similarityFn(obj[0],el,key),player:obj};
			resultSet.push(result);
		}
	});
	if (resultSet.length <= 3) { 
		setTimeout(function() {
			Matcher.preference(el,emitter,self,key);
		},1000);
	} else {
		var comp = function(a,b) {
			return b.match - a.match
		};
		resultSet = resultSet.sort(comp);
		emitter.emit('resultsetready',el,resultSet);
	}
	emitter.emit('next');
};
var foo = partial.rapply(Matcher.preferenceGeneral);
Matcher.preference = foo('elo'); // right hand side partial apply (to set key in the arguments: el, emitter, self, key)
exports = module.exports = Matcher;
