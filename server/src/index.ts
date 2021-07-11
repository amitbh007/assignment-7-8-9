import "reflect-metadata";
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import { RoleResolver } from './resolvers/role'
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Role } from "./entities/Role";
import { Customer } from "./entities/Customer";
import { CustomerResolver } from "./resolvers/customer";


const main = async ()=>{
    //connect to db, add entities
    const conn = await createConnection({
        type:"postgres",
        database:"test-sourcefuse",
        username:"user_1",
        password:"@MITbh123",
        logging:true,
        synchronize:true,
        entities:[User,Role,Customer]
    })

    // await User.delete({});
    const app = express();

    app.use(cors({
        origin:'http://127.0.0.1:5500',
    }))

    // await User.delete({});

    const appoloServer = new ApolloServer({
        schema:await buildSchema({
            resolvers:[UserResolver,RoleResolver,CustomerResolver],
            validate:false
        }),
        
    })

    //add the express server as middleware and enable /graphql playground
    appoloServer.applyMiddleware({app,cors:false});

    app.listen(4000,()=>{   
        console.log("server started at localhost 4000")
    })
}

main();