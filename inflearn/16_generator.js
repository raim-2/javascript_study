/**
 * Generator
 * 함수의 실행을 중간에 멈췄다가 재개할 수 있는 기능
 * (다른 작업하다가 다시 돌아와서 next()해주면 진행 멈췄던 것이 실행됨)
 * 함수 옆에 *를 쓰고 함수 내부에 yield 키워드를 사용한다. -> 여기서 함수를 멈출 수 있다.
 *
 * function* fn() {
 *  yield 1;
 * }
 *
 * next(), return(), throw() 메소드를 갖고 있다.
 */

function* fn() {
    try {
        console.log(1);
        yield 1;
        console.log(2);
        yield 2;
        console.log(3);
        console.log(4);
        yield 3;
        return 'finish';
    } catch(e) {
        console.log(e);
    }
    
}

const a = fn();
console.log(a);
a.next(); // value =1 이게 yield 1에 있는 값, done은 함수가 끝이 났는지의 여부
a.next();

//return과 throw 메소드는 done을 true로 바꾼다.
a.return('end');
// a.throw(new Error('에러'));
a.next(); // 이미 끝나버려서 더는 값을 받지 못함

/**
 * iterable - 반복이 가능하다.
 * Symbol.iterator 메서드가 있다.
 * Symbol.iterator는 iterator를 반환해야 한다.
 *
 * iterator
 * next 메서드를 가진다.
 * next 메서드는 value와 done 속성을 가진 객체를 반환한다.
 * 작업 끝나면, done은 true가 된다.
 *
 * generator는 iterable이면서 iterator다.
 * 문자형도 가능하다.
 */

const arr = [1, 2, 3, 4, 5];
const it = arr[Symbol.iterator]();

console.log(it); // array iterator
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

function* fn2() {
    yield 4;
    yield 5;
    yield 6;
}

const b = fn2();
console.log(b[Symbol.iterator]() ===b); //true

function* fn3() {
    const num1 = yield '첫번째 숫자를 입력해';
    console.log(num1);

    const num2 = yield '두번째 숫자를 입력해';
    console.log(num2);

    return num1 + num2;
}

const c = fn3();

/**
 * 외부로부터 값을 받아올 수도 있다.
 * 값을 미리 만들어두지 않아 메모리 측면에서 효율적
 * -> 필요한 값만 그때그때 생성함 -> 필요한 순간까지 미룰 수 있다.
 */
console.log(c.next(2));
c.next(2);
console.log(c.next(4));
c.next(4);

/**
 * yield* 사용
 * yield* + 반복 가능한 모든 객체 올 수 있음음
 */

function* gen1() {
    yield 'w';
    yield 'o';
    yield 'r';
    yield 'l';
    yield 'd';
}

function* gen2() {
    yield 'hello';
    yield* gen1(); //gen1 호출
    yield '!';
}

console.log(...gen2()); //hello w o r l d !