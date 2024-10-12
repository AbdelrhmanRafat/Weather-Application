//HTML Elements
var cityName = document.querySelector(".city");
var currentWeather = document.querySelector(".first-day-weather-card h3");
var firstDayIcon = document.querySelector(".first-day-weather-card img");
var firstDayWeatherCondition = document.querySelector(".first-day-weather-card .weather-condition");
var windForce = document.querySelector(".wind-percent span");
var windDirection = document.querySelector(".wind-direction span");
var rainPercentage = document.querySelector(".rain-percent span");
var input = document.querySelector("input");
var secondDayIcon = document.querySelector(".second-day-card img");
var thirdDayIcon = document.querySelector(".third-day-card img");
var secondDayWeatherCondition = document.querySelector(".second-day-weather-card span");
var thirdDayWeatherCondition = document.querySelector(".third-day-weather-card span");
var secondDayMaxTemp = document.querySelector(".second-day-weather-card h3");
var thirdDayMaxTemp = document.querySelector(".third-day-weather-card h3");
var secondDayMinTemp = document.querySelector(".second-day-weather-card p");
var thirdDayMinTemp = document.querySelector(".third-day-weather-card p");
var firstDay = document.querySelectorAll(".first-day-card .header-card p");
var secondDay = document.querySelector(".second-day-card .header-card p");
var thirdDay = document.querySelector(".third-day-card .header-card p");
//App Variables
var currentDate = new Date();
var daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//functions 
function ShowDays(){
  var currentDay = currentDate.getDay();
  var currentMonth = currentDate.getMonth();
  firstDay[0].innerText = daysInWeek[currentDay];
  firstDay[1].innerText = currentDate.getDate()+ " "+ monthes[currentMonth];
  if((currentDay + 1) > 6){
    secondDay.innerText = daysInWeek[0];
  }
  if((currentDay + 2) > 6){
    thirdDay.innerText = daysInWeek[1];
  }
}
async function GetCurrentWeather(strCity) {
    try
    {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${strCity}&days=3`);
    var data =  await response.json();
    return data;
    }
    catch {
      console.log("not found");
    }
}
async function ShowFirstDayWeather(strCity) {
    var result = await GetCurrentWeather(strCity);
    cityName.innerText = result.location.name;
    currentWeather.innerText = result.current.temp_c + " °C";
    firstDayIcon.setAttribute("src",result.current.condition.icon);
    firstDayIcon.setAttribute("alt",result.current.condition.text);
    firstDayWeatherCondition.innerText = result.current.condition.text;
    windForce.innerText = result.current.wind_kph + " Km/h";
   windDirection.innerText = "East";
   rainPercentage.innerText = "20%";
}
async function ShowNextDaysWeather(strCity) {
    var result = await GetCurrentWeather(strCity);
    secondDayIcon.setAttribute("src",result.forecast.forecastday[1].day.condition.icon);
    secondDayIcon.setAttribute("alt",result.forecast.forecastday[1].day.condition.text);
    thirdDayIcon.setAttribute("src",result.forecast.forecastday[2].day.condition.icon);
    thirdDayIcon.setAttribute("alt",result.forecast.forecastday[2].day.condition.text);
    secondDayWeatherCondition.innerText = result.forecast.forecastday[1].day.condition.text;
    thirdDayWeatherCondition.innerText = result.forecast.forecastday[2].day.condition.text;
    secondDayMaxTemp.innerText = result.forecast.forecastday[1].day.maxtemp_c + " °C";
    secondDayMinTemp.innerText = result.forecast.forecastday[1].day.mintemp_c + " °C";
    thirdDayMaxTemp.innerText = result.forecast.forecastday[2].day.maxtemp_c + " °C";
    thirdDayMinTemp.innerText = result.forecast.forecastday[2].day.mintemp_c + " °C";

}
async function ShowData(strCity){
  ShowFirstDayWeather(strCity);
  ShowNextDaysWeather(strCity);
}
ShowData("cairo");
ShowDays();
//events.
input.addEventListener("input",function(e){
    ShowData(e.target.value);
})
