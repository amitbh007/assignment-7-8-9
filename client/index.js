"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//generic CRUD class
class CRUD {
    constructor(items) {
        this.items = items;
    }
    read() {
        return this.items;
    }
    //create 
    create(e) {
        this.items.push(e);
    }
    //update
    update(i, e) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            //api call to update the user
            const p = yield updateData(users.items[i].email, e);
            //update ui only if call was succesfull
            if ((_a = p === null || p === void 0 ? void 0 : p.data) === null || _a === void 0 ? void 0 : _a.updateUser) {
                //if success then change Ui
                this.items = (_b = p === null || p === void 0 ? void 0 : p.data) === null || _b === void 0 ? void 0 : _b.updateUser;
                renderTable();
            }
        });
    }
    //delete
    delete(i) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            //do changes in db
            const p = yield deleteData((_a = users.items[i]) === null || _a === void 0 ? void 0 : _a.email);
            if ((_b = p === null || p === void 0 ? void 0 : p.data) === null || _b === void 0 ? void 0 : _b.deleteUser) {
                //if success then change in UI
                this.items = p.data.deleteUser;
                renderTable();
            }
        });
    }
}
//initial data fetching and setting
$(document).ready(() => {
    console.log("ready");
    $("#loadBtn").click(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        $("table").html("");
        //show loader when fetching
        $("#loader").css("display", "block");
        try {
            // get data from db
            const response = yield getData();
            const finalData = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.getUsers;
            $("#loader").css("display", "none");
            $("#loadBtn").html("Reload Data");
            //create class instance
            users = new CRUD(finalData);
            renderTable();
            //show the table
            $("table").css("display", "block");
            console.log(finalData);
        }
        catch (err) {
            $("#loader").css("display", "none");
            console.log(err);
        }
    }));
});
//helper functions for DOM
function saveInit(i) {
    //iniilaize data which needs to be saved
    const roleInput = Number($(`#i_roleKey${i}`).val());
    let inputs = {};
    $(".inps").each(function () {
        const key = $(this).attr("name");
        let value = $(this).val();
        console.log("key", key);
        if (key == "roleKey") {
            let roleInput = value;
            value = roleInput == 0 ? Role.SUPER_ADMIN : roleInput == 1 ? Role.ADMIN : Role.SUBSCRIBER;
        }
        if (key)
            inputs = Object.assign(Object.assign({}, inputs), { [key]: value });
    });
    users.update(i, inputs);
}
function cancel(i) {
    $("table").find(`tr[id$="row${i}"]`).html(addRow({ type: "data", e: users.items[i], i }));
}
function edit(i) {
    $("table").find(`tr[id$="row${i}"]`).html(addRow({ type: "input", e: users.items[i], i }));
}
function renderTable() {
    console.log(users.items.length);
    if (users.items.length == 0) {
        console.log("now the length is zero");
        $("table").html(`no data now`);
    }
    else {
        users.items.every((e, i) => {
            $("table").html(addRow({ type: "title", e, i }));
            return false;
        });
        users.items.forEach((e, i) => {
            $("table").append(`<tr id="row${i}">` + addRow({ type: "data", e, i }) + `</tr>`);
        });
    }
}
function addRow({ type, e, i }) {
    let str = ``;
    if (type == "data" && e) {
        Object.keys(e).forEach(key => {
            if (key == "roleKey") {
                str += `<td class="${cellClass}">${Role[e.roleKey]}</td>`;
            }
            else
                str += `<td class="${cellClass}">${e[key]}</td>`;
        });
        str += `<td class="${cellClass}">
                <button class="${buttonClass}" onClick="edit(${i})">edit</button>
                <button class="${buttonClass}" onClick="users.delete(${i})" >delete</button>
            </td>`;
        return str;
    }
    if (type == "input" && e) {
        Object.keys(e).forEach(key => {
            if (key == "roleKey") {
                str += `<td class="${cellClass}" >
                <select id="i_roleKey${i}" class="inps" name="${key}">
                    <option value="0" ${e.roleKey == 0 ? 'selected' : ""} >${Role[0]}</option>
                    <option value="1" ${e.roleKey == 1 ? 'selected' : ""} >${Role[1]}</option>
                    <option value="2" ${e.roleKey == 2 ? 'selected' : ""} >${Role[2]}</option>
                </select>
            </td>`;
            }
            else
                str += `<td class="${cellClass}" ><input autocomplete="off" name="${key}" class="${inputClass} inps" id="i_${key}${i}" value="${e[key]}" type=""text /></td>`;
        });
        str += `<td class="${cellClass}" >
                <button class="${buttonClass}" onClick="saveInit(${i})">save</button> 
                <button class="${buttonClass}" onClick="cancel(${i})">cancel</button>
            </td>`;
        return str;
    }
    if (type == "title") {
        Object.keys(e).forEach(key => {
            str += `<th class="${titleClass}">${key}</th>`;
        });
        return str;
    }
    return "";
}
