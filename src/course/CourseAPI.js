import axios from "axios";

export function getCourses() {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/courses")
      .then(response => {
        resolve(response.data);
      })
      .catch(reject);
  });
}
