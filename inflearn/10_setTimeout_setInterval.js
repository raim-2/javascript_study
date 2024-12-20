/**
 * setTimeout 일정 시간 지난 후 함수 실행
 * setTimeout(실행할 함수, 시간, 매개변수)
 * setInterval 일정 시간 간견으로 함수 반복
 */

function fn(msg) {
    console.log(3, msg);
}

let a = setTimeout(fn, 3000, '졸린 시간입니다3');

/**
 * clearTimeout(tId) settimeout을 종료시킴 -> 아무일도 안일어남
*/
clearTimeout(a);

let b = setInterval(fn, 3000, '졸린 시간입니다1');
clearInterval(b);

/**
 * 브라우저는 4ms정도의 딜레이 시간있음
 * delay = 0이어도 4ms 이상 들 수 도 있다.
 */

let num = 0;
function showTime() {
    console.log(`${num++}`);

    if(num > 10){
        clearInterval(c);
    }
}

let c = setInterval(showTime, 1000);