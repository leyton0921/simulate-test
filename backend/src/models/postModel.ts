import { AutoIncrement, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./userModel";
import Like from "./likeModel";

@Table({
    tableName: "posts",
    timestamps: false
})
export default class Post extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!:number;

    @Column({
        type: DataType.STRING(200),
        allowNull: false
    })
    title!:string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    description!:string;

    @ForeignKey(()=>User)
    @Column({
        type: DataType.INTEGER,
        allowNull:false
    })
    user_id!:number;

    @HasMany(()=>Like)
    likes!:Like[];
}