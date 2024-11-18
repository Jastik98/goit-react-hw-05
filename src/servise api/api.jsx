import axios from "axios";

const url =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

const urlMovies =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
// const url3 = "https://api.themoviedb.org/3/movie/912649?language=en-US";
const url3 = `"https://api.themoviedb.org/3/find/912649?external_source="`;
const url4 = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const url5 =
  "https://api.themoviedb.org/3/keyword/912649/movies?include_adult=false&language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTVhOTI3MjQxY2VlNjMzMDc5M2NkZDMzM2UxYmNmNyIsIm5iZiI6MTczMDMzMDQzNi45NzAxNTMzLCJzdWIiOiI2NzIyYjY2ZWZlMmE4YTAxMWVkNzJjOWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vvCM_i3H2vLSbeICltX5LmD5XHEc0TppaFZXq1Vf4lA",
  },
};

export async function fetchMovies() {
  try {
    const response = await axios.get(urlMovies, options);
    const data = await response.data.results;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchTrendedDetails(filmId) {
 
  
  const detailsUrl = `https://api.themoviedb.org/3/movie/${filmId}?language=en-US`;
  try {
    const response = await axios.get(detailsUrl, options);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
