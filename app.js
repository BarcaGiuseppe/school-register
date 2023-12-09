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
    console.log("this.studnt prima:");
    console.log(this.class);

    this.class.push(student);
    console.log("this.studnt dopo push:");
    console.log(this.class);

    localStorage.setItem("schoolRegister", JSON.stringify(this.class));
  }

  // Visualizza i dati di tutti gli studenti nel registro
  viewClass() {
    return this.class;
  }

  // Aggiungi un voto a uno studente specifico
  addGrade(firstname, lastname, grade, data, description) {
    const student = this.class.find(
      (s) => s.firstname === firstname && s.lastname === lastname
    );

    if (student) {
      student.grades.push({
        grade,
        data,
        description,
      });
    }
  }

  // Modifica i dati di uno studente
  updateStudent(firstname, lastname, nFirstname, nLastname) {
    const student = this.class.find(
      (s) => s.firstname === firstname && s.lastname === lastname
    );

    if (student) {
      student.firstname = nFirstname;
      student.lastname = nLastname;
    }
  }

  // Rimuovi uno studente dal registro
  removeStudent(firstname, lastname) {
    this.class = this.class.filter(
      (s) => !(s.firstname === firstname && s.lastname === lastname)
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const votesList = document.getElementById("tbodyS");

  const register = new SchoolRegister();

  //registro.aggiungiStudente("Mario", "Rossi");
  //registro.aggiungiVoto("Mario", "Rossi", 8, "Math", "2023-01-10");

  //console.log(registro.visualizzaStudenti());

  // Funzione per popolare la tabella con i dati
  function populateTableS(data) {
    votesList.innerHTML = "";
    let count = 1;

    data.forEach((student) => {
      const row = votesList.insertRow();
      row.innerHTML = `<th class="text-center" scope="row">${count}</th><td>${student.lastname}</td><td>${student.firstname}</td><td><button>Grades</button></td>`;
      count++;
    });
  }
  console.log(register.visualizzaStudenti());
  // Popola la tabella all'avvio
  populateTableS(register.visualizzaStudenti());
});
