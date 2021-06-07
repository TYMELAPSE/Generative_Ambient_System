class SoundGenerator{

    constructor(){
        this.minPanning = 0.20;
        this.maxPanning = 0.80;
        this.cutoffToYValue = 35;
        this.minFilterCutoff = 400;
        this.minDelayMix = 0.05;
        this.maxDelayMix = 0.75;
        this.peacefulFileNames = [ //TODO store sound palettes in separate JSON-file
            "Peaceful Tone 1-LABS (64 Bit)",
            "Peaceful Tone 2-LABS (64 Bit)",
            "Peaceful Tone 3-LABS (64 Bit)",
            "Peaceful Tone 4-LABS (64 Bit)",
            "Peaceful Tone 5-LABS (64 Bit)",
            "Peaceful Tone 6-LABS (64 Bit)",
            "Peaceful Tone 7-LABS (64 Bit)",
            "Peaceful Tone 8-LABS (64 Bit)",
            "Peaceful Tone 9-LABS (64 Bit)",
            "Peaceful Tone 10-LABS (64 Bit)",
            "Peaceful Tone 11-LABS (64 Bit)",
            "Peaceful Tone 12-LABS (64 Bit)",
            "Peaceful Tone 13-LABS (64 Bit)",
            "Peaceful Tone 14-LABS (64 Bit)",
            "Peaceful Tone 15-LABS (64 Bit)",
            "Peaceful Tone 16-LABS (64 Bit)",
            "Peaceful Tone 17-LABS (64 Bit)",
            "Peaceful Tone 18-LABS (64 Bit)",
            "Peaceful Tone 19-LABS (64 Bit)",
            "Peaceful Tone 20-LABS (64 Bit)"
        ]
    }

    setPanning(x){
        let panPosition = Math.min(Math.max(x / 1000, this.minPanning), this.maxPanning);

        let panning = new Pizzicato.Effects.StereoPanner({
            pan: panPosition
        })

        return panning;
    }

    setFilter(y){
        let filterCutoff = (y * this.cutoffToYValue) + 400;

        let lowPassFilter = new Pizzicato.Effects.LowPassFilter({
            frequency: filterCutoff, 
            peak: 1
        });

        return lowPassFilter;
    }

    setDelay(){
        let pingPongDelay = new Pizzicato.Effects.PingPongDelay({
            feedback: 0.2,
            time: 0.2,
            mix: Math.min(Math.max(Math.random(), this.minDelayMix), this.maxDelayMix)
        });

        return pingPongDelay;
    }

    generateSound(trigger){ 
        let soundToPlay = this.peacefulFileNames[Math.floor(Math.random() * this.peacefulFileNames.length)];
        trigger.sound = {
            path: "audio/peaceful/" + soundToPlay + ".mp3"
        }

        trigger.sound.effects = [];
        trigger.sound.effects.push(this.setPanning(trigger.x));
        trigger.sound.effects.push(this.setFilter(trigger.y));
        trigger.sound.effects.push(this.setDelay());

        return trigger;
    }
}