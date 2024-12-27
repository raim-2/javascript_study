/**
 * api application programming interface
 * 한 프로그램 -> 다른 프로그램으로 데이터를 주고받기 위한 방법(코드)
 * -> 데이터를 주고 받기 위한 약속(식당에서는 메뉴판이 api)
 *
 * 1. 요청 방식 (get: 주소에 정보를 담아 보냄 / post : 숨겨서 보냄)
 * 2. 어떤 자료 요청할 지 endpoint
 * 3. 자료오청에 필요한 추가정보 - parameter
 *
 * 웹은 rest api라는 원칙에 따라 작성하면 좋다.
 * api는 public, private, partner(미리 정해둔 애만) api가 있음
 * api는 무료도 있고, 유료(/호출마다 과금이 된다)도 있다.
 */

/**
 * 프론트에서 백엔드에 요청을 보내면, 백엔드에서 응답을 함
 * 이와 같은 규칙을 api라 함
 *
 * 응답은 보통 json(자료형식)이나 xml로 전달해줌
 *
 * auth - api키가 필요하다/ 키 소지만 사용 가능
 * https - 보안 연결 제공하냐
 * cors - html 페이지 내 요청에 따른 오류 여부
 */


/**
 * 정보 요청해서 받아오는 방식 중 최근에 많이 사요하는 것 - fetch
 */

// let info = '';
// console.log(info)

/**
 * JSON.stringify
 * 자바스크립트 값이나 객체를 json 문자열로 바꿔준다.
 * JSON.parse()
 */

function replacer(key, value) {
    console.log(`Key: ${key}, Value: ${value}, Type: ${typeof value}`); // 디버깅
    if (typeof value === "string") {
        // return undefined;
        return value
    }
    // return value;
    return undefined;
}

replacer();

const user = {
    name: 'lee',
    age: 20,
    gender : 'male'
};

console.log(typeof user); //object

//string으로 바꿔준다.
const jsonString = JSON.stringify(user, replacer);
console.log(typeof jsonString, jsonString); //string {"name":"lee","age":20,"gender":"male"}

