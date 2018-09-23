import axios from "axios";

export function getLecturers() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/lecturers`)
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
