//array 메소드

// arr.splice(n,m) 특정요소 지워줌, n은 시작점 m은 개수
let arr = [1,2,3,4,5];
console.log(arr)
arr.splice(2,1);
console.log(arr) // [1,2,4,5]

let result = arr.splice(2,1);
//변수로 담아주면, 삭제된 요소를 반환한다.
console.log(result)

// arr.splice(n,m,x) 특정요소 지우고 x추가
// arr.splice(2,0,3);
// console.log(arr);

// arr.concat(arr2,arr3) 합쳐서 새배열 반환
let arr2 = [1,2]
let a = arr2.concat([3,4], [5,6]);
let b = arr2.concat([3,4],5,6);
console.log(a,b);

/**
 * arr.indexOf , arr.lastIndexOf
 * 배열에 indexOf는 해당 매개변수의 index를 반환함
 */

let arr3 = [1,3,4,5,6,1]
console.log(arr3.indexOf(1,1));

// arr.includes는 동일 - 인덱스없이 여부만 파악

/**
 * arr.find(fn)
 * arr.findIndex(fn) //없으면 -1반환환
 *
 * 첫번째 true값만 반환 + 없으면 undefined반환
 */

let reuslt2 = arr3.find((item) => {
    return item % 2 ===0;
});

console.log(reuslt2);

let userList = [
    {name: 'a', age: 10},
    {name: 'b', age: 20},
    {name: 'c', age: 15},
];

console.log(userList[0].age)
const underage = userList.findIndex((user)=> {
    if(user.age < 20) {
        return true
    }
    
    return false;
})

console.log(underage);


/**
 * arr.filter(fn) //해당하는 모든 요소를 배열로 반환함
 * 역순정렬은 arr.reverse()
 */
reuslt2 = arr3.filter((item) => {
    return item % 2 ===0;
});

console.log(reuslt2);

/**
 * ⭐실무에서 자주 사용된다!
 * arr.map(fn)
 * 함수를 받아 특정기능 시행 후 새로운 배열로 반환
 */

let newUserList = userList.map((user, index) => {
    return Object.assign({}, user, {
        isAdult : user.age > 19
    });
});

console.log(newUserList);

let arr1 = [2,4,6]
//단독으로는 사용 x 배열을 앞에 붙여준다.
//파라미터 2개까지 가능
let c = arr1.map((a,i) => {
    //안에 있는 코드 반복 실행해줌, 배열 내부 요소만큼
    //a는 배열 내부 요소, i는 반복실행될 때마다 0부터 시작하는 인덱스
    // console.log('안녕' + a + i);
    return 10;
});

arr1.map((a,i) => {
    console.log('안녕' + a + i);
})
console.log(c);

let result3= arr1.join("-");
console.log(result3);
// 문자열을잘라서 배열로 반환
result3 = result3.split("-");
console.log(result3);

// Array.isArray() 배열인지 확인
console.log(Array.isArray(arr1));

/**
 * arr.sort() 배열 재정렬해줌
 * 주의! 배열 자체가 변경이 된다!
 * 정렬에러를 막기 위해, 인수로 정렬 로직을 담은 함수를 받아 처리한다.
 * arr.sort(fn)
 */


let array  = [1,5,2,3,4];
console.log(array.sort(), array);

let array2 = [25, 3, 15, 7];
// array2.sort();
console.log(array2); //[ 15, 25, 3, 7 ] -> 앞에 숫자에 맞춰서 정렬을 해버리는 문제 발생

array2.sort(function(a,b) {
    console.log(a,b);
    return a-b
    /**
     * a - b를 하면, 양수일때 0일때 음수일때가 나옴
     * 이 결과를 가지고, 정렬함
     */
})

console.log(array2); //[ 3, 7, 15, 25] -> 앞에 숫자에 맞춰서 정렬을 해버리는 문제 발생

// 이런 배열처리를 편하게 하기위해 Lodash와 같은 라이브러리를 사용한다.
// https://lodash.com

/**
 * arr.reduce()
 * 인수로 함수를 받음
 * (누적 계산값, 현재값) => {return 계산값};
 *
 * arr.reduce((누적값, 현재값)=> {
 * }, 초기값)
 *
 * 초기값은 옵션, 초기값이 없으면, 누적값은 인덱스 0, 현재값은 인덱스1의 값이다.
 * 결과값은 리턴해줘야 한다. -> 반환문이 없으면 undefined 반환됨
 */

//배열의 모든 수를 합칠 때
let array3 = [1,2,3,4,5];

//for, for of, forEach
/*
let result4= 0;
array3.forEach((num) =>{
    // result4 = result4 + num;
    result4 += num;
});*/
const result4= array3.reduce((prev, cur)=> {
    console.log(prev,cur,prev+cur)
    return prev + cur;
}, 0);
const result5= array3.reduce((prev, cur)=> {
    console.log(prev,cur,prev+cur)
    return prev + cur;
});

console.log(result4, result5);

// 예제
let userList2 = [
    {name: 'a', age: 10},
    {name: 'b', age: 20},
    {name: 'c', age: 15},
    {name: 'd', age: 5},
    {name: 'e', age: 25},
    {name: 'f', age: 3},
];

let reuslt6;
reuslt6 = userList2.reduce((prev, cur)=> {
    if(cur.age > 19) {
        prev.push(cur.name);
    }

    return prev;
}, [])

// 나이의 합
reuslt6 = userList2.reduce((prev, cur)=> {
    // return prev + cur.age;  이게 더 가독성이좋으려나?
    prev += cur.age;
    return prev;
}, 0)
console.log(reuslt6);


