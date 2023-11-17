var socket = io.connect('http://192.168.1.101:6677', {'forceNew':true});

//192.168.1.101

socket.on('messages', function (data) {
    console.log(data);
    render(data)
  })


  function render(data) {
    var html = data.map(function (message, index) {
        return (`
            <div class="message">
            <strong>${message.nickname}</strong>
            <p>${message.text}</p>
            </div>
        `)
      }).join(' ');

      var div_mesgs = document.getElementById('messages');

      div_mesgs.innerHTML = html
      div_mesgs.scrollTop = div_mesgs.scrollHeight;
      
    }

    function addMessage(e) {
            console.log("hola");
       /*  e.preventDefault() */
        var message = {
            nickname: document.getElementById('nickname').value,
            text: document.getElementById('text').value
        };
        console.log(message);
        document.getElementById('nickname').style.display = 'none';
        socket.emit('add-message', message);
        return false;
      }
