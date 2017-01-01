(function(w){
    function loadImage(src , callback){

        var temp, resultObj = {};
        var srcCount = 0 ;
        var  totalCount = 0;
        for(var key in src){

            srcCount++;
            temp = new Image();
            temp.src = src[key];

            resultObj[key] = temp;


            temp.onload = function(){
                if(++totalCount >= srcCount){
                    callback(resultObj);
                }
            }
        }


    }

    w.loadImage = loadImage;
}(window));

