const dom = (params) => {
    return document.querySelector(params);
}

let list = [];
let listDone = [];

toDo();
function toDo() {
    // Lấy dữ liệu công việc chưa hoàn thành từ localStorage
    list = JSON.parse(localStorage.getItem("todoList")) || [];
    displayList(list);

}

toDoDone();
function toDoDone() {
    // Lấy dữ liệu công việc đã hoàn thành từ localStorage
    listDone = JSON.parse(localStorage.getItem("listDone")) || [];
    listComplete(listDone);
}

// thêm việc mới
dom("#addItem").addEventListener("click", (evt) => {
    let newTask = dom("#newTask").value;
    list.push(newTask);
    dom("#newTask").value = "";
    localStorage.setItem("todoList", JSON.stringify(list));
    displayList(list);
});

dom("#todo").addEventListener("click", (evt) => {
    let id = evt.target.getAttribute("data-id");
    let toDoFound = list.find((value, index) => index == id);

    switch (evt.target.getAttribute("class")) {
        // btn hoàn thành công việc
        case "fa-regular fa-circle-check":
            list.splice(id, 1);
            displayList(list);
            listDone.push(toDoFound);
            listComplete(listDone);
            localStorage.setItem("todoList", JSON.stringify(list));
            localStorage.setItem("listDone", JSON.stringify(listDone));
            break;

        // btn xóa công việc chưa hoàn thành
        case "fa-regular fa-trash-can":
            list.splice(id, 1);
            localStorage.setItem("todoList", JSON.stringify(list));
            displayList(list);
            break;
        default:
            break;
    }
});

dom("#completed").addEventListener("click", (evt) => {
    let id = evt.target.getAttribute("data-id");
    console.log(evt.target);
    let toDoFound = list.find((value, index) => index == id);
    if (evt.target.getAttribute("class") === "fa-regular fa-trash-can") {
        listDone.splice(id, 1);
        localStorage.setItem("listDone", JSON.stringify(listDone));
        listComplete(listDone);
    }
})

// Sắp xếp theo chữ cái z-a
dom("#three").addEventListener("click", (evt) => {
    const result = list.sort((a, b) => a.localeCompare(b));
    console.log(result);
    displayList(result);
})

// Sắp xếp theo chữ cái a-z
dom("#two").addEventListener("click", (evt) => {
    const result = list.sort((a, b) => b.localeCompare(a));
    console.log(result);
    displayList(result);
})

// công việc chưa hoàn thành
function displayList(list) {
    let html = list.reduce((result, todo, index) => {
        return result +
            `
        <li>
            ${todo}
            <div class="buttons">
                <button>
                    <i data-id="${index}" class="fa-regular fa-trash-can"></i>
                </button>
                <button>
                    <i data-id="${index}" class="fa-regular fa-circle-check"></i>
                </button>
            </div>
        </li>
        `
    }, "")
    dom("#todo").innerHTML = html;
}

// công việc đã hoàn thành
function listComplete(list) {
    let html = list.reduce((result, todo, index) => {
        return result +
            `
        <li>
            <span>
                ${todo}
            </span>
            <div class="buttons">
                <div class="buttons">
                    <button>
                        <i data-id="${index}" class="fa-regular fa-trash-can"></i>
                    </button>
                    <button class="complete">
                        <i data-id="${index}" class="fa-sharp fa-solid fa-circle-check"></i>
                    </button>
                </div>
            </div>
        </li>
        `
    }, "")
    dom("#completed").innerHTML = html;
}