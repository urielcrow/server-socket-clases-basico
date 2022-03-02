
class Sockets{

    constructor(io) {
        this.io = io;
        this.socketsEvents();
    }

    socketsEvents(){
        this.io.on('connection', (socket) => { 

            // socket.emit('welcome-client',{
            //     msg:'Bienvenido estás conectado',
            //     fecha: new Date()
            // });

            socket.on('list-client',(resp)=>{
                console.log(resp)
                this.io.emit('from-server','te escucho cliente por emit');
            })

        });
    }

}

module.exports = Sockets;