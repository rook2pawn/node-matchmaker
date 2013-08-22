matchmaker
==========

matchmaker is a VERY simple, perhaps, simplistic matchmaker that creates two-element match sets.

To create a match you need a policy function that takes two elements
and returns an integer value. If the integer value is higher than some
threshold, it is considered a match and emits 'match'.


Say we want to match people by some rank. we could do the following:

    var Matchmaker = require('matchmaker');
    var mymatch = new Matchmaker;
    mymatch.policy = function(a,b) {
        if (Math.abs(a.rank-b.rank) < 20)
            return 100
        else 
            return 0
    };
    mymatch.on('match', function(result) {
        console.log(result.a); // match a
        console.log(result.b); // match b
    });
    mymatch.start();

Then we can 
    
    mymatch.push({user:'walter',rank:1450});
    mymatch.push({user:'skyler',rank:1465});

Properties
==========

.policy
-------
You can set
   
    mymatch.policy = function(a,b) {
        // do some comparisons...
        // your logic
        // if it satisfies
           // return 100 (or threshold)
        // else
        // return 0 (or below threshold)
    }

.prefs
------
You can set
    
    mymatch.prefs.checkinterval = 5000; // default
    mymatch.prefs.threshold = 100; // default
    mymatch.prefs.maxiters = 5; // default

.prefs.checkinterval is the number of milliseconds between insepcting the queue with the policy function

.prefs.threshold is the integer that is compared with the policy function output

.prefs.maxiters is the maximum number of iterations to process the entire queue between checkintervals.

.queue
------
This is the internal queue for storing elements to be matched.

METHODS
=======

.push
-----
.push allows you to push elements into the queue.

.start
------
.start starts the service.

.stop
-----
.stop stops the service.


LICENSE
=======

node-matchmaker Copyright (c) 2011 David Wee rook2pawn@gmail.com

Free software provided under the MIT License
http://opensource.org/licenses/mit-license.php
