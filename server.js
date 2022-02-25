const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors:{
        origin:'*'
    }
})

const PORT = process.env.PORT || 3000;

io.on('connection', socket =>{
    console.log('conneccao bem sucedida')
    io.emit('logou', 'jeronimo')


    socket.on('logou', payload=>{
        console.log(payload)
        io.emit('logou', payload)
    })



    socket.on('message', payload => {
        console.log('mensagem recebida:', payload)
        io.emit('message', payload)
    })
})
io.on('disconnect', socket => {
    console.log('Disconectou')
})

app.get("/", function(req, res){
    res.send("ola mundo");
})

server.listen(PORT, ()=>{
    console.log("Escutando na porta: "+PORT)
})
