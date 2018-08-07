export function getValidationErrors(err) {
  const validationErrors = err.inner.reduce((x, y) => {
    x[y.path] = y.message;
    return x;
  }, {});
  return validationErrors;
}

export function getHostUrl() {
  return HOST_URL || process.env.HOST_URL;
}

export function getApiUrl() {
  return API_URL || process.env.API_URL;
}
