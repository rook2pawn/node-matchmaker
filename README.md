matchmaker
==========

policy free matchmaking between objects

what?
=====

suppose you'd like to match players, people, marriages, hospitals/interns, roomates
with matchmaker this is easy!

how
===

	var matchmaker = require('matchmaker');
	matchmaker.push({
		val:{name:"Garry Kasparov", elo:2100, location:'Russia'}, 
		pref:function(obj) { 
			if (obj.elo >= 1850) { 
				return 1 
			} else { 
				return ((1850 - obj.elo) / 1850)
			}
		},
		notification:function(obj) { console.log("You got a challenger! The challenger's name is " + obj.val.name + "!") }
	});

after some time goes by....

	"You've got a challenger! The challenger's name is Bobby Fischer!"


 
elements
========

each matchmaking object M for object O should contain 

1.	a preference evaluation function
2.	the object itself O
3.	a notification method for requesting acceptence or denial

(this is a work in progress.)
