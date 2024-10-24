let todoArray = JSON.parse(localStorage.getItem("todoData")) || [];

function restoreItem(index) {
  todoArray[index].isArchive = false;

  updateLocalStorage();
  displayTodoList(todoArray);
}

//permanent Delete

function permanentdelete(index) {
  todoArray.splice(index, 1);
  updateLocalStorage();
  displayTodoList(todoArray);
}

// Update Local Storage
function updateLocalStorage() {
  localStorage.setItem("todoData", JSON.stringify(todoArray));
}

function displayTodoList(todoArray) {
  const todoTable = document.getElementById("todoTable");
  todoTable.innerHTML = "";


  const ArchivedTodos = todoArray.filter((item) => item.isArchive);

  if (ArchivedTodos.length <= 0) {
    const temp = `
  <div class="text-3xl text-center font-bold text-[var(--text-primary)] capitalize"> No Task in todo List</div>
`;
    todoTable.innerHTML += temp;
    return;
  }

  const headerRow = `
      <tr class="grid grid-cols-4 overflow-hidden w-full bg-[#4cb04f] text-[var(--text-secondary)] font-bold text-lg capitalize">
        <td class="border-2 border-white bg-[var(--table-heading-bg)] px-10 py-4">Name</td>
        <td class="border-2 border-white bg-[var(--table-heading-bg)] px-10 py-4">Priority</td>
        <td class="border-2 border-white bg-[var(--table-heading-bg)] px-10 py-4">Status</td>
        <td class="border-2 border-white bg-[var(--table-heading-bg)] px-10 py-4">Delete</td>
      </tr>
    `;
  todoTable.innerHTML += headerRow;

  todoArray.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.classList.add(
      "grid",
      "grid-cols-4",
      "bg-transparent",
      "text-[var(--text-primary)]",
      "font-bold",
      "text-sm",
      "capitalize"
    );

    tr.id = `tableRow-${index + 1}`;
    const dropdownId = `workStatusDropdown_${index + 1}`;
    const RestoreButtonId = `RestoreButton-${index + 1}`;
    const DeleteButtonId = `deleteButton-${index + 1}`;

    const statusIndex = {
      completed: 0,
      pending: 1,
      open: 2,
    }[item.status];

    tr.innerHTML = `
        <td class="taskText border-2 border-white bg-transparent text-center py-2">${
          item.task
        }</td>
        <td class="taskPriority border-2 border-white bg-[${item.prioritylevel === "Low" ? "#008000" : item.prioritylevel === "Medium" ? "#FF5733" : "#900C3F"}] text-center py-2">${
          item.prioritylevel
        }</td>
        <td class="border-2 border-white bg-transparent py-2">
          <div id="${dropdownId}" class="parent cursor-pointer" title="Update Status" data-id="${
      index + 1
    }">
            <div class="dropdownChildren ${
              statusIndex === 0 ? "active" : ""
            } justify-center items-center gap-2">
              <span>completed</span>
              <span><img class="w-7" src="https://img.icons8.com/?size=100&id=ddHq816KEsxh&format=png&color=000000" alt="" /></span>
            </div>
            <div class="dropdownChildren ${
              statusIndex === 1 ? "active" : ""
            } justify-center items-center gap-2">
              <span>pending</span>
              <span><img class="w-7" src="https://img.icons8.com/?size=100&id=JqT26JbVqjyz&format=png&color=000000" alt="" /></span>
            </div>
            <div class="dropdownChildren ${
              statusIndex === 2 ? "active" : ""
            }  justify-center items-center gap-2">
              <span >open</span>
              <span><img class="w-7" src="https://img.icons8.com/?size=100&id=m24K7KKciHWw&format=png&color=000000" alt="" /></span>
            </div>
          </div>
        </td>
        <td class="border-2 border-white bg-transparent flex gap-2 text-sm text-[var(--text-color)] justify-center items-center">
          <button id="${RestoreButtonId}" class="archiveButton bg-blue-600 px-2 py-1 rounded-lg shadow-lg hover:scale-105 ease-in duration-300">Restore</button>
          <button id="${DeleteButtonId}" class="archiveButton bg-red-600 px-2 py-1 rounded-lg shadow-lg hover:scale-105 ease-in duration-300">Delete</button>
        </td>
      `;

    if (item.isArchive) {
      todoTable.appendChild(tr);
    } else if (!item.isArchive) {
      return;
    }

    document.getElementById(RestoreButtonId).addEventListener("click", () => {
      restoreItem(index);
    });
    document.getElementById(DeleteButtonId).addEventListener("click", () => {
      permanentdelete(index);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayTodoList(todoArray);
});


//Sorting Part

const PrioritySorting = document.getElementById("PrioritySorting");

PrioritySorting.addEventListener("change", (e) => {
  let priority = e.target.value;
  switch (priority) {
    case "Low":
      let LowSortedTodo = todoArray.filter(
        (todo) => todo.prioritylevel === "Low"
      );
      displayTodoList(LowSortedTodo);
      break;
    case "Medium":
      let midSortedTodo = todoArray.filter(
        (todo) => todo.prioritylevel === "Medium"
      );
      displayTodoList(midSortedTodo);
      break;
    case "High":
      let HighSortedTodo = todoArray.filter(
        (todo) => todo.prioritylevel === "High"
      );
      displayTodoList(HighSortedTodo);
      break;
    case "Default":
      displayTodoList(todoArray);
      break;

    default:
      displayTodoList(todoArray);
      break;
  }
});


// Priority Sorting 

const StatusSorting = document.getElementById('StatusSorting');

StatusSorting.addEventListener('change', (e)=>{

  let status = e.target.value;

  switch (status) {
    case "completed":
      let LowSortedTodo = todoArray.filter(
        (todo) => todo.status === "completed"
      );
      displayTodoList(LowSortedTodo);
      break;
    case "pending":
      let midSortedTodo = todoArray.filter(
        (todo) => todo.status === "pending"
      );
      displayTodoList(midSortedTodo);
      break;
    case "open":
      let HighSortedTodo = todoArray.filter(
        (todo) => todo.status === "open"
      );
      displayTodoList(HighSortedTodo);
      break;
    case "Default":
      displayTodoList(todoArray);
      break;

    default:
      displayTodoList(todoArray);
      break;
  }
  
});