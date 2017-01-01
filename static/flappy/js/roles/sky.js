(function(w){

    function Sky(config){
        Sky.len++;
        //设置初始参数属性
        this.ctx  = config.ctx;
        this.img = config.img;

        this.width = config.img.width;
        this.height = config.img.height;

        this.x = this.width * (Sky.len -1 ) ;
        this.y = 0;

        // 设置初始速度
        this.speedSecond = 100;
    }

    Sky.len =0;
    Sky.prototype = {
        constructor : Sky,

        draw : function(){
            this.ctx.drawImage(this.img , this.x , this.y);
        },
        update : function(delaySecond){
            this.x -= this.speedSecond * delaySecond;

            if(this.x < -this.width){
                this.x += this.width * Sky.len;
            }
        }
    }
    //将函数暴露
    w.Sky = Sky;
}(window));