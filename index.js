var EventEmitter = require('events').EventEmitter;
var Qlib = require('queuelib');
var Matcher = function(obj) {
	var myEmitter = new EventEmitter;
	var openRequests = Qlib({emitter:myEmitter});
	var self = {};
	self.push = function(obj,fn) {
		openRequests.push(obj,fn);
		return self;
	};
	return self;
};

exports = module.exports = Matcher;

// an evalutation function will be passed one object, and the sole purpose of this function
// f(obj) = numerical value. 
// however! the evaluation can and should be partially applied to preconfigure any global additional parameters without
// having be overly specific in the per-user evaluation function
