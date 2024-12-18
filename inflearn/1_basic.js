//함수작성
//매개변수가 잇는 함수

function showError(name) {
    // 지역변수 - 함수 내부에서만 사용 가능
    // 함수 밖에서 사용 원하는 경우 밖으로 뺀다.
    let msg = `hello`

    if(name) {
        // 백틱 사용
        // msg = `hello ${name}`
        msg += name;
    }
    console.log(msg)
}

showError();
showError('mike');


let age = 30;
function showAge() {
    console.log(age);

    let age =20;
}

showAge();