const studentModal = document.querySelector("#studentModal")
const studentForm = document.querySelector(".studentForm")
const groupsFilter = document.querySelector(".groups-filter")
const groupSelect = document.querySelector(".modalSelect")
const studentTable = document.getElementById('studentsTable').querySelector("tbody")
const tbody = document.querySelector("tbody");
const modalTitle = document.querySelector("#modalTitle");
const submitButton = studentForm.querySelector("button[type='submit']");
const openModalBtn = document.querySelector(".open-modal-btn");
const editModal = document.querySelector(".title-modal");
const editModalBtn = document.querySelector(".edit-btn");
const searchStudent = document.querySelector(".searchStudent");

const studentMemory = 'STUDENTS';
let studentJSON = localStorage.getItem(studentMemory);
let students = JSON.parse(studentJSON) || [];


let selected = null;
let studentGroup = "STUDENT_GROUP";
let group = localStorage.getItem(studentGroup) || 'all';

let search = "";

function getStudentRow({ firstName, lastName, group, doesWork }, i) {
    return `
    <tr>
        <th scope="row">${i + 1}</th>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${group}</td>
        <td>${doesWork ? "Ha":"Yo'q"}</td>
        <td>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#studentModal" onclick = "editStudent(${i})">Edit</button>
            <button type="button" class="btn btn-danger" onclick = "deleteStudent(${i})">Delete</button>
        </td>
    </tr> 
    `
}

function getStudents() {
    studentTable.innerHTML = "";


    let result = students.filter(
        (student) =>
        student.firstName.toLowerCase().includes(search) ||
        student.lastName.toLowerCase().includes(search)
    );


    if (group !== "all") {
        result = students.filter((student) => student.group === group);
    }

    result.forEach((student, i) => {
        studentTable.innerHTML += getStudentRow(student, i)
    });

}
getStudents();

function getGroupOption(gr) {
    return `
    <option value="${gr}">${gr}</option>
    `
}
groupsFilter.innerHTML = `<option value="all">All</option>`;


const groups = ['N1', 'N2', 'N3', 'N4'];
let groupOption = "";
groups.forEach((group) => {
    groupOption += getGroupOption(group);
})
groupsFilter.innerHTML += groupOption;
groupSelect.innerHTML += groupOption;
studentForm.addEventListener("submit", function(e) {
    e.preventDefault()

    let chechForm = studentForm.checkValidity();

    if (chechForm) {
        let firstName = studentForm.elements.firstName.value;
        let lastName = studentForm.elements.lastName.value;
        let group = studentForm.elements.group.value;
        let doesWork = studentForm.elements.doesWork.checked;

        let student = { firstName, lastName, group, doesWork };

        if (selected === null) {
            students.push(student)
        } else {
            students = students.map((el, i) => (i === selected ? student : el))
        }
        localStorage.setItem(studentMemory, JSON.stringify(students))

        bootstrap.Modal.getInstance(studentModal).hide();
        getStudents();

        studentForm.reset();
    } else {
        studentForm.classList.add("was-validated");
    }
});


// edit
function editStudent(i) {
    selected = i;
    editModal.textContent = "Editing student";
    editModalBtn.textContent = "Edit";
    let { firstName, lastName, group, doesWork } = students[i];
    studentForm.elements.firstName.value = firstName;
    studentForm.elements.lastName.value = lastName;
    studentForm.elements.group.value = group;
    studentForm.elements.doesWork.checked = doesWork;
}



// delete
function deleteStudent(i) {
    let doesConfirm = confirm("O'chirilsinmi?")
    if (doesConfirm) {
        students = students.filter((_, index) => index !== i);
        localStorage.setItem(studentMemory, JSON.stringify(students));
        getStudents()
    }
}

// search
searchStudent.addEventListener("keyup", function() {
    search = this.value.trim().toLowerCase();
    getStudents();
});


groupsFilter.addEventListener("change", function() {
    group = this.value;
    localStorage.setItem(studentGroup, group);
    getStudents();
});