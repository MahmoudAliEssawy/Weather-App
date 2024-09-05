// variables
let box = document.getElementById('box')
let inputValue = document.getElementById('cityName')
let searchBtn = document.querySelector('button')
let images = {
    clearSky:'images/clear.png',
    rainSky:'images/rain.png',
    snow:'images/snow.png',
    clouds:'images/clouds.png',
    drizzl:'images/drizzl.png',
    mist:'images/mist.png'
}


async function weatherApi(city){

    // using Fetch
    
    let apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=63e9845789b3aeb95d62b1a79807022d&units=metric`)
    let weatherApi = await apiCall.json()
    
    if(apiCall.status === 404){
        console.clear()
        box.innerHTML = `
            <h2>invalid name city ? <span>( ${inputValue.value} )</span></h2>
            <img src='images/error.png' />
            <style>
                h2{
                    color:#fff;
                    margin-top:15px;
                }
                img{
                    width:50%
                }
                    span{
                        color:red;
                        text-decoration: underline;
                        font-weight:500;
                    }
            <style/>
        `

    }else{
        let content = ''
        let imageSrc;
        if((weatherApi.weather[0].main).toLowerCase() == 'clear'){
                imageSrc = images.clearSky
                
            }else if((weatherApi.weather[0].main).toLowerCase() == 'rain'){
                imageSrc = images.rainSky

            }else if((weatherApi.weather[0].main).toLowerCase() == 'snow'){
                imageSrc = images.snow

            }else if((weatherApi.weather[0].main).toLowerCase() == 'clouds'){
                imageSrc = images.clouds

            }else if((weatherApi.weather[0].main).toLowerCase() == 'drizzl'){
                imageSrc = images.drizzl

            }else if((weatherApi.weather[0].main).toLowerCase() == 'mist'){
                imageSrc = images.mist
            }else{
                imageSrc.mist
            }  
        
            
            content+=`
                <div class="content">
                    <img src="${imageSrc}" alt="">
                    <h1>${Math.ceil(weatherApi.main['temp'])}°C</h1>
                    <p>${weatherApi.weather[0].description}</p>
                </div>
                <div class="info">
                    <div>
                        <img src="images/wind.png" alt="">
                    </div>
                    <div class="speed">
                        <small>${weatherApi.wind.speed} km/h</small>
                        <p>Wind speed</p>
                    </div>
                </div>

                `
            box.innerHTML = content;
            inputValue.value =''
    }
    
}
    
// btn clicks
searchBtn.onclick = function(){
    if(inputValue.value!=''){

        weatherApi(inputValue.value)

    }else{
        alert('must write country or spcifc city')
    }
}

    


    





