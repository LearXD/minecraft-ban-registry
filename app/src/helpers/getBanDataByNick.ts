import { AxiosResponse } from "axios"
import api from "../services/api"
import BanData from "../types/BanData"

export default async (nick: string): Promise<BanData> => {
  return await api.get('/singleban', {
    params: {
      nick
    }
  }).then(result => {
    console.log(result.data)
    return result.data;
  })
}