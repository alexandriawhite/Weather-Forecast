const APIkey = "9f3909239ce56ce3a4e25c2c049c2e43"
const searchBtn = document.getElementById("searchBtn");
const userInput = document.getElementById("userInput");
const day = dayjs().format("MM/DD/YYYY");
const displayCityWeather = document.getElementById("displayCityWeather");
let fiveDay = document.querySelector(".fiveDay");


function weather() {
    let city = $("#userInput").val()
    let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`
    let weatherURLToday = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`

    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayForecast(data)
            console.log(data)
            localStorage.setItem("city",city) /*Need to update this to an array*/
        })
}





function displayForecast(forecastData) {
    let filterForecast = forecastData.list.filter((day) => {
        if (day.dt_txt.includes("15:00:00")) {
            return true
        }
        else {
            return false
        }
    })
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
    fiveDayWeather.textContent= formattedDate
    symbol.setAttribute("src",`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`)
    temp.textContent= `Temp: ${day.main.temp}°F`
    wind.textContent=`Wind: ${day.wind.speed}MPH`
    humidity.textContent=`Humidity: ${day.main.humidity}`
    weatherCard.classList="forecastCard"
    weatherCard.append(fiveDayWeather,symbol,temp,wind,humidity)
    fiveDay.append(weatherCard)
    
   });
}



// Add event listener to search button
searchBtn.addEventListener("click", weather);