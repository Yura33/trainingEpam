'use strict'

const form = document.querySelector('.form'),
      inputId = document.querySelector('.id'),
      inputFirstName = document.querySelector('.first-name'),
      inputSecondName = document.querySelector('.second-name'),
      inputAge = document.querySelector('.age'),
      inputSpec = document.querySelector('.specialization'),
      btnPrev = document.querySelector('.prev'),
      btnInsert = document.querySelector('.insert'),
      btnEdit = document.querySelector('.edit'),
      btnDelete = document.querySelector('.delete'),
      btnNext = document.querySelector('.next');

class Student {
  constructor(id, firstName, secondName, age, spec) {
    this.id = id.value.trim().toLowerCase(),
    this['first name'] = firstName.value.trim().toLowerCase(),
    this['second name'] = secondName.value.trim().toLowerCase(),
    this.age = age.value.trim().toLowerCase(),
    this.specialization = spec.value.trim().toLowerCase()
  }
}

const getStudent = async () => {
  const res = await fetch('http://localhost:3000/api/students');
  const json = await res.json();
  return json;
}
const getStudentId = async (id) => {
  const res = await fetch(`http://localhost:3000/api/students/${id}`);
  const json = await res.json();
  return json;
}

const createStudent = async (student) => {
  const res = await fetch('http://localhost:3000/api/students', {
    method: 'POST',
    body: JSON.stringify(student),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });
  const json = await res.json();
  return json;
}

const updateStudent = async (id, student) => {
  const res = await fetch(`http://localhost:3000/api/students/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(student),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });
  const json = await res.json();
  if(res.ok) return alert(`The data of the student with ID ${id} has been changed`);
  return json;
}

const deleteStudent = async (id, student) => {
  const res = await fetch(`http://localhost:3000/api/students/${id}`, {
    method: 'DELETE',
    body: JSON.stringify(student),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });
  const json = await res.json();
  return json;
}

const clearValue = () => {
  [...form.elements].forEach(input => {
    input.value = '';
  });
}

const showStudent = (student) => {
  inputId.value = student.id;
  inputFirstName.value = student['first name'];
  inputSecondName.value = student['second name'];
  inputAge.value = student.age;
  inputSpec.value = student.specialization;
}

const showError = (res) => {
  const errorsName = [];
  const errorsMsg = [];
  res.errors.forEach(({field, message}) => {
    errorsName.push(field);
    errorsMsg.push(message);
  });
  [...form.elements].forEach(input => {
    if(input.name === errorsName.find(i => i === input.name)) input.classList.add('err');
  });
  alert(`You have not entered all the data: ${(errorsMsg.join(', '))}! Please fill out and try again`);
}

btnInsert.addEventListener('click', async (e) => {
  e.preventDefault();
  const student = new Student(inputId, inputFirstName, inputSecondName, inputAge, inputSpec);
  const resGetId = await getStudentId(student.id);
  if(!resGetId.id) {
    const resCreate = await createStudent(student);
    resCreate.errors ? showError(resCreate) : alert(`Student with ID ${resCreate.id} has been successfully registered in the DB`);
  } else {
    alert(`Student with ID ${student.id} already exists`);
    inputId.focus();
  }
});

btnPrev.addEventListener('click', async (e) => {
  e.preventDefault();
  const student = new Student(inputId, inputFirstName, inputSecondName, inputAge, inputSpec);
  const studentList = await getStudent();
  if(studentList.length) {
    if(student.id) {
      const resGetId = await getStudentId(student.id);
      let currentIndex = null;
      let prevIndex = null;
      studentList.forEach((item, index) => {
        if(item.id === resGetId.id) {
          currentIndex = index;
          prevIndex = studentList[index - 1]; 
        } 
      });
      currentIndex !== 0 ? showStudent(prevIndex) : alert(`Student with the ID ${resGetId.id} is the first in DB`);
    } else {
      alert('Since the ID is not entered, the first student is output');
      showStudent(studentList[0]);
    }
  } else {
    alert('DB is empty');
  }
});

btnNext.addEventListener('click', async (e) => {
  e.preventDefault();
  const student = new Student(inputId, inputFirstName, inputSecondName, inputAge, inputSpec);
  const studentList = await getStudent();
  if(studentList.length) {
    if(student.id) {
      const resGetId = await getStudentId(student.id);
      let currentIndex = null;
      let nextIndex = null;
      studentList.forEach((item, index) => {
        if(item.id === resGetId.id) {
          currentIndex = index;
          nextIndex = studentList[index + 1]; 
        } 
      });
      currentIndex !== studentList.length - 1 ? showStudent(nextIndex) : alert(`Student with the ID ${resGetId.id} is the last in DB`);
    } else {
      alert('Since the ID is not entered, the first student is output');
      showStudent(studentList[0]);
    }
  } else {
    alert('DB is empty');
  }
});

btnEdit.addEventListener('click', async (e) => {
  e.preventDefault();
  const student = new Student(inputId, inputFirstName, inputSecondName, inputAge, inputSpec);
  const response = await updateStudent(student.id, student);
  if(response) response.errors ? showError(response) : alert(response.message);
});

btnDelete.addEventListener('click', async (e) => {
  e.preventDefault();
  const student = new Student(inputId, inputFirstName, inputSecondName, inputAge, inputSpec);
  const response = await deleteStudent(student.id, student);
  if(response.message) {
    alert(response.message)
  } else {
    alert(`Student with ID ${student.id } removed from DB`);
    clearValue();
  }
});

[...form.elements].forEach(input => {
  if(input.tagName === 'INPUT') {
    input.addEventListener('blur', () =>  input.value.trim() ? input.classList.remove('err') : null);
  }
});