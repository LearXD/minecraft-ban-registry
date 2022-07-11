import { useEffect, useState } from "react";
import api from "../../services/api";
import BanData from "../../types/BanData";
import { BanInfo } from "../BanInfo";
import * as S from "./styled";

export const Box: React.FC = () => {

  var date = new Date(6);
  const today = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth()).toString().padStart(2, "0")}/${date.getFullYear()}`

  const [getAllBans, setAllBans] = useState<BanData[]>([])

  useEffect(() => {
    api.get('/listing-bans')
      .then(result => {
        setAllBans(result.data.listing)
      })
  }, [getAllBans]);

  async function handleClickDelete(nick: string) {
    await api.delete('/deleteban', {
      data: {
        nick
      }
    })
    getAllBans.findIndex((ban, index) => {
      if (ban.player_nick == nick) {
        getAllBans.splice(index, 1);
        return;
      }
    })
  }

  return (
    <S.Container>
      <S.Title>
        <h2>List of Players Banned</h2>
      </S.Title>
      <S.Search>
      </S.Search>

      <S.BanBox>
        <S.Contents>
          {
            getAllBans.length ? getAllBans?.map((data, key) => (
              <BanInfo key={key}
                onDelete={() => handleClickDelete(data.player_nick)}
                ban={data}
              />
            )) : <S.Title>So far not one player has been banned {today}</S.Title>
          }
        </S.Contents>
      </S.BanBox>

    </S.Container>
  )
}