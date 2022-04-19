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
const eform = document.querySelector("#eform");
const deleteRow = document.getElementsByClassName("btnDelete");

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

function starter() {
  sn = 0;
  const usersString = localStorage.getItem("users");
  console.log(usersString);
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
}

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
  del.innerHTML = `<i class="ri-delete-bin-6-line btnEdit"></i>`;
  edit.innerHTML = `<i class="ri-pencil-line" btnDelete></i>`;

  const index = sn;
  addModal.style.display = "none";

  fname.value = " ";
  lname.value = " ";
  department.value = " ";
  salary.value = " ";

  tbody.appendChild(row);
  sn++;

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

  edit.addEventListener("click", () => {
    // tbody.innerHTML = " ";
    editModal.style.display = "block";

    efname.value = users[index].firstName;
    elname.value = users[index].lastName;
    esalary.value = users[index].salary;
    edepartment.value = users[index].department;

    eform.addEventListener("submit", (e) => {
      e.preventDefault();
      users[index].firstName = efname.value;
      users[index].lastName = elname.value;
      users[index].salary = esalary.value;
      users[index].department = edepartment.value;
      localStorage.removeItem("users");
      tbody.innerHTML = " ";
      localStorage.setItem("users", JSON.stringify(users));
      starter();
      editModal.style.display = "none";
    });
  });
}

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
  // localStorage.removeItem("user");
  localStorage.setItem("users", JSON.stringify(users));
});

window.onload = function () {
  starter();
};
