matchmaker
==========

policy free matchmaking between objects

what?
=====

suppose you'd like to match players, people, marriages, hospitals/interns, roomates
with matchmaker this is easy!

how
===

	var matcher = require('matchmaker');
	var mymatcher = matcher();
	mymatcher.push({id:1,name:"Garry Kasaparov",elo:2100,win:190,loss:20},matcher.preference);
	mymatcher.push({id:2,name:"Bobby Fischer",elo:2050,win:100,loss:38},matcher.preference);
	mymatcher.push({id:3,name:"Glaurung",elo:2800,win:129,loss:33},matcher.preference);
	mymatcher.push({id:4,name:"Fruit",elo:2750,win:201,loss:10},matcher.preference);
	mymatcher.push({id:5,name:"John Q.",elo:1450,win:33,loss:30},matcher.preference);

	// .preference is a preloaded sample preference function
	// this preference function basically employs similarityFn to determine how similar an opponent's ELO
	// is to his/her/its own.

 
elements
========

Matchmaking is composed of primarily two pieces:

1. A preference function - a function that evaluates every other member in the queue
2. A queue to hold the unmatched.

Included is a sample preference function (Matcher.preference) that illustrates roughly how to write a preference function,
and its role within the queue, and how it can provide some elements of flow control within the queue.
Also included is a similarity function (used by the preference function) to help illustrate the kind of function you'll want
to write yourself. The main idea is that we want some way to gauge how each object can numerically assess every other object.


