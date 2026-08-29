import axios from "axios";
import { baseurl } from "../../const/env";

export async function Signupapi(data: any) {
  let response = await axios.post(`${baseurl}/users/signup`, data);
  return response;
}
