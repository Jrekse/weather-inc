$(document).ready(function(){

    //when the search button is clicked...
    $("#search-btn").on("click", function(){

        //get the value from search box
        var cityInput = $("#search-btn").val();

        //calls the search city function with the city input parameter
        searchCity(cityInput);
    })

    //defines the api key as a string
    var apiKey = "e491011238d1eb2536608f8098e6823a";

    //adds list item to the ul class prev-search to establish search history
    function addHistory(text) {
        var li = $("<li>").addclass("list-group-item list-group-item-action").text(text);
        $(".prev-search").append(li);
    }

    //can go back to previous searches
    $(".prev-search").on("click", "li", function(){
        searchCity($(this).text());
    })

    //activates search, called when search button is clicked and takes cityInput as a param
    function searchCity(cityInput) {
        $.ajax({
            type: "GET",
            //uses the open weather api and takes cityInput and apiKey as variables in the querystring
            url: "api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + apiKey + "&units=imperial",
            //makes the output of the ajax in json
            dataType: "json",
            //returns data if the ajax is called successfully
            success: function(data){
                
            }
        })
    }

    
})