const APIkey = "9f3909239ce56ce3a4e25c2c049c2e43"
const searchBtn = document.getElementById("searchBtn");
const userInput = document.getElementById("userInput");
const day = dayjs().format("MM/DD/YYYY");
const displayCityWeather = document.getElementById("displayCityWeather");
let fiveDay = document.querySelector(".fiveDay");
let citySearches = document.querySelector(".citySearches");
let currentDay = dayjs().format("MM/DD/YYYY");
let searchKey = "searchKey"


function weather(city) {
    let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`
    let weatherURLToday = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayForecast(data)
        })
    fetch(weatherURLToday)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            today(data,city)
            setLocalStorage(city)
        })  
}
/*5 day forecast section*/
function displayForecast(forecastData) {
    let filterForecast = forecastData.list.filter((day) => {
        if (day.dt_txt.includes("15:00:00")) {
            return true
        }
        else {
            return false
        }
    })
    fiveDay.innerHTML="";
    filterForecast.forEach(day => {
        let weatherCard = document.createElement("div")
        let fiveDayWeather = document.createElement("h2")
        let symbol = document.createElement("img")
        let temp = document.createElement("p")
        let wind = document.createElement("p")
        let humidity = document.createElement("p")
        let date = day.dt_txt.split(" ")[0]
        let [year, month, dy] = date.split('-');
        let formattedDate = [month, dy, year].join('/');
        fiveDayWeather.textContent = formattedDate
        symbol.setAttribute("src", `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`)
        temp.textContent = `Temp: ${day.main.temp}°F`
        wind.textContent = `Wind: ${day.wind.speed} MPH`
        humidity.textContent = `Humidity: ${day.main.humidity}%`
        weatherCard.classList = "forecastCard"
        weatherCard.append(fiveDayWeather, symbol, temp, wind, humidity)
        fiveDay.append(weatherCard)
    });
}
/*Today section*/
function today(todayInfo,city){
    displayCityWeather.innerHTML="";
    let todayContainer = document.createElement("div")
    let cityPlusDate = document.createElement("h2")
    let symbol = document.createElement("img")
    let todayTemp = document.createElement("p")
    let todayWind = document.createElement("p")
    let todayHumidity = document.createElement("p")
    let fiveDayForecast = document.querySelector("h2")
    cityPlusDate.textContent = `${city} (${currentDay})`
    todayTemp.textContent =  `Temp: ${todayInfo.main.temp}°F`
    todayWind.textContent = `Wind: ${todayInfo.wind.speed} MPH`
    todayHumidity.textContent = `Humidity: ${todayInfo.main.humidity}%`
    symbol.setAttribute("src", `http://openweathermap.org/img/wn/${todayInfo.weather[0].icon}@2x.png`)
    fiveDayForecast.className="fiveDayForecast"
    fiveDayForecast.textContent = `5-Day Forecast:`
    todayContainer.className= "displayCityWeather"
    todayContainer.append(cityPlusDate,symbol,todayTemp,todayWind,todayHumidity)
    displayCityWeather.append(todayContainer,fiveDayForecast) 

}
/*creating city buttons*/
function citySearchBtn(){
    citySearches.innerHTML=""
    if (localStorage.getItem(searchKey) !== null){
        let cities = localStorage.getItem(searchKey)
        let citiesSearches = JSON.parse(cities)
         citiesSearches.forEach(element => {
    let recentSearches = document.createElement("button")
    recentSearches.className ="recentSearches"
    recentSearches.innerHTML=element
    citySearches.append(recentSearches)})
}};

/*Checking if city is in array. If it is not, it's adding it*/
function setLocalStorage(city) {
    if (localStorage.getItem(searchKey) !== null){
    let cities = localStorage.getItem(searchKey)
    let citiesSearches = JSON.parse(cities)
    if (citiesSearches.includes(city)){
    } else {citiesSearches.push(city);
    }
    localStorage.setItem(searchKey, JSON.stringify(citiesSearches));
    citySearchBtn();
    } else {
    let searches = []
    searches.push(city);
    localStorage.setItem(searchKey, JSON.stringify(searches));
    citySearchBtn();
}}


/*Function for buttons for searched cities*/
citySearchBtn();
// Add event listener to search button
searchBtn.addEventListener("click", function(){
    let city = $("#userInput").val().toUpperCase()
    weather(city);
});
$(".citySearches").on("click", ".recentSearches", function(){
    let city = $(this).text()
    weather(city);
})