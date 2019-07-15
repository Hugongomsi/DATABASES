(($)=>{
    var socket =io.connect('http://localhost:1337');
    var msgtpl=$('#msgtpl').html();
    $('#msgtpl').remove();


    $('#loginform').submit((event)=>{
         event.preventDefault();
         socket.emit('login',{
             username :$('#username').val(),
             email     :$('#email').val()
         })
    });
    socket.on('logged',()=>{
        $('#login').fadeout();
    });
/* send the message */
$('#form').submit((event)=>{
    event.preventDefault();
    socket.emit('newmsg',{message:$('#message').val() })
    $('#message').val('');
    $('#message').focus();
})

socket.on('newmsg',(message)=>{
    Mustache.render(msgtpl, message);
    $('#message').append('<div class="message">'+Mustache.render(msgtpl,message)+ '</div>')

})
    //manager of connect for user
    socket.on('newusr',(user)=>{
        $('#users').append('<img src ="'+user.avatar+'"id="' +user.id +'">');
        alert('new user');
    })
    socket.on('disusr',(user)=>{
        $('#' + user.id).remove();
    })
})(jQuery);
