// poperty key - 문자형

const obj = {
    1 : '1이구나',
    false : '거짓'
}

// key는 숫자형, 불린형도 가능
console.log(Object.keys(obj), obj);
console.log(obj['1'], obj['false'])

/**
 * symbol 형도 가능 - 유일성보장
 * 유일한 식별자를 만들 때 사용
 * 심볼은 객체에 속성을 추가할 때 고유한 키를 부여해 다른 코드와 충돌하지 않도록 할 때 많이 쓰임
 * 심볼 함수는 매번 다른 심볼값을 생성한다.
 * new 연산자 사용 x
 */

const a  = Symbol();
const b  = Symbol();
const id  = Symbol('id');
const id2  = Symbol('id2');
//심볼 안에 문자열은 디버깅이나 로깅에 사용되는 설명일뿐

console.log(a,b, a==b, a===b)
console.log(id, id2, id===id2) //Symbol(id) Symbol(id2)

const user = {
    name : 'a',
    age : 10,
    [id] : 'myid'
}

console.log(user) //{ name: 'a', age: 10, [Symbol(id)]: 'myid' }
// 객체의 메소드를 사용할 때는 심볼형 프로퍼티는 나오지 않음

//Symbol.for() 전역 심볼
/**
 * 하나의 심볼만 보장받음
 * 일반 심볼함수는 매번 다른 값을 생성하나 전역 심볼은 하나 생성하고 키를 통해 같은 심볼 공유함
 * 코드 어디서든 사용가능
 */
const id3  = Symbol.for('id');
const id4  = Symbol.for('id');

console.log(id3, id4, id3===id4) // true

// 이름을 얻으려면 Symbol.keyFor(id3)
console.log(Symbol.keyFor(id3)); //id

//전역 심볼 아니면 변수.description으로 알수 있다.
console.log(id2.description); //id2

// 아래 메서드들은 잘 사용안함!!
//숨겨진 심볼 키 보는법
let getSymbol = Object.getOwnPropertySymbols(user);
console.log(getSymbol); //[Symbol(id)]

// 객체의 모든 키를 보려면
Reflect.ownKeys(user);

//예시
//다른 개발자가 만들어 놓은 객체

const boy = {
    name: 'mike',
    age: 10
};

// 내가 작업
// boy.showName= function() {}; //이렇게 되면 아래 메세지에서 보임
// 다른 사람이 만들어놓은 메소드나 프로퍼티를 덮어쓸 필요 없이 작업 가능하다
const showName = Symbol('show name');
boy[showName] = function() {
    console.log(this.name);
}

// 밑에 메세지에선 보이지않음
boy[showName] ();

//사용자가 접속시 보이는 메세지
for(let key in boy) {
    console.log(`his ${key} is ${boy[key]}`);
}