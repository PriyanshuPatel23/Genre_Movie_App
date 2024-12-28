import axios from "../../utils/axios";
import { loadperson } from "../reducers/personSlice";
export { removeperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalids = await axios.get(`/person/${id}/external_ids`);
    const combinedcredits = await axios.get(`/person/${id}/combined_credits`);
    const tvcredits = await axios.get(`/person/${id}/tv_credits`);
    const moviecredits = await axios.get(`/person/${id}/movie_credits`);

    let thedetails = {
      detail: detail.data,
      externalids: externalids.data,
      combinedcredits: combinedcredits.data,
      tvcredits: tvcredits.data,
      moviecredits: moviecredits.data,
    };
    dispatch(loadperson(thedetails));
    console.log(thedetails);
  } catch (error) {
    console.error("error", error);
  }
};
