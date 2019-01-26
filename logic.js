$(document).ready(function(){
var topics = ["Ferrari", "Lamborghini", "Camaro", "Mustang", "Porsche"];

function writeButtons() {
    for (var i=0; i<topics.length; i++) {
        var $but = $("<button class='query-button'>");
        $but.val(topics[i]);
        $but.text(topics[i]);
        $("#button-display").append($but);
    }
}
writeButtons();

function addButton() {
    $("#button-display").empty();
    var newBut=$("#search").val();
    $("#search").val("");
    topics.push(newBut);
    writeButtons();
}
$("#submit").on("click", function(event) {
    event.preventDefault();
    addButton();
})

function callAPI() {
    var search=$(this).val();
    var queryURL= "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=dc6zaTOxFJmzC&limit=10"
    $.ajax({url: queryURL, method: "GET"}).then(function(response){
    
    console.log(response);
        var results = response.data;
        for (var i=0; i<10; i++) {
            var $div = $("<div class='col-md-4'>")
            var $gif = $("<img class='giphy'>");
            var $rating = $("<p class='rate'>");
            $rating.text("Rating: " + results[i].rating.toUpperCase());
            $gif.attr("src", results[i].images.fixed_height_still.url);
            $gif.attr("data-still",  results[i].images.fixed_height_still.url);
            $gif.attr("data-animate", results[i].images.fixed_height.url);
            $gif.attr("data-play", "pause");
            $div.append($gif);
            $div.append($rating);
            $(".row").prepend($div);
        }

    });
}

function playPause() {
    var rightNow = $(this).attr("data-play");
    console.log(rightNow);
    if (rightNow==="pause") {
        var store = $(this).attr("data-animate");
        $(this).attr("src", store);
        $(this).attr("data-play", "play");

    }
    if (rightNow==="play") {
        var store = $(this).attr("data-still");
        $(this).attr("src", store);
        $(this).attr("data-play", "pause");
    }
}
// $(".query-button").on("click", callAPI);      this doesnt work because it only runs once. Since buttons are
// being dynamically added to the page, JS doesnt recognize the new buttons as an on click event
$(document).on("click", ".query-button", callAPI); 
$(document).on("click", ".giphy", playPause);// this is the better way of doing the same thing.
});