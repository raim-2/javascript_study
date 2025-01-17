import config from "./apikeys.js";

// 1. 인풋에 입력 -> 2. 인풋에서 value 뽑아서 -> 3. url에 넣는다.
// 4. url이 valid해지면 -> 이후 api콜을 한다.
const cityInput = document.querySelector('.city-input');
const weather = document.getElementById('weather');
const searchBtn = document.querySelector('.search-btn');
let timeToReset = reSetTime(); // 리셋까지 남은 시간(초)
let count = 0;
const maxCalls = 5;
// const log = document.getElementById("log");

//api키 가져오기
const apiKey = config.getApiKey();

//city이름 가져오기
function getCityName() {
    return cityInput.value;
}

//url 생성
function createWeatherUrl(cityName) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=kr&appid=${apiKey}`
}

async function getWeatherData(url) {
    try {
        console.log(url)
        const response = await fetch(url);
        console.log('fetch 연결 status : ' + response.status); //응답 상태 확인
        const jsonData = await response.json();
        return jsonData;
    } catch(err) {
        console.log('fetch 통신 에러!!!!!!!!');
        throw new Error;
    };
}

// const member = (data) =>{
//     return fetch(`url`,{
//         method: 'POST',
//         // headers:{
//         //     'Content-Type':'application/json'
//         // },
//         body: JSON.stringify({
//             'memberId': 'sss',
//             'age':20
//         })
//     })
// }


// const feexx = (data) =>{
//     return fetch(`url/${data}`,{
//         method: 'GET'
//     })
// }

// const infoUrl = '60.196.157.219:8004/minScript'
const infoForm = document.getElementById('infoForm');
const responseDiv = document.getElementById('response');

const infoUrl = 'https://jsonplaceholder.typicode.com/posts'
infoForm.action = infoUrl;

function answerRequest(data) {
    return fetch(infoUrl,{ //이 서버 주소로 요청해라
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        // mode: "no-cors",
        body: JSON.stringify(data),
        // body: JSON.stringify({
        //     "userId" : "asd",
        //     "title" : "sdfksjldfksdf",
        //     "body" : "sdfksjldfksdfsdflksdfj;ksdf;slkdf;lk"
        // }) //데이터를 json형태의 문자열로 변환
    }).then((res) => { //응답이 오면
        responseDiv.innerText = res.status + ' 요청 성공';
        return res.json();
    }).then((json) => {
        console.log(json);
        let jsonText = JSON.stringify(json);
        responseDiv.innerText += '\n' + jsonText;
        return jsonText;
    }).catch((err) => {
        console.log(err);
        responseDiv.innerText = '요청 실패';
    });
}

document.querySelector('.submit').addEventListener('click', (e) => {
    e.preventDefault();
    // answerRequest(member);

    async function getMember() {
        try {
            let formdata = new FormData(infoForm);
            let data = {};
            
            // 폼데이터 키/값 확인
            for (const [key, value] of formdata.entries()) {
                console.log(`${key}: ${value}`);
                data[key] = value;
                // console.log(data);
            }
            const result = await answerRequest(data);
            console.log('응답데이터 :' + result);
            return result;
        } catch(err) {
            console.log('fetch 통신 에러 ' + err)
        };
    };

    getMember();
});

function reSetTime(){
    return 10;
}

//호출횟수 제한 클로저
function callCountLimiter(maxCalls) {
    console.log("실행~~~~~~~~~~~~~~~");
    let timeoutId;
    let timeCheck;

    //호출 횟수 초기화
    function resetCount() {
        count = 0;
        timeToReset = reSetTime();
        // console.log('api 호출 횟수 초기화');
        document.getElementById('count').innerHTML = `api 호출 횟수 초기화 0/${maxCalls}`;
    }

    //자정(혹 지정시간)까지 남은 시간을 밀리초로 반환하는 함수
    function getMillisecondsUntilMidnight(timeToReset) {
        const now = new Date(); //현재 날짜+시간
        /*
        이렇게 하면 날짜 계산에 오류 발생 가능
        const midnight = new Date().setHours(24, 0, 0, 0); //다음날 자정
        → Date객체로 반환이 되어야 계산이 정확하게 됨
        */

        //new Date(year, monthIndex, day, hours);
        const afterDelay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds() + timeToReset); //5초 뒤
        //const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0); //다음날 자정
        let timeLeft = afterDelay.getTime() - now.getTime();
        console.log(timeLeft/1000/60/60);
        return afterDelay.getTime() - now.getTime(); //지정시간 - 현재시간 = 지정시간까지 남은 시간을 밀리초로 변환한 값
    }

    // 최초 실행 시 자정까지의 시간차 이후 호출 횟수 초기화
    // 타이머 만료 시 resetCount 실행, getMillisecondsUntilMidnight() 값이 delay로 들어감

    return function() {
        count++;
        console.log("count => ",count);
        console.log("maxCalls =>",maxCalls);
        if(count <= maxCalls) {
            console.log("if true");
            // console.log(`api 호출 횟수 ${count}/5`);
            document.getElementById('count').innerHTML = `api 호출 횟수 ${count}/5`;
        } else {
            console.log("else");
            // console.log('api 호출 제한 초과, 30초 뒤 다시 시도해주세요');
            //timeoutId = setTimeout(resetCount, getMillisecondsUntilMidnight(timeToReset));
            timeCheck = setInterval(() => {
                timeToReset -= 1;
                document.getElementById('count').innerHTML = `api 호출 제한 초과, ${timeToReset}초 뒤 다시 시도해주세요`;
                if(timeToReset  < 1){
                    console.log(timeToReset)
                    clearInterval(timeCheck);
                    resetCount();
                    return;
                }
            }, 1000);
            //throw new Error;
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
        const jsonData = await getWeatherData(url);
        let currentWeather = jsonData.weather[0].description;

        console.log(cityName, url, jsonData, '성공', currentWeather);
        weather.innerHTML = currentWeather;
        limitApiCalls();
        
    } catch(err) {
        console.log('날씨 정보를 불러오는 데 실패했습니다.');
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
    // if(infoForm.checkValidity()) {
        
    // }


    if(cityInput.value == '') {
        alert('도시 이름을 입력해주세요');
        cityInput.focus();
        return;
    } else if(count <= maxCalls){
        getWeather();
    } else{
        callCountLimiter(maxCalls);
    }

    
}


