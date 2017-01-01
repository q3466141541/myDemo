(function(w){
    function Land(config){
        Land.len++;
        this.ctx = config.ctx;
        this.img = config.img;

        this.width = this.img.width;
        this.height = this.img.height;

        //问题点
        this.x = this.width * (Land.len - 1 );
        //console.log(this.width +'==='+ this.x);
        this.y = this.ctx.canvas.height - this.height;

        this.speedSecond = 100;
    }
    Land.len = 0;

    Land.prototype = {
        constructor : Land,
        draw : function (){
            this.ctx.drawImage(this.img , this.x , this.y);
            //console.log(this.x + '------');
        },
        update : function(delayTime){
            this.x -= this.speedSecond * delayTime;
            //console.log(this.x+ '======--------');
            if(this.x < -this.width){
                //问题点
                this.x += this.width *Land.len ;
                //console.log(this.x+ '++++++');
            }
        }

    }


    w.Land = Land;
}(window))