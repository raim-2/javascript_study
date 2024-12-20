/**
 * destructing assignment 구조 분해 할당
 * 배열이나 객체의 속성을 분해해 그 값을 변수에 담을 수 있게 하는 표현식
 */

// 1) 배열 구조 분해
let a,b,rest;
[a, b]=[10, 20];
[a, b, ...rest]= [10, 20, "c", "d", 30, 40];
console.log(rest);

let users =["a", "b", "c"];
let [user1, user2, user3, user4=5] = users;
/**
 * 아래 식과 같은 의미이다.
 * let user1 = users[0];
 * let user2 = users[1];
 * let user3 = users[2];
 * 해당 부분의 값이 없을때는 undefined가 들어간다. 기본값을 주면 해결 가능
 */

console.log(user1, user2, user3,user4);

let str ="a-b-c";
[user1, user2, user3] = str.split("-");
console.log(user1, user2, user3);

let [user5, ,user6] = ["a", "b", "c"];
console.log(user5, user6); // a,c로 공백부분에 해당하는 값은 무시한다.

// 배열 구조 분해
console.log(a, b); //10,20
[a, b] = [b, a];
console.log(a, b); //20,10

//객체 구조 분해 -> 순서 신경 안써도 됨
let user = {name: 'Mike', age: 30};
// let {name, age} = user;
let {age, name} = user;
console.log(name, age);
/**
 * let name = user.name;
 * let age = user.age;
 *
 * 프로퍼티 이름도 변경 가능하다.
 * 얘도 기본값을 줄 수 있다.
 */

let {age: userAge, name: userName} = user;
console.log(userAge, userName);

/**
 * 인수전달 - arguments와 나머지 매개변수를 이용해
 * ES6 호환 코드를 작성 중이라면 되도록 나머지 매개변수 구문을 사용해야 함
 */

/**
 * arguments
 *
 * 함수로 넘어 온 모든 인수에 접근
 * 함수 내에서 이용가능한 지역변수
 * length, index 사용가능
 * 배열 형태의 객체이다.그러나 내장 메서드는 가지고 있지 않음
 */

function showName(name) {
    console.log(arguments.length);
    console.log(arguments[0]);
    console.log(arguments[1]);
}

showName('mk','da');

/**
 * 나머지 매개변수
 *
 * function showName(...names) {}
 */

function showName2(...names) {
    console.log(names);
}

showName2();// 아무것도 전달 안할 때는 빈 배열
showName2('a');
showName2('a', 'b');

/**
 * 예시
 * 전달 받은 모든 수를 더해야 함
 */

function add (...numbers) {
    /*
    let total = 0;
    console.log(numbers); //object - 배열형태
    numbers.forEach((number) => {
        total += number;
        // console.log(number, total);
    })
    console.log(total);
    // return total;*/

    let result = numbers.reduce((prev, cur)=> {
        console.log(prev, cur, prev+cur);
        // return을 해줘야 값 반환된다!!! reduce는!!!
        return prev + cur;
    })
    console.log(result);
}

add(1,2,3); //6
add(1,2,3,4,5,6,7,8,9,10); //55

/**
 * boy객체를 만들어주는 생성자 함수를 만들자
 * 나머지 매개변수는 항상 마지막에 있어야함
 */


function Boy(name, age, ...skills) {
    this.name = name;
    this.age = age;
    this.skills = skills;
}

const boy = new Boy('mk', 10,'html', 'css');
const boy2 = new Boy('da', 5,'html', 'react');
console.log(boy, boy2);

/**
 * 전개구문 spread syntax배열
 */

let arr1 = [1,2,3];
let arr2 = [4,5,6];
//let arr2 = [3,5,6]; // 이 경우 [1,2,3,3,5,6]

// let result =[];
// let result = [...arr1, ...arr2];
let result = [...arr2, ...arr1];
console.log(result); //[1,2,3,4,5,6]
result = [0, ...arr1, ...arr2, 7];  //중간에 껴도 상관없다.
console.log(result);

//전개 구문의 복제시 서로 영향 안줌
let girl = {name: 'mia', age:10};
let girl2= {...girl};

girl.name = 'stacy'
console.log(girl, girl2, girl == girl2); //false
console.log(girl.name, girl2.name); //stacy mia

/**
 * 예시
 * arr1을 [4,5,6,1,2,3]으로
 */

arr2.reverse().forEach((num)=>{
    arr1.unshift(num);
});

console.log(arr1);

//예시2
let pageUser = {name: 'Mike'};
let info ={age: 30};
let fe = ['js', 'react'];
let lang = ['korean', 'english'];

// pageUser = Object.assign({},
//     pageUser,
//     info,
//     {
//         skills :[]
//     }
// )

// fe.forEach(item => {
//     pageUser.skills.push(item);
// });
// lang.forEach(item => {
//     pageUser.skills.push(item);
// });

pageUser = {
    ...user,
    ...info,
    skills: [...fe, ...lang],
};

console.log(pageUser);