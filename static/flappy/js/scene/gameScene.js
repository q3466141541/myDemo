(function (w){

    function GameScene(config){
        this.ctx = config.ctx;
        this.img  = config.img;

        this.roles = [];

        this.createRoles();

        this.birdDieCallBackList = [];
    }

    util.extend(GameScene.prototype , {
        createRoles : function(){
            for(var i = 0; i<2 ; i++){
                this.roles.push( new Sky({ctx : ctx , img : this.img.sky}) );
            }

            for(var i = 0 ;i<8 ;i++){
                this.roles.push( new Pipe({ctx : ctx , imgtop : this.img.pipeDown, imgbottom : this.img.pipeUp, TBdistance : 150 , LRdistance : 200 , maxHeight : cvs.height - this.img.land.height - 50 - 150 , minHeight:50}) )
            }


            for(var i = 0 ; i<4 ; i++){
                this.roles.push( new Land({ctx : ctx , img : this.img.land}) );
            }


            this.roles.push(new Timer({ctx : ctx,color : 'red' }) );

             this.roles.push( new Bird({ctx : ctx , img : this.img.bird, widthFrame : 3 , heightFrame : 1}) ) ;
            console.log(this.roles);
        },
        gameRun : function(delayTime){
            this.roles.forEach(function(role){
                role.draw();
                role.update(delayTime);
            })

            if( this.isBirdDie()){
                this.runBirdDieEvent();
            }
        },
        isBirdDie : function(){
            var bird = this.roles[this.roles.length -1 ];
            var birdCoreX = bird.x  + bird.width/2;
            var birdCoreY = bird.y  + bird.height/2;

            if(birdCoreY < 0 || birdCoreY > (cvs.height - this.img.land.height ) || ctx.isPointInPath(birdCoreX , birdCoreY ) ){
                return true;
            }
                return false;
        },
        addBirdDieEvent : function(fn){
            this.birdDieCallBackList.push(fn);
        },
        runBirdDieEvent : function(){
            this.birdDieCallBackList.forEach(function(fn){
                  fn();
            })
        }



    })

    w.GameScene = GameScene;
}(window))