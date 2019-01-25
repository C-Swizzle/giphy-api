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
            var $gif = $("<img>");
            $gif.attr("src", results[i].images.fixed_height.url);
            
        }
    });
}
$(".query-button").on("click", callAPI);

});