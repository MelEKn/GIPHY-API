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

 // displayGifs function re-renders the HTML to display the appropriate content
function displayGifs(){

console.log(this);

var emotion = $(this).val();

console.log("emotion is " + emotion);

// var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&limit=10&apikey=bSgTMFxA6jmewtl9NzOw5IkASCqhn5sI";

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=bSgTMFxA6jmewtl9NzOw5IkASCqhn5sI&limit=10";


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
        var gifAnimated = response.data[i].images.fixed_height.url;

        console.log("gifAnimated is " + gifAnimated);

        newDiv.append("Title: " + gifName);
        // newDiv.append("<img src='http://media0.giphy.com/media/" + response.data[i].id + "/200.gif'><br/>");
        newDiv.append("<img src = '" + gifAnimated + "'><br/>");
    }

    $("#gifs-view").html(newDiv);

});
}

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

     // Adding click event listeners to all elements with a class of "giphy"
     $(document).on("click", ".giphy", displayGifs);