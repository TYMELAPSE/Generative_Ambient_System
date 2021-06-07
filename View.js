class View{
    constructor(canvas){
        this.canvas = canvas;
        this.activeTriggers = [];
        this.frameRate = 60;
        this.maxRadius = 75;
        this.loopRate = 5000; //milliseconds
        this.soundGenerator = new SoundGenerator();
        this.alphaFadeValue = 0.0115;
    }

    handleClick(event){
        let x = event.offsetX;
        let y = event.offsetY;
        let pos;
        
        pos = this.activeTriggers.push(this.soundGenerator.generateSound({
                x: x,
                y: y,
                alpha: 1,
                radius: 0,
                type: 'circle',
        }));

        let placedTrigger = this.activeTriggers[pos-1];

        let sound = new Pizzicato.Sound({
            source: 'file',
            options: {
                path: placedTrigger.sound.path,
                loop: false,
                volume:  Math.min(Math.max(Math.random(), 0.2), 1)
            }
        }, () => {
           placedTrigger.sound.effects.forEach(effect => {
                sound.addEffect(effect);
            });

            //File is loaded
            sound.play();

            setInterval( () => {
               placedTrigger.radius = 0;
               placedTrigger.alpha = 1;
                sound.play();
            }, sound.sourceNode.buffer.duration * (Math.min(Math.max(Math.random(), 0.2), 1) * (this.loopRate + 2000)));
            
        });
    }

    updateDisplay(){
        //This method is called every frame
        const context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.fillStyle = "black";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for(let i = 0; i < this.activeTriggers.length; i++){
            let currentTrigger = this.activeTriggers[i];
            if(currentTrigger.radius <= view.maxRadius){
                currentTrigger.radius += 1;
                currentTrigger.alpha -= this.alphaFadeValue;
                
                view.drawCircle(context, currentTrigger.x, currentTrigger.y, currentTrigger.radius, currentTrigger.alpha);
            }
        }
    }

    drawCircle(context, x, y, radius, alpha){
        context.beginPath();
        context.arc(x, y, radius, 0, 2*Math.PI);
        context.fillStyle = this.randomizeColor(x, y, alpha);
        context.fill();
    }

    randomizeColor(x, y, alpha){
        return "rgba(" + x%256 + ", " + y%256 + ", " + (x * y % 256) + ", " + alpha + ")";
    }

    
}