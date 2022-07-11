import { baseURL } from "../services/api";

export default (skin: string): string => {

  return `${baseURL}/head/${skin}.png`;
}