import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export default class Ban {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  player_nick: string

  @Column('text')
  player_xuid: string  

  @Column('text')
  reason: string

  @Column('text')
  staff_nick: string

  @Column('text')
  staff_xuid: string

  @Column('text')
  date: string

  @Column('boolean')
  banned: boolean
}