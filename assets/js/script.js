const APIkey = "9f3909239ce56ce3a4e25c2c049c2e43"
const searchBtn = document.getElementById("searchBtn");
const userInput = document.getElementById("userInput");
const day = dayjs().format("MM/DD/YYYY");
const displayCityWeather = document.getElementById("displayCityWeather");


function weather (){
    let city = $("#userInput").val()
    let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`

fetch(weatherURL)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data)
})
}
weather()





// Add event listener to search button
searchBtn.addEventListener("click", weather);