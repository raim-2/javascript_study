//상속 prototype

const user = {
    name: 'mike',

    // 객체의 프로퍼티가 객체안에 메소드로 있는 경우
    // hasOwnProperty: function() {
    //     console.log('hahahahah')
    // }
}

console.log(user.name)
// user에 검색해보면, 프로퍼티로 들어가있는
console.log(user)
console.log(user.hasOwnProperty('name'), user.hasOwnProperty('age'));//true, false

/**
 * 객체내에 프로퍼티가 있으면 -> 탐색을 멈춘다.
 * 없을 때만 프로퍼티에서 찾는다.
 */
//
console.log(user.hasOwnProperty('name'), user.hasOwnProperty('age')); // hahahahah hahahahah

/**
 * 현재 wheels와 drive() 가 공통으로 갖고 있음
 * -> 공통적인 부분을 어떻게 처리할 것인가?
 */

// const bmw = {
//     color: 'red',
//     wheels: 4,
//     navigation: 1,
//     drive() {
//         console.log('드라이브가즈아~');
//     }
// }
// const bmw = {
//     color: 'black',
//     wheels: 4,
//     drive() {
//         console.log('드라이브가즈아~');
//     }
// }
// const bmw = {
//     color: 'blue',
//     wheels: 4,
//     drive() {
//         console.log('드라이브가즈아~');
//     }
// }


/**
 * 1. 프로토타입 - 상속을 이용한다.
 * 상속받을 변수.__proto__ = 상속할 변수
 *
 * 상속은 계속 이어질 수 있다. 프로토타입  체인
 */

const car = {
    wheels: 4,
    drive() {
        console.log('드라이브 가즈아아')
    },
}

const bmw = {
    color: 'red',
    navigation: 1,
}
const benz = {
    color: 'black',
}
const audi = {
    color: 'blue',
}

bmw.__proto__  = car;
benz.__proto__  = car;
audi.__proto__  = car;

// 1) 일단은 bmw 내부에서 프로퍼티를 찾는다.있으면 여기서 멈추고
console.log(bmw, benz, audi); //{ color: 'red', navigation: 1 } { color: 'black' } { color: 'blue' }
// 2) 없으면 프로토타입에서 확인
console.log(bmw.wheels); //4

const x5 = {
    color: 'white',
    name: 'x5',
}

x5.__proto__ = bmw;
console.log(x5.wheels, x5.navigation); //4 1

for(p in x5) {
    if(x5.hasOwnProperty(p)) {
        console.log('o', p);
    } else {
        console.log('x', p);
    }
}

/**
 * 생성자 함수?
 */

// function Car(color, wheels = 4, naviagtion) {
//     this.color = color;
//     this.wheels = wheels;
//     this.navigation = naviagtion;
//     this.drive = function() {
//         console.log('드라이브 가즈아아');
//     };
// }

// const bmw = new Car('red', 4, 1);
// const benz = new Car('black');
// const audi = new Car('blue');

// bmw.drive();
// benz.drive();
// audi.drive();

// console.log(bmw.wheels, benz.wheels, audi.wheels)

//2. 생성자 함수로 처리
const car2 =  {
    wheels  : 4,
    drive() {
        console.log('드라이브 가즈아아');
    },
}

const Bmw = function (color) {
    this.color = color;
};

//매번 이렇게 하면 생성하는 변수에 전부 적용해야되서 번거롭기 때문에 이런식 말고 3번처럼
// const x6 = new Bmw('red');
// const z4 = new Bmw('black');

// x6.__proto__ = car2;
// z4.__proto__ = car2;

// 3. prototype 생성자함수가 생성하는 객체에 프로토타입을 아래처럼 설정한다는 뜻.
/*
Bmw.prototype.wheels = 4;
Bmw.prototype.drive = function () {
    console.log('드라이브 좀 가자');
};
Bmw.prototype.navigation = 1;
Bmw.prototype.stop = function () {
    console.log('멈춰!!!!');
};*/


/**
 * 4. 이렇게 바꿀 수도 있다.
 * 그러나 이렇게 하면 z4.constructor === Bmw 가 false로 constructor가 사라짐.
 * 그래서 위에 방법으로 하거나, 직접 수동으로 construtor : Bmw를 넣어줌
 */
Bmw.prototype ={
    // node환경에서는 새로운 프로토타입 생성으로 false나오는데, 콘솔창 내에서 진행시 true- node가 더 엄격하게 처리하기 때문에
    construtor: Bmw,
    wheels: 4,
    drive() {
        console.log('드라이브 좀 가자');
    },
    navigation: 1,
    stop() {
        console.log('멈춰!!!!');
    },
}

const x6 = new Bmw('red');
const z4 = new Bmw('black');

console.log(z4.wheels);
x6.drive();
z4.stop();

/**
 * instanceof 객체와 생성자 비교할 수 있음
 * A instanceof B B를 이용해 A 만들었는지 확인 -> true/false로 대답
 */

console.log(z4 instanceof Bmw);
console.log(z4.constructor === Bmw) //3번처럼 하면 true, 4번이면 false

const Avante = function(color) {
    this.color = color;
};

const md = new Avante('blue');

console.log(md);
md.color = 'pink';
console.log(md);

/**
 * 이렇게 되면, 맘대로 다른 사람이 변경할 수 있으니 -->> 클로저 사용
 */

const Avante2 = function(color) {
    const c = color; //재할당 불가, 외부에서도 접근 안된다.
    this.getColor = function() {
        console.log(c);
    };

    return this.getColor;
};

const closure = new Avante2('blue');  // 생성자 호출, color에 'blue' 저장
closure();
// console.log(closure().c)