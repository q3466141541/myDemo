

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
              if( (infoType == 'today' || infoType == 'tomorrow') && ( !infoData.error_code)){
                  // console.log(infoData)
                   strObj = template('tplDay' , infoData)
              } else if( (infoType == 'week' || infoType == 'nextweek')  && ( !infoData.error_code) ){
                console.log(infoData)
                   strObj = template('tplWeek' , infoData)
              }else if( (infoType == 'month')  && ( !infoData.error_code)){
                // console.log(infoData)
                  strObj = template('tplMonth' , infoData)
              } else if((infoType == 'year')  && ( !infoData.error_code)){
                // console.log(infoData)
                  strObj = template('tplYear' , infoData)
              } else if(  infoData.error_code ){
                  strObj = '信息错误,请稍后尝试!'
              }

              //渲染内容
              $('#myTbody').html(strObj);

            }
        })
        
     }
    })
})
