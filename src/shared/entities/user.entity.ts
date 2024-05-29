import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";


@Entity('user')
export class UserEntity extends BaseEntity {
    @Column()
    email: string

    @Column({
        type: "varchar",
        default: null,
      })
    password: string
}