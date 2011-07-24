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
		},
		obj:function(){}
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
 
elements
========

Matchmaking is composed of primarily two pieces:

1. A preference function - a function that evaluates every other member in the queue
2. A queue to hold the unmatched.

Included is a sample preference function (Matcher.preference) that illustrates roughly how to write a preference function,
and its role within the queue, and how it can provide some elements of flow control within the queue.
Also included is a similarity function (used by the preference function) to help illustrate the kind of function you'll want
to write yourself. The main idea is that we want some way to gauge how each object can numerically assess every other object.
