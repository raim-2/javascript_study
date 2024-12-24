/**
 * async, await
 *
 * 프로미스에서 .then 메서드를 체인형식으로 연결하는 것 보다 가독성 좋아진다.
 */

async function getName() {
    // return 'mike'
    return Promise.resolve('angella');
    // throw new Error("지금은 에러 상태")
}

console.log(getName()); // Promise라고 나옴
// getName().then() 사용이 가능하다.

getName().then((name) => {
    console.log(name + '야 이름은');
});
/*
getName().catch((err) => {
    console.log(err); //Uncaught Error Error: 지금은 에러 상태
})*/

/**
 * await 함수
 * await는 async 안에서만 사용할 수 있다.
 * 프로미스를 반환하는 함수 앞에 await 붙이면, 프로미스 상태가 바뀔 때까지 코드를 기다린다.
 * -> 비동기 작업을 동기적으로 바꾸는 것
 *
 * await 오른쪽엔 프로미스가 옴
 */

function getAge(age) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(age);
        }, 1000);
    });
};

// console.time('await');
async function showAge() {
    const result = await getAge(30);
    console.log(result);
    // console.timeEnd('await');
}

// console.log('시작');
// showAge();

const f1 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('1번 주문 완료');
            // rej('error');
        }, 1000);
    });
};
const f2 = (message) => {
    console.log(message);
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('2번 주문 완료');
            // rej('에러!!!!!!!!');
            // rej(new Error('에러!!!!!'))
        }, 3000);
    });
};
const f3 = (message) => {
    console.log(message);
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('3번 주문 완료');
        }, 2000);
    });
};


/**
 * async, await문에서 성공/실패는 try-catch문으로 적어주면 됨
 * 에러 로그를 찍고 그 다음껄 진행해줌
 */

// async function order() {
//     const result1 = await f1();
//     const result2 = await f2(result1);
//     const result3 = await f3(result2);
//     console.log(result3);
//     console.log('종료');
// }

async function order() {
    try {
        // const result1 = await f1();
        // const result2 = await f2(result1);
        // const result3 = await f3(result2);
        // console.log(result3);

        //async await함수에서도 비동기함수를 병렬로 실행가능
        const result = await Promise.all([f1(), f2(), f3()]);
        console.log(result);
    } catch(e) {
        console.log(e);
    };
    console.log('종료');
}

order();

// f1()
// .then(result => f2(result))
// .then(result => f3(result))
// .then(result => console.log(result))
// .catch(console.log);