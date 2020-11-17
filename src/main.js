import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {  // UI to print gifs based on keyword searches
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
      for(let i = 0; i < 50; i++) {
        $('.showResults').append(`<a href='${response.data[i].url}'><img src=${response.data[i].images.original.url} id='gif${response.data[i].title}'></a>`);
      }
    }

  });

  $('#trending').submit(function(event) {  // UI to print trending photos from Giphy
    event.preventDefault();

    let request = new XMLHttpRequest();
    const url = `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) { // if state is totally ready and status is "200"OK
        const response = JSON.parse(this.responseText); // store server response in variable
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      for(let i = 0; i < 50; i++) {
        $('.showResults').append(`<a href='${response.data[i].url}'><img src=${response.data[i].images.original.url} id='gif${response.data[i].title}'></a>`);
      }
    }

  });

  $('#random').submit(function(event) {  // UI to print a random photo from Giphy
    event.preventDefault();

    let request = new XMLHttpRequest();
    const url = `http://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) { // if state is totally ready and status is "200"OK
        const response = JSON.parse(this.responseText); // store server response in variable
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showResults').append(`<a href='${response.data.url}'><img src=${response.data.images.original.url} id='gif${response.data.title}'></a>`);
    }

  });

});