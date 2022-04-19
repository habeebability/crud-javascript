const addModal = document.querySelector("#add-modal");
const editModal = document.querySelector("#edit-modal");
const addBtn = document.querySelector("#add-btn");
const closeBtnAdd = document.querySelector("#btn-close-add");
const closeBtnEdit = document.querySelector("#btn-close-edit");
const submitForm = document.querySelector("#submit-form");
const table = document.querySelector("#table");
const tbody = document.querySelector("#tbody");
let fname = document.querySelector("#fname");
let lname = document.querySelector("#lname");
let department = document.querySelector("#department");
let salary = document.querySelector("#salary");
let efname = document.querySelector("#efname");
let elname = document.querySelector("#elname");
let edepartment = document.querySelector("#edepartment");
let esalary = document.querySelector("#esalary");
const form = document.querySelector("#form");
const eform = document.querySelector("#form");

addBtn.addEventListener("click", () => {
  addModal.style.display = "block";
});

closeBtnAdd.addEventListener("click", () => {
  addModal.style.display = "none";
});

closeBtnEdit.addEventListener("click", () => {
  editModal.style.display = "none";
});

let sn = 0;
let users = [];

const usersString = localStorage.getItem("users");
const edittedString = localStorage.getItem("edittedUsers");

try {
  if (usersString) {
    users = JSON.parse(usersString);
  }
} catch (e) {
  console.log(e);
}

users.forEach((user) => {
  addRow(user);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    firstName: fname.value,
    lastName: lname.value,
    salary: salary.value,
    department: department.value,
  };

  addRow(user);
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
});

function addRow({ firstName, lastName, department, salary }) {
  let row = table.insertRow(-1);

  const snRow = row.insertCell(0);
  const finame = row.insertCell(1);
  const laname = row.insertCell(2);
  const dmt = row.insertCell(3);
  const sal = row.insertCell(4);
  const del = row.insertCell(5);
  const edit = row.insertCell(5);

  snRow.innerHTML = sn + 1;
  finame.innerHTML = firstName;
  laname.innerHTML = lastName;
  dmt.innerHTML = department;
  sal.innerHTML = `$${salary}`;
  del.innerHTML = `<i class="ri-delete-bin-6-line"></i>`;
  edit.innerHTML = `<i class="ri-pencil-line"></i>`;

  const index = sn;

  // edit.forEach((user)=> {

  // })
  edit.addEventListener("click", () => {
    // tbody.innerHTML = ' ';
    editModal.style.display = "block";

    efname.value = users[index].firstName;
    elname.value = users[index].lastName;
    esalary.value = users[index].salary;
    edepartment.value = users[index].department;

    eform.addEventListener("submit", () => {
      let user = {
        firstName: efname.value,
        lastName: elname.value,
        salary: esalary.value,
        department: edepartment.value,
      };
    });
  });

  del.addEventListener("click", () => {
    tbody.innerHTML = " ";
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    sn = 0;
    users.forEach((user) => {
      addRow(user);
    });
    console.log(users);
  });

  addModal.style.display = "none";

  fname.value = " ";
  lname.value = " ";
  department.value = " ";
  salary.value = " ";

  tbody.appendChild(row);
  sn++;
}
