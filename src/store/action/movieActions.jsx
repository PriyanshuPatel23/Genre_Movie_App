import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";
export { removemovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalids = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const wathprovider = await axios.get(`/movie/${id}/watch/providers`);
    let thedetails = {
      detail: detail.data,
      externalids: externalids.data,
      recommendations: recommendations.data.results,
      similar: similar.data,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data,
      wathprovider: wathprovider.data.results.IN,
    };
    dispatch(loadmovie(thedetails));
    console.log(thedetails);
  } catch (error) {
    console.error("error", error);
  }
};
