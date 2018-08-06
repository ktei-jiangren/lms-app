import axios from "axios";

export function getCourses() {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/courses")
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

export function getCourseById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/courses/${id}`)
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

export function createCourse(course) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/courses", course)
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

export function updateCourse(id, values) {
  return new Promise((resolve, reject) => {
    axios
      // here, API should read id from route other than payload
      // { ...values, id } should not be necessary
      .put(`/api/courses/${id}`, { ...values, id })
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

export function deleteCourse(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/courses/${id}`)
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
