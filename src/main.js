import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GiphyService  from './js/giphy-service.js';

$(document).ready(function() {  // UI to print gifs based on keyword searches
  $('#submit').submit(function(event) {
    event.preventDefault();
    $('.showResults').html('');
    const newGif = $('#keyword').val(); // store user input in variable
    $('#keyword').val(""); // clear text field 
    //clearFields();
    let promise = GiphyService.searchGifs(newGif);
    promise.then(function(response) {
      const body = JSON.parse(response);
      for(let i = 0; i < 50; i++) {
        $('.showResults').append(`<a href='${body.data[i].url}'><img src=${body.data[i].images.original.url} id='gif${body.data[i].title}'></a>`);
      }
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });

  $('#trending').submit(function(event) {  // UI to print trending photos from Giphy
    event.preventDefault();
    $('.showResults').html('');
    const newGif = $('#keyword').val(); // store user input in variable
    $('#keyword').val(""); // clear text field 
    //clearFields();
    let promise = GiphyService.trendingGifs(newGif);
    promise.then(function (response) {
      const body = JSON.parse(response);
      for(let i= 0; i < 50; i++) {
        $('.showResults').append(`<a href='${body.data[i].url}'><img src=${body.data[i].images.original.url} id='gif${body.data[i].title}'></a>`);
      }
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });

  $('#random').submit(function(event) {  // UI to print a random photo from Giphy
    event.preventDefault();
    $('.showResults').html('');
    const newGif = $('#keyword').val(); // store user input in variable
    $('#keyword').val(""); // clear text field 
    //clearFields();
    let promise = GiphyService.randomGif(newGif);
    promise.then(function (response) {
      const body = JSON.parse(response);
      $('.showResults').append(`<a href='${body.data.url}'><img src=${body.data.images.original.url} id='gif${body.data.title}'></a>`);
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});