import EventEmitter from 'node:events'

interface Options<T> {
    checkInterval?: number,
    threshold?: number,
    maxIterations?: number,
    policy?: (a: T, b: T) => number
}

export class Matchmaker<T> extends EventEmitter {
    checkInterval: number
    threshold: number
    maxIterations: number
    private _isRunning = false
    private _queue: T[] = []
    private timerId?: NodeJS.Timeout
    policy?: (a: T, b: T) => number
    constructor(opts?: Options<T>) {
        super()
        const options = {
            checkInterval: 5000,
            threshold: 100,
            maxIterations: 5,
            ...opts
        }
        this.checkInterval = options.checkInterval
        this.threshold = options.threshold
        this.maxIterations = options.maxIterations
        this.policy = options.policy
    }

    get queue() {
        return this._queue
    }

    get isRunning() {
        return this._isRunning
    }

    start() {
        if (!this.policy) throw new Error('A matchmaking policy must be set before starting matchmaking.')
        this.timerId = setInterval(() => {
            if (!this.policy) {
                clearInterval(this.timerId)
                throw new Error('A matchmaking policy must be set before starting matchmaking.')
            }
            var iter = 0
            while (this.queue.length >= 2 && iter < this.maxIterations) {
                const len = this.queue.length
                var matchobj: number[] | undefined = undefined
                for (var i = 0; i < len; i++) {
                    for (var j = i + 1; j < len; j++) {
                        if (this.policy(this.queue[i], this.queue[j]) >= this.threshold) {
                            matchobj = [i, j]
                            break
                        }
                    }
                    if (matchobj)
                        break
                }
                if (matchobj) {
                    var a = this.queue.splice(matchobj[0], 1).pop()
                    var b = this.queue.splice(matchobj[1] - 1, 1).pop()
                    this.emit('match', a, b)
                }
                iter++
            }
        }, this.checkInterval)
        this._isRunning = true
    }

    stop() {
        if (this.timerId) {
            this._isRunning = false
            clearInterval(this.timerId)
            this.timerId = undefined
        }
    }

    push(...objs: T[]) {
        objs.forEach(v => this._queue.push(v))
    }

    addToQueue(...objs: T[]) {
        objs.forEach(v => this._queue.push(v))
    }

    on(eventName: 'match', listener: (a: T, b: T) => void): this
    on(eventName: 'start', listener: () => void): this
    on(eventName: 'match' | 'start', listener: (...args: any[]) => void): this {
        super.on(eventName, listener)
        return this
    }

    once(eventName: 'match', listener: (a: T, b: T) => void): this
    once(eventName: 'start', listener: () => void): this
    once(eventName: 'match' | 'start', listener: (...args: any[]) => void): this {
        super.once(eventName, listener)
        return this
    }

    addListener(eventName: 'match', listener: (a: T, b: T) => void): this
    addListener(eventName: 'start', listener: () => void): this
    addListener(eventName: 'match' | 'start', listener: (...args: any[]) => void): this {
        super.on(eventName, listener)
        return this
    }

    removeListener(eventName: 'match', listener: (a: T, b: T) => void): this
    removeListener(eventName: 'start', listener: () => void): this
    removeListener(eventName: 'match' | 'start', listener: (...args: any[]) => void): this {
        super.removeListener(eventName, listener)
        return this
    }

    off(eventName: 'match', listener: (a: T, b: T) => void): this
    off(eventName: 'start', listener: () => void): this
    off(eventName: 'match' | 'start', listener: (...args: any[]) => void): this {
        super.removeListener(eventName, listener)
        return this
    }

    removeAllListeners(eventName: 'match' | 'start'): this {
        super.removeAllListeners(eventName)
        return this
    }

    prependListener(eventName: 'match', listener: (a: T, b: T) => void): this
    prependListener(eventName: 'start', listener: () => void): this
    prependListener(eventName: 'match' | 'start', listener: (...args: any[]) => void): this {
        super.prependListener(eventName, listener)
        return this
    }

    prependOnceListener(eventName: 'match', listener: (a: T, b: T) => void): this
    prependOnceListener(eventName: 'start', listener: () => void): this
    prependOnceListener(eventName: 'match' | 'start', listener: (...args: any[]) => void): this {
        super.prependOnceListener(eventName, listener)
        return this
    }
}

export function newMatchmaker<T>(opts: Options<T>) {
    return new Matchmaker<T>(opts)
}