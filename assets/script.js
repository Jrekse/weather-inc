$(document).ready(function(){



    var cityInput = $("#search-input");
    var apiKey = "c1d1d428443608bdc6b13bb7cd56ca40";
    var prevSearch = $('.prev-search')
    var bottom = $("#bottomStuff")
    var history=[];

    function init() {
        var storedValues = JSON.parse(localStorage.getItem('history'));
        if (storedValues !== null) {
            history = storedValues;
            addHistory()
        }
    }

    //when the search button is clicked...
    $("#searchButton").on("click", function(){


        //get the value from search box
        var searched = cityInput.val();

        if (searched === '') {
            return;
        }

        history.push(searched);
        cityInput.val('');

        //calls the search city function with the city input parameter
        searchCity(searched);
        addHistory(searched)
        storeSearch()
        
    })

    $(".clear").on("click", function(){

        location.reload();
        console.log('here');
        addHistory();
        
    })


    //adds list item to the ul class prev-search to establish search history
    function addHistory() {
        prevSearch.innerHTML = '';

        for (var i = 0; i < history.length; i++) {
            var item = history[i];
            console.log(item);

            var li = $('<li>');
            li.addClass("list-group-item list-group-item-action").text(item);
            console.log(li);

            prevSearch.prepend(li);
        }
    }

    //can go back to previous searches
    $(".prev-search").on("click", "li", function(){
        
        searchCity($(this).text());
    })

    function storeSearch() {
        localStorage.setItem('history', JSON.stringify(history));
    }

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

                //makes new data
                $('#city').append(data.name)
                $("#temp").append("Temperature: " + data.main.temp + "F")
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

                        var uvValue = data.current.uvi;
                        $("#uv").append("UV Index: " + uvValue)
                        console.log(uvValue)
                        if(uvValue < 3){
                            $("#uvIndex").addClass('green')
                        } else if (uvValue < 5){
                            $("#uvIndex").addClass('orange')
                        } else {
                            $("#uvIndex").addClass('red')
                        }


                        
                    }
                })
                $.ajax({
                    type: "GET",
                    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=Imperial&appid=" + apiKey,
                    dataType: "json",
                    success: function(data){
                        console.log(data);
                        $("#dateToday").append(data.list[0].dt_txt)

                        $("#dOneHead").append(data.list[2].dt_txt)
                        $("#dOneT").append("Temperature: " + data.list[2].main.temp)
                        $("#dOneH").append("Humidity: " + data.list[2].main.humidity)
                        $("#dOneW").append("Wind Speed: " + data.list[2].wind.speed)
                        $("#icon").append(`<img src="https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png">`)

                        $("#dTwoHead").append(data.list[10].dt_txt)
                        $("#dTwoT").append("Temperature: " + data.list[10].main.temp)
                        $("#dTwoH").append("Humidity: " + data.list[10].main.humidity)
                        $("#dTwoW").append("Wind Speed: " + data.list[10].wind.speed)

                        $("#dThreeHead").append(data.list[18].dt_txt)
                        $("#dThreeT").append("Temperature: " + data.list[18].main.temp)
                        $("#dThreeH").append("Humidity: " + data.list[18].main.humidity)
                        $("#dThreeW").append("Wind Speed: " + data.list[18].wind.speed)

                        $("#dFourHead").append(data.list[26].dt_txt)
                        $("#dFourT").append("Temperature: " + data.list[26].main.temp)
                        $("#dFourH").append("Humidity: " + data.list[26].main.humidity)
                        $("#dFourW").append("Wind Speed: " + data.list[26].wind.speed)

                        $("#dFiveHead").append(data.list[34].dt_txt)
                        $("#dFiveT").append("Temperature: " + data.list[34].main.temp)
                        $("#dFiveH").append("Humidity: " + data.list[34].main.humidity)
                        $("#dFiveW").append("Wind Speed: " + data.list[34].wind.speed)
                    }
                })
                
            }

        })
        
    }

    init()  
})