// Seleção dos elementos
const iconeElemento = document.querySelector('.icone-clima');
const temperaturaElemento = document.querySelector('.temperatura-valor p');
const descricaoElemento = document.querySelector('.temperatura-descricao');
const localizacaoElemento = document.querySelector('.localizacao p');
const notificacaoElemento = document.querySelector('.notificacao');

//App data
const clima = {};
clima.temperatura = {
    unit: 'celsius'
};

//Constantes e variáveis
const KELVIN = 273;

//Chave API
const chave = 'f9bcfcec53db75d1bf60f598cc4ec913';

//checagem se a localização é suportada pelo navegador
if('geolocation' in navigator){
   navigator.geolocation.getCurrentPosition(setPosition, showError); 
}else{
    notificacaoElemento.style.display = 'block';
    notificacaoElemento.innerHTML = `<p> O navegador não possui suporte a localização!`;
}

//localização do usuário
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getClima(latitude, longitude);
}

// mostrar erro 
function showError(error){
    notificacaoElemento.style.display = 'block';
    notificacaoElemento.innerHTML = `<p> A localização não está ativa!`;
}

//Pegar clima pela API
function getClima(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lang=pt&lat=${latitude}&lon=${longitude}&appid=${chave}`;
    fetch(api).then(function(response){
      let data = response.json();
      return data;  
    })
    .then(function(data){
       clima.temperatura.value = Math.floor(data.main.temp - KELVIN);
       clima.description = data.weather[0].description;
       clima.iconId = data.weather[0].icon;
       clima.city = data.name;
       clima.country = data.sys.country;
    })
    .then(function(){
       displayWeather(); 
    });

    //Mostrar o clima
    function displayWeather(){
        iconeElemento.innerHTML = `<img src="icons/${clima.iconId}.png" alt="">`;
        temperaturaElemento.innerHTML = `${clima.temperatura.value}°<span>C</span>`;
        descricaoElemento.innerHTML = clima.description;
        localizacaoElemento.innerHTML = `${clima.city}, ${clima.country}`;
    } 
}