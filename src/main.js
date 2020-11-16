import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#submit').submit(function(event) {
    event.preventDefault();
    const newGif = $('#keyword').val(); // store user input in variable
    $('#keyword').val(""); // clear text field 
  
    let request = new XMLHttpRequest();
    const url = `http://api.giphy.com/v1/gifs/search?q=${newGif}&api_key=${process.env.API_KEY}`; // Giphy search endpoint
  
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) { // if state is totally ready and status is "200"OK
        const response = JSON.parse(this.responseText); // store server response in variable
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showResults').append(`<img src=${response.data[0].images.original.url} id='gif0'>`);
    }

  });
});