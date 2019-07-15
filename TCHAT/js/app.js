var http=require('http');
var md5 =require('MD5');

httpServer =http.createServer();

var io= require('socket.io').listen(httpServer);
var users=[];
var messages=[];
var history =10
 io.sockets.on('connection',(socket)=>{
 var me =false;
  var users= {}
     console.log('new client');

     for(let k in users){
         socket.emit('newusr',users[k]);
     }
  for( let k in messages){
      socket.emit('newmsg',messages[k])
  }
//    /* we received a new message */
   socket.on('newmsg',()=>{
       Message.user =me;
       date = new Date();
       message.h = date.getHours();
       message.m = date.getMinute();
      messages.push(message);

       if(message.length>history){
      messages.shift()
    };

       io.socket.emit('newmsg',message)
   })

// /* i am connect  */
     socket.on('login',(user)=>{
       me=user;

       me.id = user.email.replace('@','-').replace('.','-');

       me.avatar='https://gravatar.com/avatar/'+ md5(user.email) + '?s=50';

        socket.emit('logged');
        users[me.id] = me;

       io.sockets.emit('newusr',me);
     });
    /* i am disconnected of tchat */
     socket.on('disconnect',()=>{
         if(!me){
             return false
         }
         delete users[me.id];
         io.sockets('disusr',me)

        })
 });

const port = 1337;
// on(quelque chose) est la même chose que quand tu fais on('click', callback) en JS
// Tu vas appeler la fonction 'callback' lorsque l'évènement 'clik' survient
// Ici, lorsque l'événemnt 'listening' survient, tu affiches qqch (cet événement survient si le serveur arrive à démarrer)
httpServer.on('listening', () => {
  console.log(`listening on ${port}`);
});

httpServer.listen(port);
