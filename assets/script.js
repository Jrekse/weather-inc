$(document).ready(function(){

    var history=[];
    //when the search button is clicked...
    $("#searchButton").on("click", function(){

        //get the value from search box
        var cityInput = $("#search-btn").val();

        localStorage.setItem([], cityInput)


        //calls the search city function with the city input parameter
        searchCity(cityInput);

        
    })
    $("#fiveDayReset").on("click", function(){
        location.reload();
    });

    //defines the api key as a string
    var apiKey = "c1d1d428443608bdc6b13bb7cd56ca40";

    //adds list item to the ul class prev-search to establish search history
    function addHistory(text) {
        var li = $("<li>");
        li.addClass("list-group-item list-group-item-action").text(text);
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
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=Imperial&appid=" + apiKey,
            //makes the output of the ajax in json
            dataType: "json",
            //returns data if the ajax is called successfully
            success: function(data){
                //saves search item so local storage can be pulled from 
                console.log(data)
                
                if (history.indexOf(cityInput)===-1){
                    history.push(cityInput);
                    window.localStorage.setItem("history", JSON.stringify(history))
                    addHistory(cityInput);
                }

                //makes new data
                $("#temp").append("Temperature: " + data.main.temp)
                $("#humid").append("Humidity: " + data.main.humidity)
                $("#wind").append("Wind Speed: " + data.wind.speed)
                
                var lat = data.coord.lat;
                var lon = data.coord.lon;

                $.ajax({
                    type :"GET",
                    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey,
                    dataType: "json",
                    success: function(data){
                        console.log(data)
                        $("#uv").append(data.current.uvi)
                        
                    }
                })
                $.ajax({
                    type: "GET",
                    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=Imperial&appid=" + apiKey,
                    dataType: "json",
                    success: function(data){
                        console.log(data);
                        $("#dOneHead").append(data.list[2].dt_txt)
                        $("#dOneT").append("Temperature: " + data.list[2].main.temp)
                        $("#dOneH").append("Humidity: " + data.list[2].main.humidity)

                        $("#dTwoHead").append(data.list[10].dt_txt)
                        $("#dTwoT").append("Temperature: " + data.list[10].main.temp)
                        $("#dTwoH").append("Humidity: " + data.list[10].main.humidity)

                        $("#dThreeHead").append(data.list[18].dt_txt)
                        $("#dThreeT").append("Temperature: " + data.list[18].main.temp)
                        $("#dThreeH").append("Humidity: " + data.list[18].main.humidity)

                        $("#dFourHead").append(data.list[26].dt_txt)
                        $("#dFourT").append("Temperature: " + data.list[26].main.temp)
                        $("#dFourH").append("Humidity: " + data.list[26].main.humidity)

                        $("#dFiveHead").append(data.list[34].dt_txt)
                        $("#dFiveT").append(data.list[34].main.temp)
                        $("#dFiveH").append("Humidity: " + data.list[34].main.humidity)
                    }
                })
                
            }

        })
        
    }

    
})