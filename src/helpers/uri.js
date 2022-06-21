import { IP_ADDRESS } from "../../environment";


export const uriFormatter = string => {
  return string?.replace('localhost:', `http://${IP_ADDRESS}:`);
};
