// 생성자 함수
// 첫 글자 대문자
// new 연산자로 함수 호출

let boy = {
    name : 'mike',
    age : 20,
    sayName : function() {
        // console.log(boy.name);
        console.log(this.name);
    },
    sayThis : function() {
        console.log(this);
        //객체 호출됨
    },
    sayThis2 : () => {
        console.log(this);
        //boy가 아닌 전역객체를 나타냄
        //window를 가르킴(또는 global)
    },
}
// boy.sayName();
let boy2 = boy;
boy2.sayName();

boy = null;
// boy.sayName();
boy2.sayName();

boy2.sayThis();
boy2.sayThis2();

function User(name,age) {
    // this = {};
    this.name = name;
    this.age = age;
    this.sayName = function() {
        console.log(this.name);
        //메서드에서는 객체명을 직접 쓰기보단 this로 써주는 게 좋다.
    }
    // return this;
}

let user1 = new User('mike', 20);
let user2 = new User('Jay', 20);

console.log(user1, user2);
user1.sayName();

// >> 동작
// new 함수로 호출시 새로운 객체를 생성하고 this에 할당한다.
// 어떤 함수라도 new 연산자를 붙이면 생성자 함수처럼 작동한다. 그래서 첫글자 대문자로 쓰는게 관례

// 상품 객체 생성

function Item(title, price) {
    this.title = title;
    this.price = price;
    this.showPrice = function() {
        console.log(`가격은 ${price}`);
    }
}

let item1 = new Item('인형', 9000);
let item2 = new Item('가방', 3000);
let item3 = new Item('칫솔', 41000);

item1.showPrice();
item2.showPrice();
item3.showPrice();