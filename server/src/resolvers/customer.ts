import { Customer } from "../entities/Customer";
import { Field, InputType, Mutation, Query,Resolver } from "type-graphql";
// import { Role } from "../entities/Role";

@InputType()
class CustomerInputType{
    @Field()
    name!: string;

    @Field({nullable:true})
    website?: string;

    @Field()
    address!: string;  
}

@Resolver()
export class CustomerResolver{
    @Query(()=>[Customer])
    async getCustomers():Promise<Customer[]>{
        return Customer.find();
    }

    @Mutation(()=>[Customer])
    async addCustomer(
    ):Promise<Customer[]>{
        //you need to create a new customer for every new user
        const newCustomer:CustomerInputType = {
            name:"name3",
            website:"abc.com",
            address:"lokesh nagar"
        }

        await Customer.create(newCustomer).save();
        
        return await Customer.find()

    } 

    @Mutation(()=>[Customer])
    async deleteAllCustomers(
        // @Arg('email') email:string,
    ){
        return await Customer.delete({});
    } 

}