const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', getWeather)

function getWeather(){
    let city = document.querySelector('.search-box input').value

    const API_Key = '408f67ec6afb584b204e2a6ce020f68e'

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if(data.cod === '404'){
                error404.style.display = 'block'
                // error404.style.scale = '1'
                // error404.style.opacity = '1'
                container.style.height = '400px'
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none'

            var temp = document.querySelector('.weather-box .temperature')
            var image = document.querySelector('.weather-box img')
            var desc = document.querySelector('.weather-box .description')
            var humidity = document.querySelector('.weather-details .humidity span')
            var wind = document.querySelector('.weather-details .wind span')
            

            switch (data.weather[0].main) {
                case 'Clouds':
                    image.src = 'assets/cloud.png';
                    break;

                case 'Clear':
                    image.src = 'assets/clear.png';
                    break;

                case 'Rain':
                    image.src = 'assets/rain.png'
                    break;

                case 'Snow':
                    image.src = 'assets/snow.png'
                    break;

                case 'Mist':
                    image.src = 'assets/mist.png'
                    break;
            
                default:
                    image.src = ''
                    break;
            }

            var celsius = data.main.temp - 273.15
            

            temp.innerHTML = `${parseInt(celsius )}<span>°C</span>`
            desc.innerHTML = `${data.weather[0].description}<br>
            <span><i class="fa-solid fa-cloud fa-beat-fade"></i>${data.clouds.all} Clouds</span>`

            humidity.innerHTML = `${parseInt(data.main.humidity)}`
            wind.innerHTML = `${parseFloat(data.wind.speed)}`
            

            // weatherBox.style.scale = '1'
            weatherBox.style.display = ''
            // weatherDetails.style.scale = '1'
            weatherDetails.style.display = ''
            weatherBox.classList.add('fadeIn')
            weatherDetails.classList.add('fadeIn')
            container.style.height = '600px'
                

            

            
        })
        
}