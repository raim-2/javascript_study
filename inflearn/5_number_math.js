//number, Math 객체

// toString();
// 10진수를 매개변수에 쓰여진 진수로 바꿔줌 -> 2진수 / 16진수

let num = 10;
console.log(num.toString(2), num.toString(16), num.toString(8));

// Math
/**
 * [소수점 자릿수]
 * 요구사항: 소수점 둘째자리까지 표현(셋째자리에서 반올림림)
 */

let userRate = 30.1234;
//1. 100을 곱하고 반올림을 해준뒤 다시 100으로 나눠주면 됨

console.log(Math.round(userRate*100) / 100);

userRate = 30.1256
/**
 * 2. toFixed()를 사용한다.
 * toFixed()를 사용하면, string으로 반환하기 때문에 Number()을 이용해 숫자로 바꿔준다.
 */
//2. toFixed()를 사용한다.
console.log(userRate.toFixed()); //소수점 모두 제거
console.log(userRate.toFixed(2)); //두번째 자리에서 반올림
console.log(userRate.toFixed(5)); //소수점이 4개일때 넘어가는 부분엔 0을 붙여줌

console.log(typeof userRate.toFixed(), typeof Number(userRate.toFixed())); //string number

/**
 * [랜덤 숫자 / 난수 구하기]
 * Math.random()
 * 요구사항: 1~ 100 사이에서 랜덤으로 숫자 뽑기
 */
console.log(Math.random()*100); //100개의 숫자가 랜덤으로 나옴
console.log(Math.floor(Math.random()*100)); //소수점이하 버림
console.log(Math.floor(Math.random()*100))+1; // 0부터가 아니라 1이기때문에 최솟값 1더해줌줌


/**
 * isNaN() 숫자여부 확인
 * NaN == NaN false
 *
 * pareInt() 문자열 인자 파싱해 숫자로 반환
 * 읽을 수 있는곳까지 읽다가 문자를 만나면 숫자반환
 * 문자가 섞여있어도 동작을 한다.
 *
 * 그래서 -> 첫 시작이 문자면 NaN이 나옴
 *
 * 두번째 매개변수는 진수를 바꿔줌
 * parseInt(string, radix);
 */

let margin = '10px';
console.log(parseInt(margin)); //10

let color = 'f3';
console.log(parseInt(color)); //NaN