# matchmaker
Simplistic matchmaker based off of [matchmaker](https://npmjs.com/package/matchmaker), but with type definitions.
The original is no longer maintained, so I made this.
```js
    var mymatch = require('matchmaker.js').newMatchmaker({
        // your options here...
    });
    mymatch.policy = function(a,b) {
        if (Math.abs(a.rank-b.rank) < 20)
            return 100
        else 
            return 0
    };
    mymatch.on('match', function(a, b) {
        console.log(a); // match a
        console.log(b); // match b
    });
    mymatch.start();
```
Then we can 
```js
    mymatch.push({user:'walter',rank:1450});
    mymatch.push({user:'skyler',rank:1465});
```

See type definitions for more info.