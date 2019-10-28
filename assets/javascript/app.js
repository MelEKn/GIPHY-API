console.log("The Javascript is linked!");

var topics = ["happy", "sad", "confused", "excited", "dubious", "relaxed", "sleepy", "angry", "annoyed", "joyful", "alert"];

renderButtons();

function renderButtons() {

    //empty the buttons from the html
    $("#buttonList").empty();

    //looping through the array of topics (emotions)
    for (var i = 0; i < topics.length; i++) {

        //dynamically generate buttons for each emotion in the array
        var feeling = $("<button>");
        feeling.addClass("giphy");
        feeling.text(topics[i]);
        feeling.val(topics[i]);
        $("#buttonList").append(feeling);
    }

}

console.log(this);
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics[0] + "&limit=10&apikey=bSgTMFxA6jmewtl9NzOw5IkASCqhn5sI";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    console.log(response);

    //creates a div to hold the gif

    var newDiv = $("<div>");

    //runs a for loop to go through all 10 responses
    for (var i = 0; i < 5; i++) {


        var gifName = response.data[i].title;

        newDiv.append("Title: " + gifName);
        newDiv.append("<img src='http://media0.giphy.com/media/" + response.data[i].id + "/200.gif'><br/>");
    }

    $("#gifs-view").html(newDiv);

});

// This function handles events where the Add a Giphy button is clicked
$("#add-giphy").on("click", function (event) {
    event.preventDefault();
    console.log("The onclick for add-giphy worked");
    // This line of code will grab the input from the textbox
    var giphy = $("#giphy-input").val().trim();

    console.log("giphy is " + giphy)

    // The movie from the textbox is then added to our array
    topics.push(giphy);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});