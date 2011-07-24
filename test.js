var matcher = require('./index');
// so conceptually, the way to write a preference fn -> [0%,100%] is
// to have an idealized opponent, and then return the percentage that your
// current possible opponent matches this idealized opponent.


// so this preference function has an idealized opponent that matches ones own ELO
// thus the closer the opp is to him/her/itself then the closer it is to 100%.

var similarityFn = function(other,self,key) {
//2100 - 2100 / 2100 = 0% diff,  -> 100% - 0% = 100% match
//2300 - 2100 / 2100 = 10% difference.-> 100% - 10% = 90% match
	var diff = Math.abs(other[key]- self[key]);
	var ratio = diff / self[key];
	var match = 1 - ratio;
	return match;
};
function preference(el,emitter,self) { 
	var queue = self.queue();
	var resultSet = [];
	if (el.numRetries === undefined) el.numRetries = 0;
	else el.numRetries++;
	if (el.timeEnter === undefined) {
		var x = new Date();
		el.timeEnter = x.getTime();
	}
	queue.forEach(function(obj) {
		if (obj[0].id !== el.id) {
			var result = {match:similarityFn(obj[0],el,'elo'),player:obj};
			resultSet.push(result);
		}
	});
	if (resultSet.length <= 3) { 
		setTimeout(function() {
			preference(el,emitter,self);
		},3000);
	} else {
		console.log(el.name + " is satisifed.");
		var x = new Date();
		el.timeInQueue = x.getTime() - el.timeEnter;
	}
	emitter.emit('next');
};
var generateResultSetFn = function() {
};
var mymatcher = matcher();

mymatcher.push({id:1,name:"Garry Kasaparov",elo:2100,win:190,loss:20},preference);
mymatcher.push({id:2,name:"Bobby Fischer",elo:2050,win:100,loss:38},preference);
mymatcher.push({id:3,name:"Glaurung",elo:2800,win:129,loss:33},preference);
mymatcher.push({id:4,name:"Fruit",elo:2750,win:201,loss:10},preference);
mymatcher.push({id:5,name:"John Q.",elo:1450,win:33,loss:30},preference);
