const APIkey = "9f3909239ce56ce3a4e25c2c049c2e43"

function weather (){
    let city = window.prompt("Enter city");
    let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`

fetch(weatherURL)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data)
})
}
weather()
