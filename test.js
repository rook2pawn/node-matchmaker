var matcher = require('./index');
var mymatcher = matcher();
mymatcher.push({id:1,name:"Garry Kasaparov",elo:2100,win:190,loss:20},matcher.preference);
mymatcher.push({id:2,name:"Bobby Fischer",elo:2050,win:100,loss:38},matcher.preference);
mymatcher.push({id:3,name:"Glaurung",elo:2800,win:129,loss:33},matcher.preference);
mymatcher.push({id:4,name:"Fruit",elo:2750,win:201,loss:10},matcher.preference);
mymatcher.push({id:5,name:"John Q.",elo:1450,win:33,loss:30},matcher.preference);
