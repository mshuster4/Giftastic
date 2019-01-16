
var TVshows = ["The Office", "Bob's Burgers", "The Simpsons", 
                "Black Mirror", "Stranger Things", "Freaks and Geeks"];

function renderButtons() {

    $("#buttons").empty(); 

    for (var i = 0; i < TVshows.length; i++) {

        var showButton = $("<button>");
        showButton.addClass("show button btn btn-sm btn-primary");
        showButton.attr("data-show", TVshows[i]);
        showButton.text(TVshows[i]);
        $("#buttons").append(showButton); 

    }

}

$("#add-tv-show").on("click", function(event) {

    event.preventDefault();

    var newTVshow = $("#tv-show-input").val().trim();

    if (TVshows.indexOf(newTVshow)=== -1) {

    TVshows.push(newTVshow);
    renderButtons();

    }

    else {

        alert("Please type a different show"); 
    }


    $("#tv-show-input").val("")

    
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

                var gifDiv = $("<div class='col-sm-3'>");
                var rating = giphs[i].rating;
                var ratingText = $("<p>").html("Rating: " + "<span class='rating-text'>" + rating.toUpperCase() + "</span>");
                var showImage = $("<img>");

                ratingText.addClass("text"); 
                
                showImage.attr("src", giphs[i].images.original_still.url);
                showImage.attr("data-still", giphs[i].images.original_still.url);
                showImage.attr("data-animate", giphs[i].images.original.url);
                showImage.attr("data-state", "still"); 
                showImage.addClass("gif img-fluid");

                gifDiv.append(showImage);
                gifDiv.append(ratingText);

                $("#gif-area").append(gifDiv);

            } 

            $("#addGifsButton").on("click", function() {

                $("#gif-area").empty(); 

                for (var i = 0; i < 20; i++) {

                    var gifDiv = $("<div class='col-sm-3'>");
                    var rating = giphs[i].rating;
                    var ratingText = $("<p>").html("Rating: " + "<span class='rating-text'>" + rating.toUpperCase() + "</span>");
                    var showImage = $("<img>");

                    ratingText.addClass("text"); 
                
                    showImage.attr("src", giphs[i].images.original_still.url);
                    showImage.attr("data-still", giphs[i].images.original_still.url);
                    showImage.attr("data-animate", giphs[i].images.original.url);
                    showImage.attr("data-state", "still"); 
                    showImage.addClass("gif img-fluid");

                    gifDiv.append(showImage);
                    gifDiv.append(ratingText);

                    $("#gif-area").append(gifDiv);


                }

            }); 
 
        
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





