import config from "./apikeys.js";

// 1. 인풋에 입력 -> 2. 인풋에서 value 뽑아서 -> 3. url에 넣는다.
// 4. url이 valid해지면 -> 이후 api콜을 한다.
const cityInput = document.querySelector(".city-input");
const weather = document.getElementById("weather");
const searchBtn = document.querySelector(".search-btn");
const maxCalls = 5; //최대 호출 횟수
let timeToReset = resetTime(); // 리셋까지 남은 시간(초)
let count = 0;
let isTimerRunning = false;
// const log = document.getElementById("log");

//api키 가져오기
const apiKey = config.getApiKey();

//city이름 가져오기
function getCityName() {
    return cityInput.value;
}

//리셋 타임 설정
function resetTime() {
    return 10;
}

//url 생성
function createWeatherUrl(cityName) {
    // &lang=kr
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
}

async function fetchCurrentWeatherData(apiUrl) {
    try {
        // console.log(apiUrl);
        const response = await fetch(apiUrl); //클라 -> 서버에 파일/url 등 응답해달라 요청

        if (!response.ok) {
            // fetch 요청이 성공하지 않았을 때 (200대 상태 코드가 아닐 시)
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            console.log("fetch 연결 status : " + response.status); //응답 상태 확인
        }
        //response.json() 실행을 위해서는 fetch 연결이 우선적으로 이루어져야함
        const jsonData = await response.json(); //응답 데이터 -> json 형태의 string을 객체 또는 배열형태로 변환
        return jsonData;
    } catch (err) {
        console.error("에러 정보 : " + err);
        throw new Error("HTTP 통신 에러, 다시 시도해주세요");
    }
}

//지정시간까지 남은 시간을 초로 반환하는 함수 - 남은 시간 확인
function getRemainingSeconds(time) {
    const now = new Date(); //현재 날짜+시간
    /**
     * const midnight = new Date().setHours(24, 0, 0, 0);
     * 다음날 자정 설정 시 위처럼 하면 날짜 계산에 오류 발생 가능
     * 밀리초로 반환되기 때문 → Date객체로 반환이 되어야 계산이 정확하게 됨
     */

    //new Date(year, monthIndex, day, hours) 시간 설정 방법
    //const resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); //다음날 자정
    const resetTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds() + time
    ); //10초 뒤
    
    // 지정시간 - 현재시간 = 지정시간까지 남은 시간을 밀리초로 변환 후 초로 변환한 값
    const timeLeft = Math.floor((resetTime.getTime() - now.getTime()) / 1000);
    // console.log(now, midnight, timeLeft/1000/60/60);
    console.log(`남은 시간 ${timeLeft}`);
    return timeLeft; //남은 시간(초단위)
}

//호출 횟수 초기화
function resetApiCount() {
    console.log('호출횟수 초기화 함수 실행')
    count = 0; // 실행 횟수 0으로 초기화
    document.getElementById(
        "count"
    ).innerHTML = `api 호출 횟수 초기화 ${count}/${maxCalls}`;
    isTimerRunning = false; //타이머 종료 표시
}

//호출횟수 제한 클로저
function callCountLimiter(maxCalls) {
    console.log("클로저 외부함수 실행~");
    let secondsToReset;
    let resetTimer = null;

    // 최초 실행 시 자정까지의 시간차 이후 호출 횟수 초기화
    return function () {
        console.log("클로저 내부함수 실행~");
        count++;
        // console.log("count => ",count);
        // console.log("maxCalls =>",maxCalls);

        if (count <= maxCalls) {
            console.log("if true", '타이머 실행' + isTimerRunning);
            document.getElementById(
                "count"
            ).innerHTML = `api 호출 횟수 ${count}/5`;
        } else { //count가 > maxCalls
            //한번 호출 후 → resetTimer가 실행되므로 한번만 호출됨
            console.log(isTimerRunning)
            if(!isTimerRunning) { //타이머 없을때
                console.log("else", '타이머 실행' + isTimerRunning);
                isTimerRunning = true; //타이머 실행
                secondsToReset = getRemainingSeconds(timeToReset); //남은 시간

                resetTimer = setInterval(() => {
                    console.log("setInterval 실행~" + secondsToReset);
                    secondsToReset -= 1; // 1초씩 감소
                    // console.log("1초씩 감소 중 " + secondsToReset);
                    document.getElementById(
                        "count"
                    ).innerHTML = `api 호출 제한 초과, \r\n${secondsToReset}초 뒤 다시 시도해주세요`;
    
                    if (secondsToReset < 1) {
                        // 0초가 되면
                        console.log(secondsToReset + "1초 아래");
                        clearInterval(resetTimer); // 타이머 해제
                        resetApiCount(); // 호출 횟수 초기화
                        return;
                    }
                }, 1000);
            } else {
                console.log('타이머 실행중!!!');
                return;
            }
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
        weather.innerHTML = `날씨 정보를 불러오는 데 성공했습니다.\r\n 현재 ${cityName} 날씨는 ${currentWeather} `;

        limitApiCalls(); //getWeather가 실행될때마다 외부변수인 count 기억하고 있음
    } catch (err) {
        console.log(err);
        alert("날씨 정보를 불러오는 데 실패했습니다.");
    }
}

// function logKey(e) {
//     log.textContent += ` ${e.code}`;
// }

function clickEnterInput() {
    if (cityInput.value == "") {
        alert("도시 이름을 입력해주세요");
        cityInput.focus();
    } else {
        getWeather();
    }
}

//검색 버튼 클릭 시 이벤트리스너
searchBtn.addEventListener("click", () => {
    clickEnterInput();
});

//인풋에 입력 후 커서 밖으로 이동 시 이벤트리스너
cityInput.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        e.preventDefault();
        clickEnterInput();
    }
});

// const infoUrl = '60.196.157.219:8004/minScript'
const infoForm = document.getElementById("infoForm");
const responseDiv = document.getElementById("response");
const infoUrl = "https://jsonplaceholder.typicode.com/posts";
infoForm.action = infoUrl;

async function answerRequest(data) {
    try {
        const response = await fetch(infoUrl, {
            //이 서버 주소로 요청해라
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(data), //데이터를 json형태의 문자열로 변환
        });

        if (!response.ok) {
            //서버 연결은 됐으나, 오류 응답 반환시에 대한 에러 처리
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // fetch 요청 다음에 실행되도록 await를 사용
        const json = await response.json();
        const jsonText = JSON.stringify(json);
        responseDiv.innerText = `${response.status} 요청 성공\r\n${jsonText}`;
        return jsonText;
    } catch (err) {
        responseDiv.innerText = "fetch 요청 실패" + err;
    }
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
        console.log("응답데이터 " + result);
        // return result;
    } catch (err) {
        console.log("fetch 통신 에러 " + err);
    }
}

//폼 제출 버튼 클릭 시 이벤트리스너
document.querySelector(".submit").addEventListener("click", submitForm);
