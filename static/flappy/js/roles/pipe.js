(function(w){

    /*
     * ctx
     * img 口向上
     * img 口向下
     *
     * TBdistance
     * LRdistance
     *
     * 管道最小高度和最大高度
     * maxHeight
     * minHeight
     * */
    function Pipe(config){

        Pipe.len++;

        this.ctx = config.ctx;
        this.imgtop = config.imgtop;
        this.imgbottom =config.imgbottom;

        this.TBdistance =config.TBdistance || 150;
        this.LRdistance =config.LRdistance;

        this.maxHeight = config.maxHeight;
        this.minHeight = config.minHeight;

        this.width = config.imgtop.width;
        this.height = config.imgtop.height;

        this.x = 350 + (this.width + this.LRdistance) * (Pipe.len -1);
        this.y = 0;

        this.speedSecond =100;

        this.a = 10;

        this.computePipeY();
    }

    Pipe.len = 0;

    Pipe.prototype = {
        constructor : Pipe,

        computePipeY : function(){
            //随机生成上管道的高度
            var randomHeight = util.random(this.minHeight , this.maxHeight);
            this.upY = randomHeight - this.height;
            this.downY = randomHeight + this.TBdistance;
        },
        draw : function(){
            this.ctx.drawImage(this.imgtop , this.x , this.upY );
            this.ctx.drawImage(this.imgbottom , this.x  ,this.downY );
            this.drawPath();

        },
        drawPath : function(){
            this.ctx.rect(this.x , this.upY , this.width ,this.height);
            this.ctx.rect(this.x , this.downY , this.width ,this.height);
        },
        update : function(delaySecond){
            this.x -= delaySecond * this.speedSecond + this.a *delaySecond *delaySecond /2;
            this.speedSecond += this.a * delaySecond;

            if(this.x < -this.width){
                this.x += (this.width + this.LRdistance) * Pipe.len;
                this.computePipeY();
            }
        }

    }


    w.Pipe = Pipe;
}(window))