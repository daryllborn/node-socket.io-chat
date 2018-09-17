// Make connection
var socket = io.connect();

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');
      userList = document.getElementById('user-list');
      onlinelist = document.getElementById('list');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', {
        message: message.value,
        handle: handle.value
    });
});


// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data.handle + ' is typing a message: ' + data.message + ' </em></p>';
});

socket.on('online', function(users){
  var list = document.createElement('ul');

  for (var i = 0; i < users.length; i++) {
    // Create the list item:
    var item = document.createElement('li');
    // Set its contents:
    item.appendChild(document.createTextNode(users[i]));
    // Add it to the list:
    list.appendChild(item);
  }
  onlinelist.innerHTML = "";
  onlinelist.appendChild(list);
});
