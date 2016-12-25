

   $(function(){

    $('#btn').on('click' , function(e){

        e.preventDefault();
        
        var reqInfo = $('form').serialize();
        if(reqInfo == ''){
            return false;
        } else {
            // console.log(reqInfo)
        $.ajax({
            url : '/search',
            type : 'GET',
            data : reqInfo,
            dataType : 'json',
            success : function(data){
              //接卸服务器返回的数据 拿到type数据
              var infoType =  data.type;
              var infoData = JSON.parse(data.info);
              var strObj = '';
              //根据type 来返回不同的模板
              if(infoType == 'today' || infoType == 'tomorrow'){
                  console.log(infoData)
                   strObj = template('tplDay' , infoData)
              } else if(infoType == 'week' || infoType == 'nextweek'){
                console.log(infoData)
                   strObj = template('tplWeek' , infoData)
              }else if( infoType == 'month'){
                console.log(infoData)
                  strObj = template('tplMonth' , infoData)
              } else if(infoType == 'year'){
                console.log(infoData)
                  strObj = template('tplYear' , infoData)
              }

              //渲染内容
              $('#myTbody').html(strObj);

            }
        })
        
     }
    })
})
