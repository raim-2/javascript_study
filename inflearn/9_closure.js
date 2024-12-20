/**
 * closure 클로저
 * 함수와 렉시컬 환경의 조합
 * : 함수가 생성될 당시의 외부 변수를 기억하고 생성 이후에도 계속 접근 가능한 것
 * -> 실행 이후에도 외부 변수 사용가능/ 외부 함수 실행이 끝나고 변수가 메모리에 남아있다.
 * letxical 코드 작성위치 -> 변수가 어디에 선언되었는가에 따라 접근할 수 있는 범위 정해짐
 */

function outerFunction() {
    let counter= 0; //내부 함수 기준으로 외부 변수, 은닉화

    function innerFunction() {
        counter++; // 외부 변수인 counter에 접근
        console.log(counter);
    }

    return innerFunction; //내부 함수를 반환함
}

/**
 * 반환된 innerFunction이 실행되지 않은 상태로 closure에 저장
 * 외부 함수 실행되면서 렉시컬 환경이 생성됨
 */
const closure = outerFunction();

/*
closure; //는 outerFunction이 실행되고 반환된 innerFunction을 참조(함수 자체만 참조한다.)
closure(); // 이렇게 해줘야 innerFunction이 실행하고, 이 클로저 덕분에 외부 변수인 counter에 접근 가능하다.
console.log(closure()); //1, undefined(undefined는 내부함수의 리턴값이 없어서 발생한 것)
*/

closure(); //1
closure(); //2
closure(); //3

//이렇게 새로운 클로저를 생성하면, 서로 다른 환경을 참조하므로 다시 새로운 counter변수 생성됨
const closure2 = outerFunction();

closure2(); //1
closure2(); //2