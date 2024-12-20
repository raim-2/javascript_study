/**
 * 인스턴스 메소드
 * call, apply, bind
 * call과 apply는 동작방식은 같음
 * call은 매개변수를 직접 받고, apply는 배열로 받는다.
 */

/**
 * call은 모든 함수에서 사용가능하며, this를 특정값으로 지정 가능
 * 첫번째 인수는 this로 쓰여질
 */

const mike = {
    name: 'mike'
};

const tom = {
    name: 'tom'
}

function showThisName() {
    console.log(this.name);
}

showThisName(); //여기서 this는 Window
showThisName.call(mike);
showThisName.call(tom);

function update(birth, occupation){
    this.birth = birth;
    this.occupation = occupation;
}

update.call(mike, 1999, 'singer');
console.log(mike);
update.apply(tom, [1829, 'singer']);
console.log(tom);

let minNum = Math.min(3, 10, 1, 6, 5);
let maxNum = Math.max(3, 10, 1, 6, 5);

console.log(minNum, maxNum) // 1, 10

minNum = Math.min([3, 10, 1, 6, 5]);
console.log(minNum) // NaN

let nums =[3, 10, 1, 6, 5];
minNum = Math.min(...nums);
console.log(minNum); // 1

minNum = Math.min.apply(null, nums);
maxNum = Math.max.call(null, ...nums);

console.log(minNum, maxNum); // 1, 10


/**
 * bind는 함수의 this값을 영구히 변경 가능
 */

const updateMike = update.bind(mike);
updateMike(1980, 'police');
console.log(mike);

const user ={
    name: 'tom',
    showName : function(){
        console.log(`hello ${this.name}`);
    }
};

user.showName();
let fn = user.showName;

console.log(fn);
fn.call(user);
fn.apply(user);

let boundFn = fn.bind(user);
console.log(boundFn);
boundFn();