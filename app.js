class SchoolRegister {
  constructor() {
    this.class = JSON.parse(localStorage.getItem("schoolRegister")) || [];
  }
  // Aggiungi uno studente al registro
  addStudent(firstname, lastname) {
    const student = {
      id: Math.random().toString(16).slice(2) + Date.now().toString(16),
      firstname,
      lastname,
      grades: [],
    };

    this.class.push(student);
    localStorage.setItem("schoolRegister", JSON.stringify(this.class));
  }

  // Visualizza i dati di tutti gli studenti nel registro
  viewClass() {
    return this.class;
  }

  // Visualizza i dati di tutti gli studenti nel registro
  viewGrade(id) {
    const student = this.class.find((s) => s.id === id);
    //console.log(student);
    return student;
  }
  // Aggiungi un voto a uno studente specifico
  addGrade(id, grade, data, description) {
    const student = this.class.find((s) => s.id === id);

    if (student) {
      student.grades.push({
        grade,
        data,
        description,
      });
    }
    localStorage.setItem("schoolRegister", JSON.stringify(this.class));
    /*console.log(student);
    console.log("addgrade:");
    console.log(this.class);*/
  }

  // Modifica i dati di uno studente
  updateStudent(id, nFirstname, nLastname) {
    const student = this.class.find((s) => s.id === id);

    if (student) {
      student.firstname = nFirstname;
      student.lastname = nLastname;
    }
    localStorage.setItem("schoolRegister", JSON.stringify(this.class));
  }

  // Rimuovi uno studente dal registro
  removeStudent(id) {
    this.class = this.class.filter((s) => !(s.id === id));
    localStorage.setItem("schoolRegister", JSON.stringify(this.class));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const studentList = document.getElementById("tbodyS");
  const gradeList = document.getElementById("tbodyG");
  const studentTable = document.getElementById("tableStudent");
  const gradeTable = document.getElementById("tableGrade");
  const nameGradebook = document.querySelector(".nameGradeBook");
  const addFormS = document.getElementById("tbodyAddS");
  const addFormSG = document.getElementById("tbodyAddSG");
  const addSTable = document.getElementById("addSTable");

  const register = new SchoolRegister();

  //register.addStudent("Anna", "Bianchi");
  //register.addGrade("3f4440ddf5ecd18c4fe5c07f", 8, "Math", "2023-01-10");
  //register.updateStudent("4ce2790d6f16b18c4fe61c10", "Giuseppe", "Barca");
  //register.removeStudent("4ce2790d6f16b18c4fe61c10");
  //console.log(register.viewStudent());

  // Aggiungo un listener per il click sul pulsante grade degli studenti
  tableStudent.addEventListener("click", (event) => {
    const gradeButton = event.target.closest(".gradeButton");
    if (gradeButton) {
      const studentId = gradeButton.closest("tr").querySelector("th").id;
      const student = register.viewGrade(studentId);
      console.log(student);
      studentTable.classList.add("hidden");
      gradeTable.classList.remove("hidden");
      nameGradebook.innerHTML = `<button class="backButton d-inline-block btn btn-primary"">Back</button><h4 class="d-inline-block">Gradebook ${student.lastname} ${student.firstname}</h4>`;

      populateTableG(student.grades);
    }
  });

  // Aggiungo un listener per il click sul pulsante back della lista grade
  document.addEventListener("click", (event) => {
    const backButton = event.target.closest(".backButton");
    if (backButton) {
      gradeTable.classList.add("hidden");
      studentTable.classList.remove("hidden");
    }
  });

  // Aggiungo un listener per il click sul pulsante add della lista studenti
  document.addEventListener("click", (event) => {
    const addSButton = event.target.closest(".addSButton");
    //const newElementHTML =
    //  '<tr><td>1</td><td><form><input type="text" id="firstName_1" name="firstName_1"></form></td><td><form><input type="text" id="lastName_1" name="lastName_1"></form></td><td><button type="button" class="subAddS">Submit</button></td></tr>';
    if (addSButton) {
      //studentList.insertAdjacentHTML("beforebegin", newElementHTML);
      studentTable.classList.add("hidden");
      addSTable.classList.remove("hidden");
    }
  });

  // Aggiungo un listener per il click sul pulsante submit dell' add studenti
  document.querySelector(".subAddS").addEventListener("click", () => {
    // Ottieni i valori inseriti nei campi del modulo
    const firstName = document.getElementById("firstName_1").value;
    const lastName = document.getElementById("lastName_1").value;

    const newElementHTML = `<tr><td>#</td><td>${lastName}</td><td>${firstName}</td><td></td></tr>`;

    // Esempio: Aggiungi una nuova riga con i dati inseriti
    addFormS.innerHTML = newElementHTML;
    //addFormS.appendChild(newElementHTML);

    // Resetta i campi del modulo
    //document.getElementById("firstName_1").value = "";
    //document.getElementById("lastName_1").value = "";
  });

  document.querySelector(".subAddG").addEventListener("click", () => {
    // Ottieni i valori inseriti nei campi del modulo
    const grade = document.getElementById("grade_1").value;
    const date = document.getElementById("date_1").value;
    const description = document.getElementById("description_1").value;

    const newElementHTML = `<tr><td>${grade}</td><td>${date}</td><td>${description}</td><td></td></tr>`;

    // Esempio: Aggiungi una nuova riga con i dati inseriti
    addFormSG.insertAdjacentHTML("beforebegin", newElementHTML);
    //addFormS.appendChild(newElementHTML);

    // Resetta i campi del modulo
    //document.getElementById("firstName_1").value = "";
    //document.getElementById("lastName_1").value = "";
  });
  // Funzione per popolare la tabella con i dati degli studenti
  function populateTableS(data) {
    studentList.innerHTML = "";
    let count = 1;

    data.forEach((student) => {
      const row = studentList.insertRow();
      row.innerHTML = `<th class="text-center" scope="row" id=${student.id}>${count}</th><td>${student.lastname}</td><td>${student.firstname}</td><td><button class="gradeButton">Grades</button></td>`;
      count++;
    });
  }
  // Funzione per popolare la tabella con i dati dei voti
  function populateTableG(data) {
    gradeList.innerHTML = "";

    data.forEach((grade) => {
      const row = gradeList.insertRow();
      row.innerHTML = `<td class="text-center" scope="row">${grade.grade}</td><td>${grade.data}</td><td>${grade.description}</td><td><button class="removeGradeButton">Remove</button></td>`;
    });
  }

  //console.log(register.viewClass());
  // Popola la tabella studenti all'avvio
  populateTableS(register.viewClass());
});
