// Initial array of stocks
let stocks = ['FB', 'AAPL', 'TSLA', 'GOOG'];

const queryALLSymbols = 'https://api.iextrading.com/1.0/ref-data/symbols';

let validationList = [];

$.ajax({

  url: queryALLSymbols,
  method: 'GET'

}).then(function (response) {


  for (let i = 0; i < response.length; i++) {

    let validList = response[i].symbol;
    validationList.push(validList);

    //let newStock
    //.toUpperCase
    //if(!validationList.includes(newStock))


  }

  console.log(validationList);

  // Create a div to hold the stock

  // Store the company name
});


// displaystockInfo function re-renders the HTML to display the appropriate content
const displaystockInfo = function () {

  const stock = $(this).attr('data-name');
  const queryURL1 = `https://api.iextrading.com/1.0/stock/${stock}/company`;
  const queryURL2 = `https://api.iextrading.com/1.0/stock/${stock}/logo`;
  const queryURL3 = `https://api.iextrading.com/1.0/stock/${stock}/news/last`;
  const queryURL4 = `https://api.iextrading.com/1.0/stock/${stock}/news/last`;


  // Creates AJAX call for the specific stock button being clicked


  $.ajax({
    url: queryURL1,
    method: 'GET'
  }).then(function (response) {

    $("#stock-output").append(`<tr id="stock-row"><td>${response.companyName}</td><td>${response.symbol}</td><td>${response}</td></tr>`);
    console.log(response);

  })

  $.ajax({
    url: queryURL4,
    method: 'GET'
  }).then(function (response) {

    $("#stock-row").append(``);
    console.log(response);

  })

  $.ajax({
    url: queryURL3,
    method: 'GET'
  }).then(function (response) {


    for (let i = 0; i < response.length; i++) {
      const Q3 = $("#newsDiv").append(`<h2><a href="${response[i].url}">${response[i].headline}</a></h2><br>
      <p>${response[i].summary}</p><br><a href=${response.url}>`);
    }
    console.log(response);

  })



  // Create an element to display the company name

  // Append the name to our stockDiv

  // Store the stock symbol

  // Create an element to display the stock symbol

  // Append the symbol to our stockDiv

  // Store the price
  $("#stock-output").empty();


  // Create an element to display the price

  // Append the price to our stockDiv

  // Store the first news summary

  // Create an element to display the news summary

  // Append the summary to our stockDiv

  // Finally add the stockDiv to the DOM
  // Until this point nothing is actually displayed on our page


}

// Function for displaying stock data
const render = function () {

  // Deletes the stocks prior to adding new stocks
  // (this is necessary otherwise you will have repeat buttons)
  $('#buttons-view').empty();
  // Loops through the array of stocks
  for (let i = 0; i < stocks.length; i++) {

    // Then dynamicaly generates buttons for each stock in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    let newButton = $('<button>');
    // Adds a class of stock to our button
    newButton.addClass('stock');
    // Added a data-attribute
    newButton.attr('data-name', stocks[i]);
    // Provided the initial button text
    newButton.text(stocks[i]);
    // Added the button to the buttons-view div
    $('#buttons-view').append(newButton);
  }
}

// This function handles events where one button is clicked
const addButton = function (event) {

  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  const stock = $('#stock-input').val().trim().toUpperCase();

  if (!validationList.includes(stock)) {
    alert("Please input a valid stock symbol.");
  } else {
    stocks.push(stock);
    $('#stock-input').val('');
    
    render();
  }
  // The stock from the textbox is then added to our array
  

  // Deletes the contents of the input
  

  // calling render which handles the processing of our stock array

}

// Even listener for #add-stock button
$('#add-stock').on('click', addButton);

// Adding click event listeners to all elements with a class of "stock"
$('#buttons-view').on('click', '.stock', displaystockInfo);

// Calling the render function to display the intial buttons
render();