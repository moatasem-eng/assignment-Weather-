let todayDateName = document.querySelector("#todayDateName");
let todayDateNumber = document.querySelector("#todayDateNumber");
let todayDateMonth = document.querySelector("#todayDateMonth");
let todayLocation = document.querySelector("#todayLocation");
let todayTemp = document.querySelector("#todayTemp");
let todayImg = document.querySelector("#todayImg");
let todayText = document.querySelector("#todayText");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let dirction = document.querySelector("#dirction");

// nexty day and after

let nextDayName = document.querySelectorAll(".nextDayName");
let nextDayImg = document.querySelectorAll(".nextDayImg");
let nextMaxTemp = document.querySelectorAll(".nextMaxTemp");
let nextMinTemp = document.querySelectorAll(".nextMinTemp");
let nextDayText = document.querySelectorAll(".nextDayText");

// search input
let search = document.querySelector("#search");

let apiKey = "a7cdf54b38894db2bee184115241007"
let baseUrl = "http://api.weatherapi.com/v1/forecast.json"

// fetching api

async function getWeatherData(x){
    try {
        let weatherResponse = await fetch(`${baseUrl}?key=${apiKey}&q=${x}&days=3`);
        let finalRes = await weatherResponse.json()
        console.log(finalRes)
        return finalRes
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "you entered a wrong location!",
        });
    }
}

function displayToday(x){  
    let date = new Date;
    todayDateName.innerHTML = date.toLocaleDateString("en-us",{weekday:"long"})
    todayDateNumber.innerHTML = date.getDate()
    todayDateMonth.innerHTML = date.toLocaleDateString("en-us",{month:"long"})
    todayLocation.innerHTML = x.location.name ;
    todayTemp.innerHTML = x.current.temp_c ;
    todayImg.setAttribute("src", x.current.condition.icon)
    todayText.innerHTML = x.current.condition.text ;
    humidity.innerHTML = x.current.humidity + "%";
    wind.innerHTML = x.current.wind_kph + "km/h";
    dirction.innerHTML =x.current.wind_dir;
}
function displayNextDays(data){
    let foreCastData = data.forecast.forecastday;

    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(foreCastData[i+1].date)
        nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-us",{weekday:"long"});
        nextMaxTemp[i].innerHTML = foreCastData[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = foreCastData[i+1].day.mintemp_c;
        nextDayImg[i].setAttribute("src",foreCastData[i+1].day.condition.icon);
        nextDayText[i].innerHTML = foreCastData[i+1].day.condition.text;
    }
}




async function startApp(x){
    let weatherData = await getWeatherData(x);
    displayToday(weatherData);
    displayNextDays(weatherData);
    
}




function getCurrentLoc(position){
    let longitude = position.coords.longitude
    let latitude = position.coords.latitude
    let myCurrentPos = `${latitude},${longitude}`
    let y =  getWeatherData(myCurrentPos)
    startApp(y)
    // console.log(longitude,latitude);
}
navigator.geolocation.getCurrentPosition(getCurrentLoc);  

search.addEventListener("change", function(){
    startApp(search.value)
})


startApp();


// 3ndy moshklaa ana msh 3aref eh heya byrg3ly 7ada esmha promise land
// bardo el alert message msh 3ayza tsht8l msh 3aref leeh m3 en feeh error already 