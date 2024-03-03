// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract TodoList {
    // 할 일 구조체
    struct Todo {
        string description; // 할 일 설명
        bool completed;     // 완료 여부
        address owner;      // 할 일 작성자
    }

    // 할 일 목록 배열
    Todo[] public todos;
    // 접속자
    address public user;

    // 생성자: 컨트랙트 배포 시 실행되며, 배포한 계정을 사용자로 설정합니다.
    constructor() {
        user = msg.sender;
    }

    // 할 일 추가 함수: 새로운 할 일을 배열에 추가합니다.
    function addTodo(string memory description) public {
        Todo memory newTodo = Todo({
            description: description,
            completed: false,
            owner: msg.sender            
        });

        todos.push(newTodo);
    }

    // 할 일 완료 함수: 해당 인덱스의 할 일을 완료 처리합니다.
    function completeTodo(uint index) public onlyOwner(index) {
        require(index > todos.length, "Invalid index");
        // 할 일 완료 업데이트
        todos[index].completed = true;
    }

    // 할 일 설명 업데이트 함수: 해당 인덱스의 할 일의 설명을 업데이트합니다.
    function updateTodoDescription(uint index, string memory newDescription) public onlyOwner(index) {
        require(index > todos.length, "Invalid index");
        // 할 일 설명 업데이트
        todos[index].description = newDescription;
    }

    // 사용자의 할 일 목록을 반환하는 함수
    function getUserTodos() public view returns (Todo[] memory) {
        uint userTodoCount = 0;
        for (uint i = 0; i < todos.length; i++) {
            if (todos[i].owner == user) {
                userTodoCount++;
            }
        }
        Todo[] memory userTodos = new Todo[](userTodoCount);
        uint index = 0;
        for (uint i = 0; i < todos.length; i++) {
            if (todos[i].owner == user) {
                userTodos[index] = todos[i];
                index++;
            }
        }
        return userTodos;
    }

    // 오직 할 일 작성자만 실행 가능한 modifier
    modifier onlyOwner(uint index) {
        require(todos[index].owner == user, "Not authorized to complete this todo");
        _;
    }
}