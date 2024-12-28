import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";
export { removetv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalids = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const wathprovider = await axios.get(`/tv/${id}/watch/providers`);
    let thedetails = {
      detail: detail.data,
      externalids: externalids.data,
      recommendations: recommendations.data.results,
      similar: similar.data,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data,
      wathprovider: wathprovider.data.results.IN,
    };
    dispatch(loadtv(thedetails));
    console.log(thedetails);
  } catch (error) {
    console.error("error", error);
  }
};
