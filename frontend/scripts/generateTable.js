class Table{
    constructor(tableObject, transactionObject=""){
        this.transactionObject = transactionObject;
        this.tableObject = tableObject;
        this.table = document.createElement("table");
    }

    static capitalize(a){
        const text = a.toString().split(" ").map(x=> x.slice(0,1).toUpperCase() + x.slice(1).toLowerCase())
        return text.join(" ");
    }

    static modify(key, value){
        if(key.toLowerCase() === "createdon") value = value.slice(0,10);
        if(/^[a-z]{1,}[A-Z]{1,}[a-z]{1,}$/.test(value)){
            return Table.capitalize(value.replace(/([A-Z])/g, " $1").toLowerCase());  
        }
        return Table.capitalize(value);
    }

    static addOption(name){
        let option = document.createElement("option");
        option.appendChild(document.createTextNode(Table.capitalize(name)));
        option.value = name;
        return option;
    }    
    static clientHead(input){
        let th = document.createElement("th");
        
        let headerContent = (typeof input === "string") ? document.createTextNode(input) : input;
        th.appendChild(headerContent);
        th.setAttribute("colspan", "2");
        return th;
    }
    generateHead(user){
        let thead = this.table.createTHead();
        let row1 = thead.insertRow();
        let row2 = thead.insertRow();

        if(user === "client"){
           let tableHeader =  Table.clientHead(`${Table.capitalize(this.transactionObject[0].type)} Account: ${this.transactionObject[0].accountNumber}`);
           row1.appendChild(tableHeader);
           const select = document.createElement("select");
           select.setAttribute("id", "BankAccountOption");
           select.setAttribute("name", "BankAccounts");

           for(let i = 0; i < this.tableObject.length; i+=1){
            select.appendChild(Table.addOption(this.tableObject[i].type));
           }

           tableHeader = Table.clientHead(select);
           row1.appendChild(tableHeader);
        }
        const tableRowNames = Object.keys(this.transactionObject[0]);
        for(let key of tableRowNames) {
            let th = document.createElement("th");
            let headerContent = document.createTextNode(Table.modify("_", key));
            th.appendChild(headerContent);
            row2.appendChild(th);
        }
        this.table.appendChild(row1);
        this.table.appendChild(row2);
    }
    generateBody(){
        for (let object of this.transactionObject) {
            let row = this.table.insertRow();
            for (let key in object) {
              let cell = row.insertCell();
              let content = document.createTextNode(Table.modify(key, object[key]));
              cell.appendChild(content);
            }
        }
    }
    createTable(user){ 
        if(this.transactionObject === "") return "No Transactions";
        this.generateHead(user);
        this.generateBody();
        return this.table;
    }
}
class newAccountTable{
    constructor (tableObject) {
        this.tableObject = tableObject;
        this.table = document.createElement("table");
    }
    static createRow(value) {
        let th = document.createElement("th");
        let headerContent = document.createTextNode(Table.modify("_", value));
        th.appendChild(headerContent);
        return th;
    }
    generateHead() {
        let thead = this.table.createTHead();
        let row = thead.insertRow();
        for(let object of this.tableObject) {
            row.appendChild(newAccountTable.createRow("Account Number", "th"));
            row.appendChild(newAccountTable.createRow(object.accountNumber, "th"));
        }
    }
    static createBodyRow(key, value, row){
        let cell = row.insertCell();
        let content = document.createTextNode(Table.modify(key, value));
        cell.appendChild(content);
    }
    generateBody(){
        const exception = ["owner", "id", "accountNumber"]
        let row;
        try{
            for (let key in this.tableObject[0]) {
                if(exception.indexOf(key) === -1){
                    row = this.table.insertRow();
                    newAccountTable.createBodyRow("_", key, row);
                    newAccountTable.createBodyRow(key, this.tableObject[0][key], row);
                    if(this.tableObject[1]){
                        newAccountTable.createBodyRow("_", key, row);
                        newAccountTable.createBodyRow(key, this.tableObject[1][key], row);                       
                    }
                }
            }this.table.appendChild(row);
        }catch(err){
            console.log(err);
        }
        
    }

    createTable(){ 
        this.generateHead();
        this.generateBody();
        console.log("here")
        return this.table;
    }
}