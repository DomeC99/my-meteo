function updateData (response){ //13. Shows JASON or OBJECT with info. Function (3) and changes info.
    //console.log(response.data); access the whole DATA .data.temperature.current to access more detailed info
    let temperature = document.querySelector(".weather-current-temperature"); //14. select the info I want to change
    temperature.innerHTML = Math.round(response.data.temperature.current); //15. change with info on API and ROUND it
    let newCity = document.querySelector(".city"); //6. select the info I want to change (16)
    newCity.innerHTML = response.data.city;//7. replaces with API info (17)
    let newDescription = document.querySelector("#description");
    newDescription.innerHTML = response.data.condition.description;
    let newHumidity = document.querySelector("#humidity");
    newHumidity.innerHTML = response.data.temperature.humidity;
    let newWind = document.querySelector("#wind");
    newWind.innerHTML = response.data.wind.speed;

    let icon = `<img src= "${response.data.condition.icon_url}" class="weather-icon">`; //27. Defining new HTML 
    let newIcon = document.querySelector(".icon"); //28. Selects the class in the HTML
    newIcon.innerHTML = icon; //29. Rewrites the HTML

    let newDate = document.querySelector("#time") //18. Selects the time ID
    let date = new Date(response.data.time * 1000); //19. Creates new date, to access the API time -> x1000
    newDate.innerHTML = formatDate(date); //20. replaces day and time (hour and mins)

    getForeData(response.data.city);
}

function formatDate (date){ //21. function to format the date
    let day = date.getDay(); //22. variables to get the info
    let hour = date.getHours();
    let minutes = date.getMinutes();

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //23. array to replace the day instead of numbers
    day = days[date.getDay()]; //24. update day variable

    if (minutes < 10) { //26. conditon for < 10 minutes
        minutes = `0${minutes}`;
    }
    return `${day} ${hour}:${minutes}`; //25. result
}

function searchCityApi (city){//8. Function (2) for intertwining the value with the API cities *city is new name for paramenter inputCity.value
    let apiKey = "28fac95a24b3ba61410a05dt43ob3b30"; //10. define KEY
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`; //11. replace with KEY and CITY (new parameter)
    axios.get(apiUrl).then(updateData); //12. access to axios, then get API, then new function to update info (3)
}
function showCity (event){ //3. define function (1). Sends city input for the API in next function.
    event.preventDefault(); //4. prevents reloading page
    let inputCity = document.querySelector("#input-city"); //5. selects the input
    //let newCity = document.querySelector(".city"); //6. selects the title I want to change
    //newCity.innerHTML = inputCity.value;//7. replaces the title with the input *IT CHANGES IDENTICALLY AS THE INPUT - qUITo
    searchCityApi(inputCity.value); //9. the value is called by a new function that uses the API *inputCity.value is redefined in the searchCityApi function parameter
}

function getForeData(city){
    apiKey = "28fac95a24b3ba61410a05dt43ob3b30";
    apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
}

function transformDate(time) {
    const date = new Date(time * 1000);
    const dayWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayWeek[date.getDay()];
}

function showForecast(response){ //FORE 2. this function prevents us from repeating 5 times in HTML
    
    //let days = ["Mon", "Tue", "Wed", "Thu", "Fri"]; //FORE 3. array with days for the loop ||| Not necessary when using API
    let foreHtml = ""; //FORE 4. HTML empty first
    response.data.daily.forEach(function (info, index) {
        if (index < 5) {
            //days.forEach(function(day) { //FORE 5. loop repeats for each day, and insert in DAY 
            foreHtml = foreHtml + //FORE 6. empty HTML now added string and day
                `<div class="forecast-info">
                    <div class="forecast-day">${transformDate(info.time)}</div>
                    <img src="${info.condition.icon_url}" class="forecast-icon">
                    <div class="forecast-temperature"><span class="forecast-temp-bold">${Math.round(info.temperature.maximum)}°</span> <span class="forecast-temp">${Math.round(info.temperature.minimum)}°</span></div>
                </div>`;
        }
    });

    let newForecast = document.querySelector("#forecast-section"); //FORE 7. select the section ID where I want my func
    newForecast.innerHTML = foreHtml //FORE 8. Add HTML in my selected DIV
}

let searchCity = document.querySelector("#search-city"); //1. Select the form, and submit button
searchCity.addEventListener("submit", showCity) //2. name of function (1)

searchCityApi("Quito"); //18. searches by default a city. Function 2
showForecast(); //FORE 1. call the func