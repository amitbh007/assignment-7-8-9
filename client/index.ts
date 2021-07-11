//generic CRUD class
class CRUD <T>{

    //read
    items:Array<T>;

    constructor(items:T[]){
        this.items = items;
    }

    read():T[]{
        return this.items;
    }

    //create 
    create(e:T):void{
        this.items.push(e)
    }

    //update
    async update(i:number,e:T){
        //api call to update the user
        const p = await updateData(users.items[i].email,e);
        //update ui only if call was succesfull
        if(p?.data?.updateUser){
            //if success then change Ui
            this.items = p?.data?.updateUser;
            renderTable<T>();
        }
    }

    //delete
    async delete(i:number){
        //do changes in db
        const p = await deleteData(users.items[i]?.email);
        if(p?.data?.deleteUser){
            //if success then change in UI
            this.items = p.data.deleteUser;
            renderTable<User>();
        }
    }

}

//initial data fetching and setting
$(document).ready(()=>{
    console.log("ready")
    
    $("#loadBtn").click(async ()=>{

        $("table").html("");
        //show loader when fetching
        $("#loader").css("display","block");
        try{
            // get data from db
            const response = await getData()
            const finalData:Array<User> = response?.data?.getUsers
            $("#loader").css("display","none");
            $("#loadBtn").html("Reload Data")
            
            //create class instance
            users = new CRUD<User>(finalData)
            renderTable<User>();

            //show the table
            $("table").css("display","block");
            console.log(finalData);
        }
        catch(err){
            $("#loader").css("display","none");
    
            console.log(err)
        }
    })
})


//helper functions for DOM
function saveInit<T>(i:number){

    //iniilaize data which needs to be saved
    const roleInput = Number($(`#i_roleKey${i}`).val())
    let inputs = {};
    $(".inps").each(function(){
        const key = $(this).attr("name");
        let value = $(this).val();
        console.log("key",key);
        if(key=="roleKey"){
            
            let roleInput = value;
            value = roleInput==0?Role.SUPER_ADMIN:roleInput==1?Role.ADMIN:Role.SUBSCRIBER
        }
        if(key)
        inputs = {
            ...inputs,
            [key]:value
        }
    })

    users.update(i,inputs);
}

function cancel(i:number){
    $("table").find(`tr[id$="row${i}"]`).html(addRow<User>({type:"data",e:users.items[i],i}))
}

function edit(i:number){
    $("table").find(`tr[id$="row${i}"]`).html(addRow<User>({type:"input",e:users.items[i],i}));
}

function renderTable<T>(){
    console.log(users.items.length);
    if(users.items.length==0){
        console.log("now the length is zero")
        $("table").html(`no data now`);
    }
    else{
        users.items.every((e:T,i:number)=>{
            $("table").html(addRow<T>({type:"title",e,i}));
            return false;
        })
        users.items.forEach((e:T,i:number)=>{
            $("table").append(`<tr id="row${i}">`+addRow<T>({type:"data",e,i})+`</tr>`);
        })
    }
    
}

function addRow<T>({type,e,i}:{type:string,e:T,i?:number}):string{
    
    let str = ``;
    if(type=="data"&&e){
        Object.keys(e).forEach(key=>{
            if(key == "roleKey"){
                str+= `<td class="${cellClass}">${Role[(e as any).roleKey]}</td>`
            }
            else str+= `<td class="${cellClass}">${(e as any)[key]}</td>`;
        })
        
        str+= `<td class="${cellClass}">
                <button class="${buttonClass}" onClick="edit(${i})">edit</button>
                <button class="${buttonClass}" onClick="users.delete(${i})" >delete</button>
            </td>`
        return str;
    }
    
    if(type=="input"&&e){
        Object.keys(e).forEach(key=>{
            if(key == "roleKey"){
                str+= `<td class="${cellClass}" >
                <select id="i_roleKey${i}" class="inps" name="${key}">
                    <option value="0" ${(e as any).roleKey==0?'selected':""} >${Role[0]}</option>
                    <option value="1" ${(e as any).roleKey==1?'selected':""} >${Role[1]}</option>
                    <option value="2" ${(e as any).roleKey==2?'selected':""} >${Role[2]}</option>
                </select>
            </td>`
            } 
            else str+= `<td class="${cellClass}" ><input autocomplete="off" name="${key}" class="${inputClass} inps" id="i_${key}${i}" value="${(e as any)[key]}" type=""text /></td>`;
        })

        str+= `<td class="${cellClass}" >
                <button class="${buttonClass}" onClick="saveInit(${i})">save</button> 
                <button class="${buttonClass}" onClick="cancel(${i})">cancel</button>
            </td>`

        return str;
       
    }

    if(type=="title"){
        Object.keys(e).forEach(key=>{
            str+= `<th class="${titleClass}">${key}</th>`;
        })
        return str;
    }
    return "";
}


