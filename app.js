class SchoolRegister {
  constructor() {
    this.class = JSON.parse(localStorage.getItem("schoolRegister")) || [];
  }
  // Aggiungi uno studente al registro
  addStudent(firstname, lastname, grade = false) {
    let student = "";
    if (grade !== false) {
      student = {
        id: Math.random().toString(16).slice(2) + Date.now().toString(16),
        firstname,
        lastname,
        grades: [
          {
            grade: grade[0].grade,
            date: grade[0].date,
            description: grade[0].description,
          },
        ],
      };
    } else {
      student = {
        id: Math.random().toString(16).slice(2) + Date.now().toString(16),
        firstname,
        lastname,
        grades: [],
      };
    }
    this.class.push(student);
    localStorage.setItem("schoolRegister", JSON.stringify(this.class));
  }

  // Visualizza i dati di tutti gli studenti nel registro
  viewClass() {
    return this.class;
  }

  // Visualizza i dati di uno studente nel registro
  viewGrade(id) {
    const student = this.class.find((s) => s.id === id);
    //console.log(student);
    return student;
  }
  // Aggiungi un voto a uno studente specifico
  addGrade(id, grade, date, description) {
    const student = this.class.find((s) => s.id === id);

    if (student) {
      student.grades.push({
        grade,
        date,
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

  let gradesArray = [];
  let studentArray = [];
  //let count = 0;
  //register.addStudent("Mario", "Rossi");
  //register.addGrade("5e7cd6947bb4618c540471a3", 8, "Math", "2023-01-10");
  //register.updateStudent("5e7cd6947bb4618c540471a3", "Giuseppe", "Barca");
  //register.removeStudent("4ce2790d6f16b18c4fe61c10");
  //console.log(register.viewStudent());

  //@@@ Aggiungo un listener per il click sul pulsante grade degli studenti
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

  //@@@ Aggiungo un listener per il click sul pulsante back della lista grade
  document.addEventListener("click", (event) => {
    const backButton = event.target.closest(".backButton");
    const abortSButton = event.target.closest(".abortSButton");
    const confirmSButton = event.target.closest(".confirmSButton");
    const modSbutton = event.target.closest(".modSButton");

    if (backButton) {
      gradeTable.classList.add("hidden");
      studentTable.classList.remove("hidden");
    }
    if (abortSButton) {
      addSTable.classList.add("hidden");
      studentTable.classList.remove("hidden");
      studentArray = [];
      gradesArray = [];
    }
    if (confirmSButton) {
      addSTable.classList.add("hidden");
      studentTable.classList.remove("hidden");
      console.log(
        "studentArray:" +
          JSON.stringify(studentArray) +
          "\n" +
          "studentArray.firstName:" +
          JSON.stringify(studentArray[0].firstName) +
          "\n" +
          "studentArray.lastName:" +
          JSON.stringify(studentArray[0].lastName)
      );
      if (gradesArray.length > 0) {
        console.log("i dati grade ci sono:" + studentArray[0].firstName);
        register.addStudent(
          studentArray[0].firstName,
          studentArray[0].lastName,
          gradesArray
        );
      } else
        register.addStudent(
          studentArray[0].firstName,
          studentArray[0].lastName
        );
      populateTableS(register.viewClass());
      studentArray = [];
      gradesArray = [];
    }
    if (modSbutton) {
      const thElement = modSbutton.closest("tr").querySelector("th");
      const idValue = thElement ? thElement.id : null;

      console.log("Valore dell'ID:", idValue);
      populateTableS(register.viewClass(), idValue);
      addSTable.classList.add("hidden");
      studentTable.classList.remove("hidden");
      studentArray = [];
      gradesArray = [];
    }
  });

  //@@@ Aggiungo un listener per il click sul pulsante add in alto lista studenti
  document.addEventListener("click", (event) => {
    const addSButton = event.target.closest(".addSButton");
    //const newElementHTML =
    //  '<tr><td>1</td><td><form><input type="text" id="firstName_1" name="firstName_1"></form></td><td><form><input type="text" id="lastName_1" name="lastName_1"></form></td><td><button type="button" class="subAddS">Submit</button></td></tr>';
    if (addSButton) {
      //studentList.insertAdjacentHTML("beforebegin", newElementHTML);
      studentTable.classList.add("hidden");
      addSTable.classList.remove("hidden");
      populateTableAddS(studentArray);
      populateTableAddSG(gradesArray);
    }
  });

  //@@@ Aggiungo un listener per il click sul pulsante submit dell' add studenti
  //document.querySelector(".subAddS").addEventListener("click", () => {
  document.addEventListener("click", (event) => {
    const subAddSButton = event.target.closest(".subAddS");
    if (subAddSButton) {
      // Ottieni i valori inseriti nei campi del modulo
      const firstName = document.getElementById("firstName_1").value;
      const lastName = document.getElementById("lastName_1").value;
      const newElementHTML = `<tr><td>#</td><td>${lastName}</td><td>${firstName}</td><td></td></tr>`;
      // Esempio: Aggiungi una nuova riga con i dati inseriti
      addFormS.innerHTML = newElementHTML;
      studentArray.push({ firstName, lastName });
      //addFormS.appendChild(newElementHTML);
    }
    // Resetta i campi del modulo
    //document.getElementById("firstName_1").value = "";
    //document.getElementById("lastName_1").value = "";
  });

  //@@@ Aggiungo un listener per il click sul pulsante submit dell' add grade studenti
  //document.querySelector(".subAddG").addEventListener("click", () => {
  document.addEventListener("click", (event) => {
    const subAddG = event.target.closest(".subAddG");
    // Ottieni i valori inseriti nei campi del modulo
    if (subAddG) {
      const grade = document.getElementById("grade_0").value;
      const date = document.getElementById("date_0").value;
      const description = document.getElementById("description_0").value;

      gradesArray.push({ grade, date, description });
      /*console.log(
        "count:" +
          "\n" +
          "gradesArray:" +
          JSON.stringify(gradesArray) +
          "\n" +
          "grade:" +
          grade +
          "\n" +
          "date:" +
          date +
          "\n" +
          "description:" +
          description +
          "\n"
      );*/
      populateTableAddSG(gradesArray);
      //const newElementHTML = `<tr><td>${grade}</td><td>${date}</td><td>${description}</td><td></td></tr>`;
      // Esempio: Aggiungi una nuova riga con i dati inseriti
      //addFormSG.insertAdjacentHTML("beforebegin", newElementHTML);
      //addFormS.appendChild(newElementHTML);
    }
    // Resetta i campi del modulo
    //document.getElementById("firstName_1").value = "";
    //document.getElementById("lastName_1").value = "";
  });

  // Funzione per popolare la tabella con i dati degli studenti
  function populateTableS(data, i = false) {
    studentList.innerHTML = "";
    let count = 1;

    data.forEach((student, index) => {
      if (i === student.id) {
        console.log("ci siamo");
        const row = studentList.insertRow();
        row.innerHTML = `<th class="text-center" scope="row" id=${student.id}>${count}</th><td><form><input type="text" id="lastName_mod" name="lastName_mod" value="${student.lastname}"/></form></td><td><form><input type="text" id="firstName_mod" name="firstName_mod" value="${student.firstname}"/></form></td><td><button class="gradeButton">Grades</button></td><td><button class="modSButton">Confirm</button></td>`;
      } else {
        const row = studentList.insertRow();
        row.innerHTML = `<th class="text-center" scope="row" id=${student.id}>${count}</th><td>${student.lastname}</td><td>${student.firstname}</td><td><button class="gradeButton">Grades</button></td><td><button class="modSButton">Update</button></td>`;
      }
    });
  }
  // Funzione per popolare la tabella con i dati dei voti
  function populateTableG(data) {
    gradeList.innerHTML = "";

    data.forEach((grade) => {
      const row = gradeList.insertRow();
      row.innerHTML = `<td class="text-center" scope="row">${grade.grade}</td><td>${grade.date}</td><td>${grade.description}</td><td><button class="removeGradeButton">Remove</button></td>`;
    });
  }
  // Funzione per popolare la tabella con input studente
  function populateTableAddS(data) {
    addFormS.innerHTML = "";
    if (data.length > 0) {
      addFormS.innerHTML = `<tr><td>#</td><td>${data.lastName}</td><td>${data.firstName}</td><td></td></tr>`;
      // Esempio: Aggiungi una nuova riga con i dati inseriti
    } else {
      addFormS.innerHTML = `<tr>
      <td>#</td>
      <td>
        <form>
          <input
            type="text"
            id="firstName_1"
            name="firstName_1"
          />
        </form>
      </td>
      <td>
        <form>
          <input type="text" id="lastName_1" name="lastName_1" />
        </form>
      </td>
      <td>
        <button type="button" class="subAddS">Submit</button>
      </td>
    </tr>`;
    }
  }
  // Funzione per popolare la tabella con input grade e grade aggiunti
  function populateTableAddSG(data) {
    addFormSG.innerHTML = "";
    if (gradesArray.length > 0) {
      addFormSG.innerHTML = `<tr><td class="text-center" scope="row"><form><input type="text" id="grade_0" name="grade_0" /></form></td><td><form><input type="text" id="date_0" name="date_0" /></form></td><td><form><input type="text" id="description_0" name="description_0"/></form></td><td><button type="button" class="subAddG">Submit</button></td></tr>`;
      data
        .slice()
        .reverse()
        .forEach((grade) => {
          const row = addFormSG.insertRow();
          row.innerHTML = `<td class="text-center" scope="row">${grade.grade}</td><td>${grade.date}</td><td>${grade.description}</td><td><button class="removeGradeButton">Remove</button></td>`;
        });
    } else {
      addFormSG.innerHTML = `<tr><td class="text-center" scope="row"><form><input type="text" id="grade_0" name="grade_0" /></form></td><td><form><input type="text" id="date_0" name="date_0" /></form></td><td><form><input type="text" id="description_0" name="description_0"/></form></td><td><button type="button" class="subAddG">Submit</button></td></tr>`;
    }
  }

  //console.log(register.viewClass());
  // Popola la tabella studenti all'avvio
  populateTableS(register.viewClass());
});
