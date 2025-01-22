import config from "./apikeys.js";

// 1. 인풋에 입력 -> 2. 인풋에서 value 뽑아서 -> 3. url에 넣는다.
// 4. url이 valid해지면 -> 이후 api콜을 한다.
const cityInput = document.querySelector('.city-input');
const weather = document.getElementById('weather');
const searchBtn = document.querySelector('.search-btn');
let timeToReset = reSetTime(); // 리셋까지 남은 시간(초)
let secondsToReset;
let count = 0;
const maxCalls = 5; //최대 호출 횟수
// const log = document.getElementById("log");

//api키 가져오기
const apiKey = config.getApiKey();

//city이름 가져오기
function getCityName() {
    return cityInput.value;
}

//리셋 타임 설정
function reSetTime(){
    return 10;
}

//url 생성
function createWeatherUrl(cityName) {
    // &lang=kr
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
}

async function fetchCurrentWeatherData(apiUrl) {
    try {
        console.log(apiUrl)
        const response = await fetch(apiUrl);
        console.log('fetch 연결 status : ' + response.status); //응답 상태 확인
        const jsonData = await response.json();
        return jsonData;
    } catch(err) {
        console.log('에러 정보 : ' + err);
        throw new Error('통신 에러, 다시 시도해주세요');
    };
}

//자정(혹 지정시간)까지 남은 시간을 밀리초로 반환하는 함수 - 남은 시간 확인
function getMillisecondsUntilMidnight(timeToReset) {
    const now = new Date(); //현재 날짜+시간
    /**
     * const midnight = new Date().setHours(24, 0, 0, 0);
     * 다음날 자정 설정 시 위처럼 하면 날짜 계산에 오류 발생 가능
     * 밀리초로 반환되기 때문 → Date객체로 반환이 되어야 계산이 정확하게 됨
     */

    //new Date(year, monthIndex, day, hours) 시간 설정 방법
    //const resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); //다음날 자정
    const resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds() + Number(timeToReset)); //10초 뒤
    
    const timeLeft = Math.floor((resetTime.getTime() - now.getTime())/1000); // 시간을 밀리초로 변환 후 뺌
    // console.log(now, midnight, timeLeft/1000/60/60);
    // console.log(`남은 시간 ${timeLeft}`)
    return timeLeft; //지정시간 - 현재시간 = 지정시간까지 남은 시간을 밀리초로 변환한 값
}

//호출 횟수 초기화
function resetCount() {
    count = 0; // 실행 횟수 0으로 초기화
    timeToReset = reSetTime();
    getMillisecondsUntilMidnight(timeToReset);
    // console.log('api 호출 횟수 초기화');
    document.getElementById('count').innerHTML = `api 호출 횟수 초기화 0/${maxCalls}`;
}

//호출횟수 제한 클로저
function callCountLimiter(maxCalls) {
    console.log("클로저 외부함수 실행~~~~~~~~~~~~~~~");
    let timeCheck = null; //타이머 선언 및 초기화
    secondsToReset = getMillisecondsUntilMidnight(timeToReset);

    // 최초 실행 시 자정까지의 시간차 이후 호출 횟수 초기화
    // 타이머 만료 시 resetCount 실행, getMillisecondsUntilMidnight() 값이 delay로 들어감
    return function() {
        console.log("클로저 내부함수 실행~~~~~~~~~~~~~~~");
        count++;
        // console.log("count => ",count);
        // console.log("maxCalls =>",maxCalls);
        
        if(count <= maxCalls) {
            console.log("if true");
            document.getElementById('count').innerHTML = `api 호출 횟수 ${count}/5`;
        } else {
            //한번 호출 후 → timeCheck가 실행되므로 한번만 호출됨
            console.log("else");
            
            timeCheck = setInterval(() => { // 타이머 실행
                console.log("setInterval 실행~~~~~~~~~~~~~~~"+ secondsToReset);
                secondsToReset -= 1; // 1초씩 감소
                console.log("1초씩 감소 중 " + secondsToReset);
                document.getElementById('count').innerHTML = `api 호출 제한 초과, ${secondsToReset}초 뒤 다시 시도해주세요`;
                
                if(secondsToReset  < 1){ // 0초가 되면
                    console.log(secondsToReset);
                    clearInterval(timeCheck); // 타이머 해제
                    resetCount(); // 호출 횟수 초기화
                    return;
                }
            }, 1000);
        };
    };
}

//클로저
const limitApiCalls = callCountLimiter(maxCalls);

//날씨 가져오기
async function getWeather() {
    try {
        const cityName = getCityName();
        const url = createWeatherUrl(cityName);
        const jsonData = await fetchCurrentWeatherData(url);
        let currentWeather = jsonData.weather[0].description;
        // console.log(cityName, url, jsonData, '성공', currentWeather);
        weather.innerHTML = currentWeather;
        limitApiCalls();
    } catch(err) {
        console.log(err);
        alert('날씨 정보를 불러오는 데 실패했습니다.');
    }
}

// function logKey(e) {
//     log.textContent += ` ${e.code}`;
// }

//검색 버튼 클릭 시 이벤트리스너
searchBtn.addEventListener('click', () => {
    clickEnterInput();
});

//인풋에 입력 후 커서 밖으로 이동 시 이벤트리스너
cityInput.addEventListener('keydown', (e) => {
    if(e.keyCode == 13){
        e.preventDefault();
        clickEnterInput();
    }
});

function clickEnterInput(){
    if(cityInput.value == '') {
        alert('도시 이름을 입력해주세요');
        cityInput.focus();
        return;
    }

    if(count <= maxCalls){
        getMillisecondsUntilMidnight(timeToReset);
        getWeather();
    } else{
        callCountLimiter(maxCalls);
    }
}

// const infoUrl = '60.196.157.219:8004/minScript'
const infoForm = document.getElementById('infoForm');
const responseDiv = document.getElementById('response');
const infoUrl = 'https://jsonplaceholder.typicode.com/posts'
infoForm.action = infoUrl;

async function answerRequest(data) {
    try {
        const response = await fetch(infoUrl, { //이 서버 주소로 요청해라
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data),//데이터를 json형태의 문자열로 변환
        })

        if (!response.ok) { //서버 연결은 됐으나, 오류 응답 반환시에 대한 에러 처리
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // fetch 요청 다음에 실행되도록 await를 사용
        const json =  await response.json();
        const jsonText = JSON.stringify(json);
        responseDiv.innerText =  `${response.status} 요청 성공\n${jsonText}`;
        return jsonText;
    } catch(err) {
        responseDiv.innerText = 'fetch 요청 실패' + err;
    };
}

//폼 데이터 추출 함수
function getFormData(form) {
    let data = {};
    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
}

//폼 제출 함수
async function submitForm(e) {
    e.preventDefault();

    try {
        const data = getFormData(infoForm);
        const result = await answerRequest(data);
        console.log('응답데이터 ' + result);
        // return result;
    } catch(err) {
        console.log('fetch 통신 에러 ' + err);
    };
};

//폼 제출 버튼 클릭 시 이벤트리스너
document.querySelector('.submit').addEventListener('click', submitForm);
