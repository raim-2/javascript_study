import config from "./apikeys.js";

// 1. 인풋에 입력 -> 2. 인풋에서 value 뽑아서 -> 3. url에 넣는다.
// 4. url이 valid해지면 -> 이후 api콜을 한다.
const cityInput = document.querySelector('.city-input');
const weather = document.getElementById('weather');
const searchBtn = document.querySelector('.search-btn');
// const log = document.getElementById("log");

//api키 가져오기
const apiKey = config.getApiKey();

//city이름 가져오기
function getCityName() {
    return cityInput.value;
}

//url 생성
function createWeatherUrl(cityName) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
}

async function getWeatherData(url) {
    try {
        const response = await fetch(url);
        console.log('fetch 연결 status : ' + response.status); //응답 상태 확인
        const jsonData = await response.json();
        let count = await limitApiCalls();
        return jsonData;
    } catch(err) {
        console.log('fetch 통신 에러!!!!!!!!');
        throw new Error;
    };
}

//호출횟수 제한 클로저
function callCountLimiter(maxCalls) {
    let count = 0;
    let timeoutId;
    function resetCount() {
        count = 0;
        console.log('api 호출 횟수 초기화');
    }

    //자정(혹 지정시간)까지 남은 시간을 밀리초로 반환하는 함수
    function getMillisecondsUntilMidnight(left) {
        const now = new Date(); //현재 날짜+시간
        /*
        이렇게 하면 날짜 계산에 오류 발생 가능
        const midnight = new Date().setHours(24, 0, 0, 0); //다음날 자정
        → Date객체로 반환이 되어야 계산이 정확하게 됨
        */

        //new Date(year, monthIndex, day, hours);
        const afterDelay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds() + left); //5초 뒤
        //const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0); //다음날 자정
        let timeLeft = afterDelay.getTime() - now.getTime();
        console.log(timeLeft/1000/60/60);
        return afterDelay.getTime() - now.getTime(); //지정시간 - 현재시간 = 지정시간까지 남은 시간을 밀리초로 변환한 값
    }

    // 최초 실행 시 자정까지의 시간차 이후 호출 횟수 초기화
    // 타이머 만료 시 resetCount 실행, getMillisecondsUntilMidnight() 값이 delay로 들어감
    timeoutId = setTimeout(resetCount, getMillisecondsUntilMidnight(30));

    return function() {
        if(count < maxCalls) {
            count++;
            console.log(`api 호출 횟수 ${count}`);
            return;
        } else {
            console.log('api 호출 제한 초과');
            throw new Error;
        };
    };
}

//클로저
const limitApiCalls = callCountLimiter(5);

//날씨 가져오기
async function getWeather() {
    try {
        const cityName = getCityName();
        const url = createWeatherUrl(cityName);
        const jsonData = await getWeatherData(url);
        let currentWeather = jsonData.weather[0].description;

        console.log(cityName, url, jsonData, '성공', currentWeather);
        weather.innerHTML = currentWeather;
    } catch(err) {
        console.log('날씨 정보를 불러오는 데 실패했습니다.');
        throw new Error;
    }
}

// function logKey(e) {
//     log.textContent += ` ${e.code}`;
// }

//검색 버튼 클릭 시 이벤트리스너
searchBtn.addEventListener('click', () => {
    if(cityInput.value !=='') {
        getWeather();
    } else {
        alert('도시 이름을 입력해주세요');
        cityInput.focus();
    }
});

//인풋에 입력 후 커서 밖으로 이동 시 이벤트리스너
cityInput.addEventListener('keydown', (e) => {
    if(e.keyCode == 13 && e.target.value !== ''){
        e.preventDefault();
        getWeather();
    } else {
        alert('도시 이름을 입력해주세요');
        cityInput.focus();
    }
});


