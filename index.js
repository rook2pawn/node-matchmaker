var Matcher = function(obj) {
	var config = {interval:undefined,checkTimerId:undefined};
	if (obj.interval !== undefined) {
		config.interval;
	} else {
		config.interval = 4000;	
	}
	var self = {};
	var openRequests = [];
	var look = function() {
		openRequests.forEach(function() {
		});
	};
	self.push = function(obj) {
		openRequests.push({val:obj.value,evaluation:obj.evaluation,cb:obj.cb});	
		return self;
	};
	self.start = function () {
		config.checkTimerId = setInterval(chron,config.interval);
		return self;
	};
	self.stop = function() {
		if (config.checkTimerId !== undefined) {
			clearInterval(config.checkTimerId);
		}
		return self;
	};
};
exports = module.exports = Matcher;

// an evalutation function will be passed one object, and the sole purpose of this function
// f(obj) = numerical value. 
// however! the evaluation can and should be partially applied to preconfigure any global additional parameters without
// having be overly specific in the per-user evaluation function
