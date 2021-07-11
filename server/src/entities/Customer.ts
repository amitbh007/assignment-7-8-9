import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

//entities can also be turned into graphql types
//act as tables in sql
@ObjectType()
@Entity()
export class Customer extends BaseEntity {
    
  @Field(()=>Int)
  @PrimaryGeneratedColumn({type:"int"})
  id!:number

  @Field()
  @Column({unique:true})
  name!: string;

  @Field({nullable:true})
  @Column()
  website?: string;

  @Field()
  @Column()
  address!: string;  

  @Field()
  @Column({nullable:true})
  ownerId:string;
  
  @Field(()=>User)
  @OneToOne(()=>User,(user)=>user.customer)
  owner:User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

}