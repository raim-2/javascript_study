/**
 * promise 프로미스
 *
 * 작업을 요청했을 시, 작업이 완료된 결과를 알려주는 것
 * ex) 계속 되었나 결과 확인하는것보다 완료되면(성공인지 실패인지) 전화달라고 전화번호(전화를 주는 행위-콜백함수) 남기는 게 낫다.
 * 정확하게는 비동기 작업의 최종 결과를 나타내는 객체.
 * new Promise로 생성해준다. - 반환하는 객체는 state, result를 프로퍼티로 갖음
 *
 * 인수로는 resolve와 reject를 받고, 순서대로 성공/실패했을 때 실행되는 함수(콜백함수)이다.
 */

const pr = new Promise((resolve, reject)=> {
    //pending이였다가 -> 3초 뒤 fullfiled로 바뀜
    setTimeout(() => {
        resolve('ok'); //result
    }, 3000);
});

// const pr = new Promise((resolve, reject)=> {
//     //pending이였다가 -> 3초 뒤 rejected로 바뀜
//     setTimeout(() => {
//         reject(new Error('error...'));  //result
//     }, 3000);
// });

/**
 * then을 이용해 resolve인지 reject인지 처리할 수 있다.
 * then 대신에 catch와 finally
 * catch는 reject될때만 사용가능능
 */

pr.then(
    function(result){}, //이행 되었을 때
    function(err){} //거부 되었을 때
);

//이게 더 가독성이 좋다.
pr.then(
    function(result){}
).catch(
    function(error){}
).finally(
    function() {
        //이행이든 거부든 끝났을 때 처리
        // console.log('주문 끝');
    }
)

// 예시)
const pr2 = new Promise((resolve, reject)=> {
    setTimeout(() => {
        //resolve('ok'); //result
        reject(new Error('에러!!!!!!!!!!'));
    }, 1000);
});

console.log('시작');
pr2.then(result => {
    console.log(result);
})
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        console.log('끝');
    })


console.log('시작');
const f1 =(callback) => {
    setTimeout(() => {
        console.log('1번 주문 완료')
        callback();
    }, 1000);
};
const f2 =(callback) => {
    setTimeout(() => {
        console.log('2번 주문 완료')
        callback();
    }, 3000);
};
const f3 =(callback) => {
    setTimeout(() => {
        console.log('3번 주문 완료')
        callback();
    }, 2000);
};

/**
 * 콜백함수를 사용해 처리하면, 이런 식으로 점차 콜백함수가 쌓인다. -> 콜백지옥이라 함
 * 가독성이 떨어짐
 */

f1(function(){
    f2(function(){
        f3(function(){
            console.log('끝!!!!!!!!!!')
        });
    });
});

const f4 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('4번 주문 완료');
            // rej('error');
        }, 1000);
    });
};
const f5 = (message) => {
    console.log(message);
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('5번 주문 완료');
            // rej('에러!!!!!!!!');
        }, 3000);
    });
};
const f6 = (message) => {
    console.log(message);
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('6번 주문 완료');
        }, 2000);
    });
};


//프로미스 체이닝
setTimeout(() => {
    console.time('f4시작');
}, 1000);
f4()
.then(result => f5(result))
.then(result => f6(result))
.then(result => console.log(result))
.catch(console.log)
.finally(()=> {
    // console.log('끝')
    console.timeEnd('f4시작')
})

/**
 * Promise.all
 * 배열로 받는다.-> 4,5,6 모두 실행되야 뜸
 * 다 보여주거나, 다 안보여주거나 밖에 안됨
 */

console.time('x') //time()로 시간잴 수 있다.
Promise.all([f4(), f5(), f6()]).then((result) => {
    console.log(result);
    console.timeEnd('x');
})