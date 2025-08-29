function showCity (event){ //3. define the function (1)
    event.preventDefault(); //4. prevents reloading page
    let inputCity = document.querySelector("#input-city"); //5. selects the input
    let newCity = document.querySelector(".city"); //6. selects the title I want to change
    newCity.innerHTML = inputCity.value;//7. replaces the title with the input
}
let searchCity = document.querySelector("#search-city"); //1. Select the form, and submit button
searchCity.addEventListener("submit", showCity) //2. name of function (1)