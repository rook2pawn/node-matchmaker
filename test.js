var Matchmaker = require('./');
var mymatch = new Matchmaker;

mymatch.on('match',function(obj) {
    console.log("match!");
    console.log(obj.a);console.log(obj.b);
});

var queue = [{time:15,username:'hank'},{time:30,username:'fred'},{time:25,username:'jiji'},{time:17,username:'sadako'},{time:30,username:'foobar'},{time:17,username:'gabby'},{time:15,username:'saikano'},{time:29,username:'baron'}];
var policy = function(a,b) {
    if (a.time == b.time) 
        return 100;
    else return 0;
};
mymatch.policy = policy;
mymatch.queue = queue;
console.log(mymatch.queue);
mymatch.start();
