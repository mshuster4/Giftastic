
var TVshows = ["The Office", "Bob's Burgers", "The Simpsons", "Black Mirror", 
                "30 Rock", "Arrested Developement", "Stranger Things", "Freaks and Geeks"];

function renderButtons() {

    $("#buttons").empty(); 

    for (var i = 0; i < TVshows.length; i++) {

        var showButton = $("<button>");
        showButton.addClass("show");
        showButton.attr("data-show", TVshows[i]);
        showButton.text(TVshows[i]);
        $("#buttons").append(showButton);

    }

}

$("#add-tv-show").on("click", function(event) {

    event.preventDefault();
    var newTVshow = $("#tv-show-input").val().trim();
    TVshows.push(newTVshow);

    renderButtons(); 

    
});

function gifDisplay () {
    
        $("#gif-area").empty(); 

        var TVshow = $(this).attr("data-show"); 

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + TVshow + "&api_key=akphQCQZDm45wICT8Gm9w2S88I4FGIq2";

        $.ajax({

        url: queryURL,
        method: "GET"
        })
            .then(function(response) {

            var giphs = response.data;

            console.log(giphs); 

            for (var i = 0; i < 10; i++)  {

                var gifDiv = $("<div>");
                var rating = giphs[i].rating;
                var ratingText = $("<p>").text("Rating: " + rating);
                var showImage = $("<img>");

                showImage.attr("src", giphs[i].images.fixed_width_still.url);
                showImage.attr("data-still", giphs[i].images.fixed_width_still.url);
                showImage.attr("data-animate", giphs[i].images.fixed_width.url);
                showImage.attr("data-state", "still"); 
                showImage.addClass("gif");

                gifDiv.append(showImage);
                gifDiv.append(ratingText);

                $("#gif-area").append(gifDiv);

            } 
        
            gifState(); 
    
    }); 
}

function gifState() {

    $(".gif").on("click", function() {
    
        var state = $(this).attr("data-state");
        console.log(state); 
        
        if (state =="still") {
        
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }

        else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still"); 
        
        }
        
    }); 

}


$(document).on("click", ".show", gifDisplay);

renderButtons(); 





