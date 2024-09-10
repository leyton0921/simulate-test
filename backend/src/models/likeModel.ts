import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Spot from "./postModel";
import Post from "./postModel";


@Table({
    tableName: "likes",
    timestamps: false
})
export default class Like extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!:number;
    
    @Column({
        type:DataType.INTEGER,
        allowNull: false
    })
    quantity!:number;

    @ForeignKey(()=>Post)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    post_id!: number
}