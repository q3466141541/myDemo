/*
* 实现思路：
* 1、要绘制一个填出遮盖层( 一个半透膜的矩形 )
* 2、再在画布的中间绘制提示文字：GAMEOVER！！！
* */
( function( w ) {

    function OverScene(config) {
    	this.ctx = config.ctx;
    	this.width = this.ctx.canvas.width;
    	this.height = this.ctx.canvas.height;


        this.btnX = 0 ;
        this.btnY = 0 ;
        this.btnWidth = 300;
        this.btnHeight = 65;

    }

    util.extend( OverScene.prototype, {

        // 绘制游戏结束场景
        run: function() {
            this.ctx.save();
            //绘制结束文字
        	this.ctx.fillStyle = 'rgba(0,0,0,.7)';
        	this.ctx.fillRect(0,0,this.width ,this.height);
        	this.ctx.font = '900 50px 微软雅黑';
        	this.ctx.textAlign = 'center';
        	this.ctx.textBaseline = 'bottom';
        	this.ctx.fillStyle = 'red';
        	this.ctx.fillText('GAME OVER' , this.width/2 , this.height/2 - 30);


            //绘制重新开始按钮
            this.ctx.strokeStyle = 'yellow';
            this.ctx.fillStyle = 'red';
            this.ctx.width = 10;
            this.ctx.baseline = 'bottom';
            this.btnX = this.width/2 - this.btnWidth/2;
            this.btnY = this.height/2 - this.btnHeight/ 2;
            this.ctx.strokeRect(this.btnX , this.btnY +20 ,this.btnWidth , this.btnHeight);
            this.ctx.fillText('RESTART' , this.btnX + this.btnWidth/2, this.btnY + this.btnHeight/2 + 54);


            this.ctx.restore();

        },
		bind : function(){
            var  self = this;
            this.ctx.canvas.addEventListener('click' , function(e){

                var mouseX = e.clientX - this.offsetLeft;
                var mouseY = e.clientY - this.offsetTop;

                self.ctx.beginPath();
                self.ctx.rect(self.btnX , self.btnY +20 ,self.btnWidth , self.btnHeight );

                if(self.ctx.isPointInPath(mouseX ,  mouseY)){
                    location.reload();
                }

            })

        }

    } );

    w.OverScene = OverScene;

}( window ));
