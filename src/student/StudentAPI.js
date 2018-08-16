import axios from "axios";

export function getStudents(pageNumber = 1) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/students?pageNumber=${pageNumber}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

export function getStudentById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/students/${id}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

export function createStudent(student) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/students", student)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

export function updateStudent(id, values) {
  return new Promise((resolve, reject) => {
    axios
      // here, API should read id from route other than payload
      // { ...values, id } should not be necessary
      .put(`/api/students`, { ...values, id })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}

export function deleteStudent(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/students/${id}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(response.response);
        }
      })
      .catch(reject);
  });
}
