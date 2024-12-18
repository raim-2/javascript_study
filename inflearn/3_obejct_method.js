//computed property 연산 프로퍼티
let a = 'age';

const user = {
    [a] : 20,
    [1+4] : 5, //계산식도 된다.
}
console.log(user)

/**
Object.assing(); // 객체 복제 - 깊은복사
Object.keys(); // 키 배열 반환
Object.values(); // 값 배열 반환
Object.entires(); // 키와 값 모두 배열로 반환
Object.fromEntries(); // entries()와 반대로 키/값으로 묶인 배열을 -> 객체로 만들어줌
Object.assing();*/

//객체 복사

const boy = {
    name : 'mike',
    age : 30
}

const cloneUser = boy;
cloneUser.name = 'tom'
console.log(boy.name, cloneUser.name)
//객체 자체가 복제되는 게 아니라 참조되는 것
//하나의 객체에 두 변수가 접근하고 있는 것

// 첫번째 매개변수는 초기값, 두번째부터 들어오는 객체들이 초기값이 병합됨
const newBoy = Object.assign({}, user);
const newBoy2 = Object.assign({'hobby': 'soccer'}, user);
newBoy.name ='bob';
console.log(newBoy, boy.name, newBoy.name, newBoy2)

// boy != newBoy 같은 객체가 아니다

let keyArray = Object.keys(newBoy);
let valueArray = Object.values(newBoy);
let all = Object.entries(newBoy);
let goObject = Object.fromEntries(all);

console.log(keyArray, valueArray, all, goObject) // 해당 객체의 키를 배열로 만들어 반환한다.
