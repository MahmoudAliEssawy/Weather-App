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
//******************************************************* */
// button on the click
searchBtn.onclick = function(){
    if(inputValue.value!=''){
        //  asyncronanos to wait the data to return from server
        (async ()=>{
            await weatherApi()
            })()
    }else{
        alert('must write country or spcifc city')
    }
}

function weatherApi(){
    // using ajax tech
    let weatherApi;
    return new Promise(function(callback){
    let apiCall = new XMLHttpRequest()
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=63e9845789b3aeb95d62b1a79807022d&units=metric`
    apiCall.open('GET' , url) // method (GET) & // URL to go to
    apiCall.send()
    // variable to save data convert it from string to array
    try{
        apiCall.addEventListener('readystatechange',function(){
            if(apiCall.readyState == 4 && apiCall.status ==200){
                weatherApi = JSON.parse(apiCall.response)
                // it,s mean well be start first when the program run on server if you want
                // to start this funtion first
                callback()
                //display funtion
                display(weatherApi)
            }else if(apiCall.status == 404){
                    box.innerHTML = `
                        <h1>invalid name city ? <span>( ${inputValue.value} )</span></h1>
                        <img src='images/error.png' />
                        <style>
                            h1{
                                color:#fff;
                                margin-top:15px;
                            }
                            img{
                                width:50%
                            }
                                span{
                                    color:red;
                                    font-weight:500;
                                    
                                }
                        <style/>
                    `
                }
            }
            
        )
    }catch{
        throw Error('Bad Request')
    }
    
}
        
)}

function display(dataApi){
    let content = ''
    let imageSrc;
    if((dataApi.weather[0].main).toLowerCase() == 'clear'){
        imageSrc = images.clearSky
        
    }else if((dataApi.weather[0].main).toLowerCase() == 'rain'){
        imageSrc = images.rainSky

    }else if((dataApi.weather[0].main).toLowerCase() == 'snow'){
        imageSrc = images.snow

    }else if((dataApi.weather[0].main).toLowerCase() == 'clouds'){
        imageSrc = images.clouds

    }else if((dataApi.weather[0].main).toLowerCase() == 'drizzl'){
        imageSrc = images.drizzl

    }else if((dataApi.weather[0].main).toLowerCase() == 'mist'){
        imageSrc = images.mist
    }else{
        imageSrc.mist
    }  
    
   
    content+=`
        <div class="content">
            <img src="${imageSrc}" alt="">
            <h1>${Math.ceil(dataApi.main['temp'])}°C</h1>
            <p>${(inputValue.value).toLowerCase()}</p>
        </div>
        <div class="info">
            <div>
                <img src="images/wind.png" alt="">
            </div>
            <div class="speed">
                <small>${dataApi.wind.speed} km/h</small>
                <p>Wind speed</p>
            </div>
        </div>

        `
    box.innerHTML = content;
    inputValue.value =''
}


