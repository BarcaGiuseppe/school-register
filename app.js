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
    return student.grades;
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

  const register = new SchoolRegister();

  //register.addStudent("Anna", "Bianchi");
  //register.addGrade("3f4440ddf5ecd18c4fe5c07f", 8, "Math", "2023-01-10");
  //register.updateStudent("4ce2790d6f16b18c4fe61c10", "Giuseppe", "Barca");
  //register.removeStudent("4ce2790d6f16b18c4fe61c10");
  //console.log(register.viewStudent());

  // Aggiungo un listener per il click sulla tabella delle persone
  tableStudent.addEventListener("click", (event) => {
    const gradeButton = event.target.closest(".gradeButton");
    if (gradeButton) {
      const studentId = gradeButton.closest("tr").querySelector("th").id;
      const studentGrade = register.viewGrade(studentId);
      console.log(studentGrade);
      studentTable.classList.add("hidden");
      gradeTable.classList.remove("hidden");

      populateTableG(studentGrade);
    }
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
      row.innerHTML = `<th class="text-center" scope="row">${grade.grade}</th><td>${grade.data}</td><td>${grade.description}</td><td><button class="removeGradeButton">Remove</button></td>`;
    });
  }
  //console.log(register.viewClass());
  // Popola la tabella studenti all'avvio
  populateTableS(register.viewClass());
});
