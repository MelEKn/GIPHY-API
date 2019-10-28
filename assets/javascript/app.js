console.log("The Javascript is linked!");

var topics = ["happy", "sad", "confused", "excited", "dubious", "relaxed", "sleepy", "angry", "annoyed", "joyful", "alert"];

renderButtons();

function renderButtons(){

    //empty the buttons from the html
    $("#buttonList").empty();
    
    //looping through the array of topics (emotions)
    for(var i=0; i<topics.length; i++){

        //dynamically generate buttons for each emotion in the array
        var feeling = $("<button>");
        feeling.addClass("giphy");
        feeling.text(topics[i]);
        feeling.val(topics[i]);
        $("#buttonList").append(feeling);
    }

}