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
exports.CustomerResolver = void 0;
const Customer_1 = require("../entities/Customer");
const type_graphql_1 = require("type-graphql");
let CustomerInputType = class CustomerInputType {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CustomerInputType.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CustomerInputType.prototype, "website", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CustomerInputType.prototype, "address", void 0);
CustomerInputType = __decorate([
    type_graphql_1.InputType()
], CustomerInputType);
let CustomerResolver = class CustomerResolver {
    getCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            return Customer_1.Customer.find();
        });
    }
    addCustomer() {
        return __awaiter(this, void 0, void 0, function* () {
            const newCustomer = {
                name: "name3",
                website: "abc.com",
                address: "lokesh nagar"
            };
            yield Customer_1.Customer.create(newCustomer).save();
            return yield Customer_1.Customer.find();
        });
    }
    deleteAllCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Customer_1.Customer.delete({});
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Customer_1.Customer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "getCustomers", null);
__decorate([
    type_graphql_1.Mutation(() => [Customer_1.Customer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "addCustomer", null);
__decorate([
    type_graphql_1.Mutation(() => [Customer_1.Customer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "deleteAllCustomers", null);
CustomerResolver = __decorate([
    type_graphql_1.Resolver()
], CustomerResolver);
exports.CustomerResolver = CustomerResolver;
//# sourceMappingURL=customer.js.map