import React, { MouseEvent } from "react"
import getBanSkin from "../../helpers/getBanSkin"
import api from "../../services/api"
import BanData from "../../types/BanData"
import { Face } from "../Face"
import * as S from "./styled"

type Props = {
  ban: BanData,
  onDelete: (nick?: string) => void
}

export const BanInfo: React.FC<Props> = ({ ban, onDelete}) => {  

  return (
    <S.BanInfo>
      <S.Face>
        <Face
          image={getBanSkin(ban.player_nick)}
        />
      </S.Face>
      <S.Details>
        <div>
          <span>ID:</span>
          <p>{ban.id}</p>
        </div>
        <div>
          <span>Nick:</span>
          <p>{ban.player_nick}</p>
        </div>
        <div>
          <span>Staff:</span>
          <p>{ban.staff_nick}</p>
        </div>
        <div>
          <span>Reason:</span>
          <p>{ban.reason}</p>
        </div>
        <div>
          <span>Date:</span>
          <p>{ban.date}</p>
        </div>
        <div>
          <span>Banned:</span>
          <p>{ban.banned ? "Yes" : "No"}</p>
        </div>
        <S.Remove>
          <button onClick={() => {
            onDelete()
          }} >Remove</button>
        </S.Remove>
      </S.Details>
    </S.BanInfo>
  )
}