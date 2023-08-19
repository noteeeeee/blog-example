import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    uuid: string

    @Column()
    username: string

    @Column({ nullable: true })
    isAdmin: boolean

    @Column()
    password?: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}