const studentModal = document.querySelector("#studentModal")
const studentForm = document.querySelector(".studentForm")
const groupsFilter = document.querySelector(".groups-filter")
const groupSelect = document.querySelector(".modalSelect")
const studentsTable = document.getElementById('studentsTable').querySelector("tbody")
const tbody = document.querySelector("tbody");

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
        let doesWork = studentForm.elements.doesWork.checked ? "Yes" : "Now";
        let student = { firstName, lastName, group, doesWork };
        rowCount = tbody.rows.length;
        const newRow = `
                 <tr>
                     <th scope="row">${rowCount + 1}</th> <!-- Tartib raqami -->
                     <td>${student.firstName}</td>
                     <td>${student.lastName}</td>
                     <td>${student.group}</td>
                     <td>${student.doesWork}</td>
                     <td>
                         <button type="button" class="btn btn-success">Edit</button>
                         <button type="button" class="btn btn-danger">Delete</button>
                     </td>
                 </tr> 
             `;
        studentsTable.innerHTML += newRow;

        // function addStudentToTable(student) {
        //     const rowCount = tbody.rows.length; // Jadvaldagi mavjud qatorlar soni
        //     const newRow = `
        //         <tr>
        //             <th scope="row">${rowCount + 1}</th> <!-- Tartib raqami -->
        //             <td>${student.firstName}</td>
        //             <td>${student.lastName}</td>
        //             <td>${student.group}</td>
        //             <td>${student.doesWork}</td>
        //             <td>
        //                 <button type="button" class="btn btn-success">Edit</button>
        //                 <button type="button" class="btn btn-danger">Delete</button>
        //             </td>
        //         </tr>
        //     `;
        //     tbody.insertAdjacentHTML("beforeend", newRow); // Yangi qatorni jadvalga qo'shish
        // }


        // addStudentToTable()


        bootstrap.Modal.getInstance(studentModal).hide();
        studentForm.reset();
    } else {
        studentForm.classList.add("was-validated");
    }




});