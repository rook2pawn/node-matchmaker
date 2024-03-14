const match = require('../dist/index').newMatchmaker()

match.on('match',function(a, b) {
    console.log('match!')
    console.log(a)
    console.log(b)
})

const policy = function(a,b) {
    if (a.time == b.time) 
        return 100
    else return 0
}
match.policy = policy
match.addToQueue({time:15,username:'hank'},{time:30,username:'fred'},{time:25,username:'jiji'},{time:17,username:'sadako'},{time:30,username:'foobar'},{time:17,username:'gabby'},{time:15,username:'saikano'},{time:29,username:'baron'})
console.log(match.queue)
match.start()