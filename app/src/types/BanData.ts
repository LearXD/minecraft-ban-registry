type BanData = {
  id?: number,
  player_nick: string,
  player_xuid: string,
  reason: string,
  staff_nick: string,
  staff_xuid: string,
  date: string,
  banned: boolean
  error?: string
}

export default BanData;