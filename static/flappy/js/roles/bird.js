(function(w){
    /*
    * ctx
    * img
    * widthFrame
    *
    * */
    function Bird(config){

        this.ctx = config.ctx;
        this.img = config.img;

        this.widthFrame = config.widthFrame;
        this.heightFrame = config.heightFrame;

        this.width = this.img.width / this.widthFrame;
        this.height = this.img.height  / this.heightFrame;

        this.x = this.width;
        this.y = this.height;

        this.speedSecond = 100;
        this.a = 300;
        this.index = 0;

        this.unitAngle = 0.5;

        this.rotateAngle = 0;

        this.maxRotateAngle = 40;
        this.minRotateAngle = -30;

        this.bind();
    }

    Bird.prototype = {
        constructor : Bird,
        draw : function(){
            this.ctx.save();
            var birdCoreX = this.x + this.width/2;
            var birdCoreY = this.y + this.height/2;

            this.ctx.translate(birdCoreX,birdCoreY);

            //旋转
            this.rotateAngle = this.unitAngle * this.speedSecond;
            this.rotateAngle = this.rotateAngle > this.maxRotateAngle? this.maxRotateAngle: this.rotateAngle;
            this.rotateAngle = this.rotateAngle < this.minRotateAngle? this.minRotateAngle: this.rotateAngle;

            this.ctx.rotate(util.angleToRadian(this.rotateAngle));

            this.ctx.drawImage(this.img ,
                this.width * this.index , 0  , this.width ,this.height,
                -this.width /2 ,-this.height /2 ,this.width ,this.height
            );

            this.ctx.restore();
        },
        update : function(delaySecond){
            this.index =  ++this.index % 3;

            //this.y += this.speedSecond * delaySecond;

            this.y += this.speedSecond * delaySecond + this.a * delaySecond * delaySecond / 2;

            this.speedSecond = this.speedSecond + this.a * delaySecond;
        },
        bind : function(){
            var self = this;

            this.ctx.canvas.addEventListener('click',function(){
                self.speedSecond = -100;
            })
        }
    }

    w.Bird = Bird;
}(window))