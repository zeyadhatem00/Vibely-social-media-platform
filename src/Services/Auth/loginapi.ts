import axios from "axios";
import { baseurl } from "../../const/env";

export async function loginapi(data: any) {
  let response = await axios.post(`${baseurl}/users/signin`, data);
  return response;
}
