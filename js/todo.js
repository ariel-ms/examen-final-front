var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

var todos = document.querySelectorAll("input[type=checkbox]");

function updateTodo(id, completed) {
  // revisen si completed es booleano o string
  json_to_send = {
    "completed" : completed
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      // url: 'http://localhost:3000/todos/' + id,
      url: 'https://exfinal-web-ariel.herokuapp.com/todos' + id,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("UPDATE!!")
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}


function loadTodos() {
  $.ajax({
    // url: 'http://localhost:3000/todos',
    url: 'https://exfinal-web-ariel.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      // console.log(data)
      let new_html = "";
      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        // console.log(data[i].description)
        new_html += `<li><input type="checkbox" name="todo" value="2"><span><del>${data[i].description}</del></span></li>`;
        // algo asi:
        // addTodo(data[i]._id, data[i].description, data[i].completed)
      }
      $("#unfinished-list").append(new_html);
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    console.log(input.value)
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      // url: 'http://localhost:3000/todos',
      url: 'https://exfinal-web-ariel.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})

function addTodo(id, todoText, completed) {
  
}