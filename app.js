var http = require("http");
var url = require('url');
var fs = require('fs');
var queryString = require('querystring');
var mime = require('mime');
var path = require('path');
var server = http.createServer();


server.on('request' , function(req , response){

    var urlObj = url.parse( req.url , true);

    var pathname = urlObj.pathname;
    var query = urlObj.query;
    req.pathname = pathname;
    req.query = query;

    if(pathname === '/'){
        // res.end('1');
        fs.readFile('index.html' , function(err , data){
            if(err){
                throw err
            }

            response.writeHead(200,{
                "Content-Type" : 'text/html;charset=utf-8'
            })
            response.end(data);
        })

    } else if(pathname.startsWith('/static')){
        fs.readFile( path.join(__dirname , req.pathname) , function(err , data){
                // console.log(req.pathname);
                if(err){
                    throw err
                }
                response.writeHead(200, {
                    'Content-Type' : mime.lookup(req.pathname)
                })    
                response.end(data);
        })
    }else if(pathname.startsWith('/node_module')){
        fs.readFile( path.join(__dirname , req.pathname) , function(err , data){
                // console.log(req.pathname);
                if(err){
                    throw err
                }
                response.writeHead(200, {
                    'Content-Type' : mime.lookup(req.pathname)
                })    
                response.end(data);
        })
    } else if(pathname === '/search'){
        var cont = queryString.stringify(req.query);
        var type = req.query.type
        var urladress = 'http://web.juhe.cn:8080/constellation/getAll?' + cont + '&key=185be67b3945243d4b3bd73eacde38fe'
        
        http.get( urladress, function(res){
            var info = '';
            res.setEncoding('utf8');
            res.on('data' , function(chunk){
                info+= chunk
            })
            res.on('end' , function(){
                var result = {
                    info : info ,
                    type : type
                }
                result  = JSON.stringify(result);
                response.end(result);
            })
        }).on('error' , function(e){
            console.log('error : ' + e.message)
        })

        
    }
})





server.listen(3000, function(){
    console.log('demo running in 127.0.0.1:3000')
    console.log('welcome to test this small demo!')
})