import axios from "axios";

const options = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    _language: "en-US",
  },

  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTVhOTI3MjQxY2VlNjMzMDc5M2NkZDMzM2UxYmNmNyIsIm5iZiI6MTczMDMzMDQzNi45NzAxNTMzLCJzdWIiOiI2NzIyYjY2ZWZlMmE4YTAxMWVkNzJjOWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vvCM_i3H2vLSbeICltX5LmD5XHEc0TppaFZXq1Vf4lA",
  },
});

export async function fetchMovies() {
  try {
    const data = await options.get(`trending/movie/day`);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getMovie = async (id) => {
  const data = await options.get(`movie/${id}`);
  return data;
};

export const getCast = async (id) => {
  const data = await options.get(`movie/${id}/credits`);
  return data;
};

export const getReviews = async (id, page = 1) => {
  const data = await options.get(`movie/${id}/reviews`, { params: { page } });
  return data;
};

export const getMovies = async (query = "") => {
  const data = await options.get("search/movie", {
    params: { query, include_adult: false },
  });
  return data;
};