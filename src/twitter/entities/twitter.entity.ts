import { Column, Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'twitters' })
export class Twitter extends Model {
  @Column
  text: string;
}
