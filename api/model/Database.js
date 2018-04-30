var PORT = 8765;
var HOST = '0.0.0.0'

// registro do database
const dgram = require('dgram')
const registro = new Buffer('database set')
const db = dgram.createSocket('udp4')
db.send(registro, 0, registro.length, 1234, HOST, (err) => {
  console.log('dataserver registrado!')
 db.close()
});

// dataserver
net = require('net')

var database = [
  { id : '1', status : 'pronto'},
  { id : '2', status : 'em andamento'},
  { id : '3', status : 'não pronto'},
  { id : '4', status : 'pronto'},
  { id : '5', status : 'em andamento'},
  { id : '6', status : 'não pronto'},
]

var server = net.createServer(function(serverclient){
  serverclient.on('data', function(data){
    console.log(data)
    database.map(function(item, index){
      if(item.id === data){
        console.log('dado encontrado... a enviar')
        serverclient.send(item.status)
        serverclient.destroy()
      }
    })

    serverclient.send('id inválido')
    serverclient.destroy()

  })
})

server.listen(PORT, HOST);