import { Int,Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./Customer";
import {Role} from './Role'
//entities can also be turned into graphql types
//act as tables in sql
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!:number

  @Field()
  @Column()
  firstName!: string;

  @Field({nullable:true})
  @Column()
  middleName?: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column({unique:true})
  phone!: string;

  @Field()
  @Column({nullable:true})
  roleKey:number

  @Field()
  @ManyToOne(()=>Role,(role)=>role.owner)
  @JoinColumn()
  role:Role

  @Field()
  @Column({nullable:true})
  customerId:number

  @Field(()=>Customer)
  @OneToOne(()=>Customer,(customer)=>customer.owner)
  @JoinColumn()
  customer:Customer;

  @Field()
  @Column()
  address!: string;
        
  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}