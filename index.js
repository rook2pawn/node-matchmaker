var EventEmitter = require('events').EventEmitter;
var Qlib = require('queuelib');
var partial = require('partial');
var Matcher = function(obj) {
	var readyfunc = obj.readyfunc;
	var openRequests = Qlib({noDeleteOnNext:true});
	var self = {};
	self.push = function(obj,fn) {
		openRequests.pushAsync(obj,fn);
		return self;
	};
    self.velocity = function() {
        return openRequests.getVelocity();
    };
	self.queue = function(){
		return openRequests.queue();
	};
	self.update = function() {
		openRequests.update();
		return self;
	};
    self.readyFunc = function() {
        readyfunc(arguments);
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
Matcher.preferenceGeneral = function(el,self,key) { 
	var queue = self.queue();
	console.log("queue is size " + queue.length);
	var resultSet = [];
	queue.forEach(function(params) {
        var obj = params.el;
		if (obj.id !== el.id) {
			var result = {match:Matcher.similarityFn(obj,el,key),player:obj};
			resultSet.push(result);
		}
	});
	if (resultSet.length <= 3) { 
		setTimeout(function() {
			Matcher.preference(el,self,key);
		},1000);
	} else {
		var comp = function(a,b) {
			return b.match - a.match
		};
		resultSet = resultSet.sort(comp);
        var opp = resultSet[0];
        console.log("***EL");console.log(el);
        console.log(opp);
	}
    self.done();
};
var foo = partial.rapply(Matcher.preferenceGeneral);
Matcher.preference = foo('elo'); // right hand side partial apply (to set key in the arguments: el, emitter, self, key)
exports = module.exports = Matcher;
