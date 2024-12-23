/**
 * Class 클래스
 *
 * 반복되는 객체 생성시, 생성자함수를 사용할 수 있다.
 * 생성자 함수 말고 다른 방법이 Class(최신문법)
 * 클래스는 생성자함수와 프로토타입 메서드를 한 곳에 정의한다.
 */

const User= function(name, age){
    this.name = name;
    this.age = age;
    // this.showName = function() {
    //     console.log(this.name);
    // };
};

User.prototype.showName = function() {
        console.log(this.name);
    };

const mike = new User('mike', 10);
// const mike = User('mike', 10);

class User2 {
    // 내부에 constructor가 있는데, 이건 객체 생성해주는 생성자 메소드
    constructor(name, age) {
        //인수 넘겨받아 초기화
        this.name = name;
        this.age = age;
    }
    //프로토타입 메서드 생성 - User2의 프로토타입에 저장됨
    showName() {
        console.log(this.name);
    }
}

const tom = new User2('tom', 19);
// const tom = User2('tom', 19);

console.log(mike, tom);
mike.showName();
tom.showName();

/**
 * 왜 클래스를 쓸까?-> 더 안전하고 직관적
 * 인스턴스 생성시, 생성자 함수는 new 메소드 없이 해도 return값이 없어 undefined 반환해 에러x
 * 클래스로 생성시, new 메소드 없이 호출될 수 없다는 에러 뜬다.
 * Class constructor User2 cannot be invoked without 'new'
 */

for(const p in mike) {
    console.log(p)
}
for(const p in tom) {
    console.log(p)
}

/**
 * 상속
 * 생성자 함수는 프로토타입을 이용해 상속을 구현했음
 * 클래스는 extends 키워드를 사용함
 */

class Car {
    constructor(color) {
        // {}
        this.color = color;
        this.wheel = 4;
    }

    drive() {
        console.log('출발해~');
    }
    stop() {
        console.log('멈춰!!!!');
    }
}

/**
 * 오버라이딩
 * 부모 클래스로부터 상속받으면서 확장하려면 ->super라는 메소드 사용
 *
 * extends에서는 먼저 super 메소드로 부모클래스 호출해야됨 -> 안하면 메러뜸
 * Must call super constructor in derived class before accessing 'this' or returning from derived constructor
 */

class Bmw extends Car {
    /**
     * 생성자 함수가 없을 때는 아래 생성자가 생략되어있음
     * constructor(...args) {
     *  super(...args);
     * }
     */
    // 있을 때는 아래처럼
    constructor(color) {
        super(color);
        this.navigation= 1;
    }
    park() {
        console.log('파킹 기능 추가')
    }
    stop() {
        super.stop();//부모꺼 상속받음
        console.log('동일한 메소드로 정의하면? 덮어쓴다! 스탑!')
    }
}

const z4 = new Bmw('pink');
console.log(z4)
z4.drive();
z4.stop();
z4.park();