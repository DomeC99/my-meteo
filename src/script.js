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

}
function searchCityApi (city){//8. Function (2) for intertwining the value with the API cities *city is new name for paramenter inputCity.value
    let apiKey = "28fac95a24b3ba61410a05dt43ob3b30"; //10. define KEY
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`; //11. replace with KEY and CITY (new parameter)
    axios.get(apiUrl).then(updateData); //12. access to axios, then get API, then new function to update info (3)
}
function showCity (event){ //3. define function (1). Sends city input for the API in next function.
    event.preventDefault(); //4. prevents reloading page
    let inputCity = document.querySelector("#input-city"); //5. selects the input
    //let newCity = document.querySelector(".city"); //6. selects the title I want to change
    //newCity.innerHTML = inputCity.value;//7. replaces the title with the input *IT CHANGES IDENTICALLY AS THE INPUT - qUITo
    searchCityApi(inputCity.value); //9. the value is called by a new function that uses the API *inputCity.value is redefined in the searchCityApi function parameter
}
let searchCity = document.querySelector("#search-city"); //1. Select the form, and submit button
searchCity.addEventListener("submit", showCity) //2. name of function (1)

searchCityApi("Quito"); //18. searches by default a city. Function 2