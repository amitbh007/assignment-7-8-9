import { Int,Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

//entities can also be turned into graphql types
//act as tables in sql
@ObjectType()
@Entity()
export class Role extends BaseEntity {
    
  @Field()
  @Column()
  name!: string;

  @Field()
  @PrimaryColumn({unique:true})
  key?: number;

  @ManyToOne(type => User,(user)=>user.role)
  @JoinColumn()
  owner: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

}