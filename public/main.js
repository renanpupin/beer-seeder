$(function() {
    let $messages = $('#messages');

    let socket = io();
    // socket.emit('message', "I joined");

    socket.on('message', (message) => {
        $messages.append('<li>Message: '+message+'</li>');
    });

    socket.on('status', (message) => {
        $messages.append('<li>Status: '+message+'</li>');
    });

});