const temp = document.querySelector(".temperature");
const feels = document.querySelector(".feels")
const max = document.querySelector(".max");
const id = "5e51023cf0f11d72355dbe70f732e9b9";
const min = document.querySelector(".min");
const humidity = document.querySelector(".humidity");
const desc = document.querySelector(".desc");
const time = document.querySelector(".time h1");
const today = document.querySelector(".time h4");
const months = ["January","Feberuary","March","April","May","June","July","August","September",
                "October","Novermber","December"];
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const icon = document.querySelector(".icon");

//time
setInterval(()=>{
    const date = new Date();
    const hours = date.getHours();
    const tweleveHrFormat = hours>=13 ? hours%12:hours;
    let amPm = hours >= 12 ? "PM":"AM";
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const month = months[date.getMonth()];
    const dayOfWeek = days[date.getDay()];
    const day = date.getDate(); 

    time.textContent = tweleveHrFormat+":"+minutes+" "+amPm;
    today.textContent = dayOfWeek+", "+month+" "+day;
},1)

//weather forecast
getForecast();
function getForecast(){

    //get location
    navigator.geolocation.getCurrentPosition((success)=>{
        
        let{latitude,longitude} = success.coords;
      
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=imperial&appid="+id+"").
        then(response=>response.json()).then(data=>{
            array = data.weather;
            array.forEach((weather)=>{
                desc.textContent=weather.description;

                if(weather.icon=="01d"){
                    icon.innerHTML='<img src="images/01d.png" alt="clear">';
                }
                else if(weather.icon=="01n"){
                    icon.innerHTML='<img src="images/01n.png" alt="clear">';
                }
                else if(weather.icon=="02d"){
                    icon.innerHTML='<img src="images/02d.png" alt="semi-cloudy">';
                }
                else if(weather.icon=="02n"){
                    icon.innerHTML='<img src="images/02n.png" alt="semi-cloudy">';
                }
                else if(weather.icon=="03d" || weather.icon=="03n" || weather.icon=="04d" || weather.icon=="04n"){
                    icon.innerHTML='<img src="images/03d.png" alt="cloudy">';
                }
                else if(weather.icon=="09d" || weather.icon=="09n" || weather.icon=="10d" || weather.icon=="10n"){
                    icon.innerHTML='<img src="images/09d.png" alt="rainy">';
                }
                else if(weather.icon=="11d" || weather.icon=="11n"){
                    icon.innerHTML='<img src="images/13d.png" alt="thunderstorm">';
                }
                else if(weather.icon=="13d" || weather.icon=="13n"){
                    icon.innerHTML='<img src="images/13d.png" alt="snowy">';
                }
                else if(weather.icon=="50d" || weather.icon=="50n"){
                    icon.innerHTML='<img src="images/50d.png" alt="misty">';
                }
            })
            temp.textContent = Math.round(data.main.temp);
            feels.textContent = Math.round(data.main.feels_like);
            max.textContent = Math.round(data.main.temp_max);
            min.textContent = Math.round(data.main.temp_min);
            humidity.textContent = data.main.humidity;
        });
    })
}


