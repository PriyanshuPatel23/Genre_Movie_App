import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODJmODllZGQxZTU3YWZiODRlZjUwYWUyNTY2MzdhMCIsIm5iZiI6MTczNTEyNDIxMC4yNzEwMDAxLCJzdWIiOiI2NzZiZTRmMmQzYzYxNDk1MjJhOWVhNWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sX9-HocFxsYY3wtihjwWev99WFc9b1tPE8Dq5jqKexE",
  },
});
export default instance;
