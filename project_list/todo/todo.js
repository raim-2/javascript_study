// todo.js

//1번 우선 생성자 이용해 - todo 생성자함수
//동일한 이름일 때 구분할 id(심볼사용)

function Todo(title, status) {
    let todo = {};
    const todoId = Symbol('title'); //심볼 생성 - 고유식별자
    this.title = title;
    this.status = status;
    this.showTodo = function() {
        // console.log(this.title, todoId, this.status);
        todo = {
            title :  title,
            [todoId] : 'myid',
            status : status,
        }

        return todo;
    }
}

let todo = new Todo('집가다 빵사기', false);
// todo.showTodo();
let a = todo.showTodo();
console.log(a)

const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');
// todoInput.addEventListener('', )
console.log(todoList)

// 로컬에 저장
// myStorage = window.localStorage;
// myStorage.setItem('name', 'yoonho');
// const name = myStorage.getItem("name");

// const weather = new Promise((resolve, reject) => {

// })


