(function(w){

    /*
     *ctx
     * color
     *
     * */
    function Timer(config){

        this.ctx = config.ctx;
        this.color = config.color ? config.color : 'lightgreen';


        //设置默认文字绘制到画布的右上角
        this.x = this.ctx.canvas.width;
        this.y = 0;

        //文字和时间
        this.text = '';
        this.time = 0;
    }

    Timer.prototype = {
        constructor : Timer,
        draw : function(){
            this.ctx.save();
            this.ctx.font = '900 20px 微软雅黑';
            this.ctx.textAlign = 'right';
            this.ctx.textBaseline='top';
            this.ctx.fillStyle = this.color;
            this.ctx.fillText(this.text , this.x ,this.y);
            this.ctx.restore();
        },
        update : function(delaySecond){
            this.time += delaySecond;
            //3800
            var hour = Math.floor(this.time / 3600);
            var minute = Math.floor(this.time % 3600 /60);
            var seconds = Math.floor(this.time%60);

            this.text = '你才坚持了' + hour+'小时' +minute +'分钟' + seconds+ '秒!!! 也不行啊~~' ;


        }
    }

    w.Timer = Timer;
}(window))