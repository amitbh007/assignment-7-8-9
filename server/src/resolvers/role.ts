import { Field, InputType, Mutation, Query,Resolver } from "type-graphql";
import { Role } from "../entities/Role";

@InputType()
class RoleInputType{
    @Field()
    name!: string;

    @Field()
    key?: number;
}

@Resolver()
export class RoleResolver{
    @Query(()=>[Role])
    async getRoles():Promise<Role[]>{
        return Role.find();
    }

    @Mutation(()=>[Role])
    async addRole(
    ):Promise<Role[]>{
        const newRole:RoleInputType = {
            key:1,
            name:"ADMIN",
        }

        await Role.create(newRole).save();
        
        return await Role.find()

    } 

    

}