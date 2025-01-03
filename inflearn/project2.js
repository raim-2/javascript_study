import config from "./apikeys.js";

// 1. 인풋에 입력 -> 2. 인풋에서 value 뽑아서 -> 3. url에 넣는다.
// 4. url이 valid해지면 -> 이후 api콜을 한다.
const cityInput = document.querySelector('.city-input');
const log = document.getElementById("log");
const weather = document.getElementById('weather');
let cityName = '';
let url;

//api키 가져오기
const apiKey = config.getApiKey();

//city이름 가져오기
function getCityName(e) {
    let cityName = cityInput.value;
    return cityName;
}

// function logKey(e) {
//     log.textContent += ` ${e.code}`;
// }

//인풋에 적힌 후 커서 밖으로 이동 시 이벤트실행
cityInput.addEventListener('keydown', function(e){
    // e.preventDefault();
    // logKey(e);
    if(e.keyCode == 13 && e.target.value !== ''){
        e.preventDefault();
        getCityName(e);

        cityName = getCityName();
        url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
        console.log(cityName, url, typeof url);

        getJSONData();
        // closure();
    };
});

//호출횟수 제한 클로저
function callCountLimiter(maxCalls) {
    let count = 0;

    return function() {
        if(count < maxCalls) {
            count++;
            console.log(`api 호출 횟수 ${count}`);
            // getJSONData();
        } else {
            console.log('api 호출 제한 초과');
            throw new Error('에러!!!!!!!! api 호출 제한 초과')
        };
    };
}

const closure = callCountLimiter(5);

async function getJSONData() {
    try {
        const response = await fetch(url, {
            method: 'post',
        });
        let count = await closure();
        const jsonData = await response.json();
        let currentWeather = jsonData.weather[0].description;

        console.log(jsonData, '성공', currentWeather, count);
        weather.innerHTML = currentWeather;
    } catch(err) {
        // console.log(err);
        throw new Error('통신 에러!!!!!!!!')
    };
}