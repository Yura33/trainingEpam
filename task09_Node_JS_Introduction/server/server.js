const { existsSync, readFileSync, writeFileSync } = require('fs');
const { createServer } = require('http');
const DB_FILE = './db.json';
const URI_PREFIX = '/api/students';
const PORT = 3000;

// Error class, used to send a response with a specific error code and description
class ApiError extends Error {
  constructor(statusCode, data) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

// Async reading the request body and parsing it as JSON
function drainJson(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(JSON.parse(data));
    });
  });
}

// checking the input data and creating a correct student object from them
function makeStudentFromData(data) {
  const errors = [];

  const student = {
    id: data.id && String(data.id),
    ['first name']: data['first name'] && String(data['first name']),
    ['second name']: data['second name'] && String(data['second name']),
    age: data.age && String(data.age),
    specialization: data.specialization && String(data.specialization),
  };

  if(!student.id) errors.push({ field: 'id', message: 'id not specified' });
  if(!student['first name']) errors.push({ field: 'first name', message: 'first name not specified' });
  if(!student['second name']) errors.push({ field: 'second name', message: 'second name not specified' });
  if(!student.age) errors.push({ field: 'age', message: 'age not specified' });
  if(!student.specialization) errors.push({ field: 'specialization', message: 'specialization not specified' });

  if(errors.length) throw new ApiError(422, { errors });

  return student;
}

// Returning the list of students from DB
function getStudentList(params = {}) {
  const studentList = JSON.parse(readFileSync(DB_FILE) || '[]');
  if(params.id) return studentList.filter(({ id }) => id === params.id);
  return studentList;
}

// Creating and saving a student in DB
function createStudent(data) {
  const newStudent = makeStudentFromData(data);
  writeFileSync(DB_FILE, JSON.stringify([...getStudentList(), newStudent]), { encoding: 'utf8' });
  return newStudent;
}

// Returning a student object by its ID
function getStudent(studentId) {
  const student = getStudentList().find(({ id }) => id === studentId);
  if(!student) throw new ApiError(404, {message: 'Student Not Found'});
  return student;
}

// Changing the student with the specified ID and save the changes to DB
function updateStudent(studentId, data) {
  const students = getStudentList();
  const itemIndex = students.findIndex(({ id }) => id === studentId);
  if(itemIndex === -1) throw new ApiError(404, {message: 'Student Not Found'});
  Object.assign(students[itemIndex], makeStudentFromData({...students[itemIndex], ...data}));
  writeFileSync(DB_FILE, JSON.stringify(students), { encoding: 'utf8' });
  return students[itemIndex];
}

// Deleting a student from the DB
function deleteStudent(studentId) {
  const students = getStudentList();
  const itemIndex = students.findIndex(({ id }) => id === studentId);
  if(itemIndex === -1) throw new ApiError(404, {message: 'Student Not Found'});
  students.splice(itemIndex, 1);
  writeFileSync(DB_FILE, JSON.stringify(students), { encoding: 'utf8' });
  return {};
}

// Creating a new database file if it does not exist
if(!existsSync(DB_FILE)) writeFileSync(DB_FILE, '[]', { encoding: 'utf8' });

// creating an HTTP server, the passed function will respond to all requests to it
createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if(req.method === 'OPTIONS') {
    res.end();
    return;
  }

  if(!req.url || !req.url.startsWith(URI_PREFIX)) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
    return;
  }

  const [uri, query] = req.url.slice(URI_PREFIX.length).split('?');
  const queryParams = {};

  if(query) {
    for(const piece of query.split('&')) {
      const [key, value] = piece.split('=');
      queryParams[key] = value ? decodeURIComponent(value) : '';
    }
  }

  try {
    const body = await (async () => {
      if(uri === '' || uri === '/') {
        if(req.method === 'GET') return getStudentList(queryParams);
        if(req.method === 'POST') {
          const newStudent = createStudent(await drainJson(req));
          res.statusCode = 201;
          res.setHeader('Location', `${URI_PREFIX}/${newStudent.id}`);
          return newStudent;
        }
      } else {
        const itemId = uri.slice(1);
        if(req.method === 'GET') return getStudent(itemId);
        if(req.method === 'PATCH') return updateStudent(itemId, await drainJson(req));
        if(req.method === 'DELETE') return deleteStudent(itemId);
      }
      return null;
    })();
    res.end(JSON.stringify(body))
  } catch(err) {
    if(err instanceof ApiError) {
      res.writeHead(err.statusCode);
      res.end(JSON.stringify(err.data));
    } else {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'Server Error' }));
      console.error(err);
    }
  }
})
// Output instructions as soon as the server is started...
  .on('listening', () => {
    console.log(`The server is running. You can use it at http://localhost:${PORT}`);
    console.log('Press CTRL+C to stop the server');
    console.log('Available methods:');
    console.log(`GET ${URI_PREFIX} - get a list of students`);
    console.log(`POST ${URI_PREFIX} - to create a case, in the request body you need to pass the object { id: string, first-name: string, second-name: string, age: string, specialization: string }`);
    console.log(`GET ${URI_PREFIX}/{id} - get a student by his ID`);
    console.log(`PATCH ${URI_PREFIX}/{id} - change a student with ID, in the request body you need to pass the object { id: string, first-name: string, second-name: string, age: string, specialization: string }`);
    console.log(`DELETE ${URI_PREFIX}/{id} - delete a student by ID`);
  })
// Starting the server
  .listen(PORT);