"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const Customer_1 = require("../entities/Customer");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
let UserInputType = class UserInputType {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInputType.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserInputType.prototype, "middleName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInputType.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInputType.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInputType.prototype, "phone", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], UserInputType.prototype, "roleKey", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserInputType.prototype, "customerName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInputType.prototype, "address", void 0);
UserInputType = __decorate([
    type_graphql_1.InputType()
], UserInputType);
let UserResolver = class UserResolver {
    customerName(root) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = yield Customer_1.Customer.findOne(root.customerId);
            if (p)
                return p.name;
            else
                return "none";
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.find({ relations: ["customer"] });
        });
    }
    addUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User_1.User.create(newUser).save();
            return yield User_1.User.find();
        });
    }
    updateUser(email, newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newUser.customerName)
                delete newUser.customerName;
            yield User_1.User.update({ email }, Object.assign({}, newUser));
            return User_1.User.find();
        });
    }
    deleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User_1.User.delete({ email });
            return yield User_1.User.find();
        });
    }
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.delete({});
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "customerName", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    type_graphql_1.Mutation(() => [User_1.User]),
    __param(0, type_graphql_1.Arg('newUser', () => UserInputType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInputType]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addUser", null);
__decorate([
    type_graphql_1.Mutation(() => [User_1.User]),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Arg('newUser', () => UserInputType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UserInputType]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    type_graphql_1.Mutation(() => [User_1.User]),
    __param(0, type_graphql_1.Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    type_graphql_1.Mutation(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteAllUsers", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map