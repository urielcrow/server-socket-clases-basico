const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Socket = require('./socket');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = socketio(this.server,{});
    }

    middlewares(){
        this.app.use( express.static( path.resolve( __dirname,'../public' ) ) );
        this.app.use( 
            (req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
                res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
                res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
                next();
            }
         );
    }

    socketsInit(){
        new Socket(this.io);
    }

    main(){
        this.middlewares();
        this.socketsInit();
        this.server.listen(this.port,()=>{
            console.log(`Port connect: ${this.port}`);
        });
    }

}  
    
module.exports = Server;