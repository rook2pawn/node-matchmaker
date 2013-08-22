var util = require('util');
var ee = require('events').EventEmitter;

var Matchmaker = function() {
    if (!(this instanceof Matchmaker))
        return new Matchmaker;
    this.prefs = {
        checkinterval : 5000,
        threshold : 100,
        maxiters : 5
    };
    this.queue = [];
    this.push = function(obj) {
        this.queue.push(obj);
    };
    this.policy = undefined;
    this.timerid = undefined;
    this.start = function() {
        if (this.policy === undefined) {
            console.log("Policy is not set! Cannot start");
            return
        }
        var myfn = function() {
            var iter = 0;
            while ((this.queue.length >= 2) && (iter < this.prefs.maxiters)) {
                var len = this.queue.length; 
                var matchobj = {match:false,idx:undefined};
                for (var i = 0; i < len; i++) {
                    for (var j = i+1; j < len; j++) {
                        var policyvalue = this.policy(this.queue[i],this.queue[j]);
                        if (policyvalue >= this.prefs.threshold) {
                            matchobj.match = true; matchobj.idx = [i,j];
                            break;
                        }
                    } 
                    if (matchobj.match) 
                        break;
                }
                if (matchobj.match) {
                    var a = this.queue.splice(matchobj.idx[0],1).pop();
                    var b = this.queue.splice(matchobj.idx[1]-1,1).pop();
                    this.emit('match',{a:a,b:b});
                }
                iter++;
            }
        };  
        this.timerid = setInterval(myfn.bind(this),this.prefs.checkinterval);
    };
    this.stop = function() {
        clearInterval(this.timerid);
    };
};
util.inherits(Matchmaker, ee);
module.exports = exports = Matchmaker;
