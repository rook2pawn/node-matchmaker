var matcher = require('../index');
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
