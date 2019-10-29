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
function displayGifs() {

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
        for (var i = 0; i < 10; i++) {


            var gifName = response.data[i].title;
            var gifAnimated = response.data[i].images.fixed_height.url;
            var gifStill = response.data[i].images.fixed_height_still.url;
            var rating = response.data[i].rating.toUpperCase();

            console.log("gifAnimated is " + gifAnimated);

            newDiv.append("Title: " + gifName + "<br />");
            // newDiv.append("<img src='http://media0.giphy.com/media/" + response.data[i].id + "/200.gif'><br/>");
            //appending the html for the gif to the new div

            newDiv.append("<img src = '" + gifStill + "' data-still='" + gifStill + "' data-animate='" + gifAnimated + "' data-state='still' class='gif'><br/>");

            newDiv.append("Rating: " + rating + "<br/> <br/>");
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

$(document).on("click", ".gif", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    console.log("The gif click function was activated");
    var state = $(this).attr("data-state");
    console.log("state is " + state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});