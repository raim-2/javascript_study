//string

let desc = '안녕하세요';
console.log(desc[2]); //하
//접근은 가능하나, 배열과 다르게 한글자 변환은 안됨
desc[2] = '용';
console.log(desc); //변화x

/**
 * str.indexOf(text)
 * 해당 텍스트가 있는지 확인
 * 0부터 시작, 없으면 -1 출력
 * 여러개 있어도 첫번째꺼만 반환함
 *
 * 그래서 있는지 여부 확인 시 -1보다 큰가로 비교하면 됨
 */

/**
 * str.slice(n,m)
 * n은 포함, m은 미포함
 * 문자열 추출해 새로운 문자열로 반환 - 원본은 그대로
 * n,m에 음수가 들어갈 경우엔 시작인덱스를 역방향에서부터 확인함
 */

let str = '얼른 퇴근하고싶다 집가고싶다 제발요 플리즈!!'
let str2 = str.slice(3,9);
let str3 = str.slice(-10,-15); //아무것도 추출x start는 항상 end보다 작아야됨
str3 = str.slice(-15, -10);
console.log(str3);

/**
 * str.substring(n,m)
 * 음수 x - 0으로인식
 * n,m 바꿔도 동작 - n과 m사이로 보면됨
 */

/**
 * str.substr(n,m)
 * n부터 시작해 m개 가져옴
 */

//알파벳은 A보다 Z가 크고, 소문자 a가 A보다 크다
//예시

let list = [
    "01. 들어가며",
    "02. js의역사",
    "03. 자료형",
    "04. 변수",
    "05. 배열",
]
console.log(list.length)
let newList = [];
for(let i = 0; i< list.length; i++) {
    // newList[i] = list[i].slice(4);
    newList.push(
        list[i].slice(4)
    );
}
console.log(newList);

//금칙어 : 콜라
function hasCola(str) {
    if(str.indexOf('콜라') > -1) {
        console.log('금칙어 있음',str.indexOf('콜라'));
    } else {
        console.log('통과', str.indexOf('콜라'));
    }
}

hasCola('사이다가 짱이야!');
hasCola('콜라');

//인덱스 없이, 문자 여부만 확인시엔 includes
//문자 있으면 true,없으면 false 반환

function hasCola2(str) {
    if(str.includes('콜라')) {
        console.log('금칙어 있음',str.includes('콜라'));
    } else {
        console.log('통과', str.includes('콜라'));
    }
}

hasCola2('사이다가 짱이야!');
hasCola2('콜라');