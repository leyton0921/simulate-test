import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Post from "./postModel";

@Table({
    tableName: "users",
    timestamps: false
})
export default class User extends Model{
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.STRING(200),
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: false
    })
    email!: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: false
    })
    password!: string;

    @HasMany(()=>Post)
    spots!: Post[]
}