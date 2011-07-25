matchmaker
==========

policy free, streaming matchmaking between objects

what?
=====

Want to pair players? Couples? Patients and Doctors? Any situation where you need to immediately
pair two "things" you can use Matchmaker!

Matchmaker allows you to pair objects according to a per object preference-evaluation function. 

how
===

	var matcher = require('matchmaker');
	var mymatcher = matcher({
		readyfunc:function(player,resultSet){
			var opp = resultSet[0].player[0];
			console.log(player.name + "("+ player.elo + ") most preferred opponent is " + opp.name + "(" + opp.elo + ")");
		}
	});
	mymatcher
		.push({id:1,name:"Garry Kasaparov",elo:2100,win:190,loss:20},matcher.preference)
		.push({id:2,name:"Bobby Fischer",elo:2050,win:100,loss:38},matcher.preference)
		.push({id:3,name:"Glaurung",elo:2800,win:129,loss:33},matcher.preference)
		.push({id:4,name:"Fruit",elo:2750,win:201,loss:10},matcher.preference)
		.push({id:5,name:"John Q.",elo:1450,win:33,loss:30},matcher.preference);

	//results in 

	> John Q.(1450) is matched with Bobby Fischer(2050)
	> Garry Kasaparov(2100) is matched with Bobby Fischer(2050)
	> Bobby Fischer(2050) is matched with Garry Kasaparov(2100)
	> Glaurung(2800) is matched with Fruit(2750)
	> Fruit(2750) is matched with Glaurung(2800)
 
concepts
========

The following is a very general similarity function that operates on a single key. Clearly, you can compose much more
sophisticated functions! If you do, be sure to make sure you are measuring orthogonal properties (a word about that later.)

	Matcher.similarityFn = function(other,self,key) {
		var diff = Math.abs(other[key]- self[key]);
		var ratio = diff / self[key];
		var match = 1 - ratio;
		return match;
	};

Matchmaking is composed of primarily two pieces:

1. A preference function - a function that evaluates every other member in the queue
2. A queue to hold the unmatched.

Invocation
==========

	Matcher.({readyfunc:function(object,readySet){}})

The readyfunction is called whenever an object has a set of matching results. The readyfunc should be tasked with the following

1. Notifying the object
2. Notifying the top one or two objects in readySet (a sorted array of best match to worst match)

methods
=======

.push(obj,preferenceFn)
-----------------------

object is the element to be matched, and preferenceFn is the preference-evaluation function that will be applied to the queue
(excluding itself)


