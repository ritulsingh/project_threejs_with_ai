const config = {
  development: {
    backendUrl: "http://localhost:8080/api/generate-image",
  },
  production: {
    backendUrl: "https://devswag.onrender.com/api/v1/dalle",
  },
};

export default config;
