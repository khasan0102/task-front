const { PassThrough } = require("stream");
const Throttle = require("throttle");
const Neoblassed = require("neo-blessed");
const EventEmitter = require("events");
const fs = require("fs")
const { ffprobeSync } = require('@dropb/ffprobe');
const path = require("path");
const stream = new EventEmitter();


class Radio {
    allSinks = {}
    correct_indexs = {}
    isTrues = {}
    songs = {}
    stream = stream

    constructor(folders) {
        this.stream.on('stop', (folder) => {
            this.isTrues[folder] = true
        })

        this.stream.on('start', (folder) => {
            this.isTrues[folder] = false
            this.correct_indexs[folder] = 1
            this._playLoop(folder)
        })


        for(let folder of folders) {
            this.allSinks[folder] = new Map()
            this.correct_indexs[folder] = 1

            this.songs[folder] = [{
                index: 1,
                song: path.join(process.cwd(), 'public', 'music', folder, 'miyagi.mp3')
            }]

            this.stream.emit('start', folder)
        }
    }

    makeResponseSink (folder)  {
        const id = Math.random().toString(36).slice(2);
        const responseSink = PassThrough();

        if(!this.allSinks[folder]) {
            this.allSinks[folder] = new Map();
            this.allSinks[folder].set(id, responseSink)
        }else {
            this.allSinks[folder].set(id, responseSink)
        }

        return { id, responseSink }
    }

    broadcastToEverySink = (chunk, folder) => {
        for(const [, sink] of this.allSinks[folder]) {
            sink.write(chunk)
        }
    }

    _getBitRate(song) {
        try {
            const bitRate = ffprobeSync(path.join(process.cwd(), song)).format.bit_rate
            return parseInt(bitRate)
        } catch (err) {
            return 128000
        }
    }

    _playLoop(folder) {
        if(this.isTrues[folder]) return;
        const song = this.songs[folder].find(el => el.index === this.correct_indexs[folder]).song || this.songs[folder][0].song

        const bitRate = this._getBitRate(song)
        const songReadable = fs.createReadStream(song)
        const throttleTransformable = new Throttle(bitRate / 8);

        throttleTransformable.on('data', (chunk) => {
            if(!this.isTrues[folder]) {
                this.broadcastToEverySink(chunk, folder)
            }
        })

        throttleTransformable.on('end', () => {
            this._playLoop(folder)
        })

        songReadable.pipe(throttleTransformable);
    }

    _stopLoop(folder) {
        this.stream.emit('stop', folder)
    }
}

module.exports = { Radio }