const emptyData = (value) => {
    const div = document.createElement("div");
    div.style.fontSize = "25px";
    const divText = document.createTextNode(value);
    div.appendChild(divText);
    return Table.fullElement(div);
}

let count = 0;

let maxPageNumber = 7;
class Table{
    constructor(tableObject, ownerObject="", button){
        this.ownerObject = ownerObject;
        this.tableObject = tableObject;
        this.button = button;
        this.table = document.createElement("table");
        this.exception = ["owner","id"];
        this.transactionException = ["accountNumber", "cashier", "oldbalance"];
        this.pageNumber;
        this.newTable;
        this.objCount = 1;
    }

    static capitalize(a){
        const text = a.toString().split(" ").map(x=> x.slice(0,1).toUpperCase() + x.slice(1).toLowerCase())
        return text.join(" ");
    }

    static modify(key, value){
        if(key.toLowerCase() === "createdon") value = value.slice(0,10);
        if(value === "newbalance") return "Balance";
        if(value === "depositor_name") return "Depositor";
        if(value === "depositor_phone_number") return "Phone Number";
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
    static clientHead(input, user){
        let th = document.createElement("th");
        let headerContent = (typeof input === "string") ? document.createTextNode(input) : input;
        th.appendChild(headerContent);
        if(user === "client2") th.setAttribute("colspan", "3");
        if(user === "client") {
            th.setAttribute("colspan", "4");
            const badge = input.split(" ")[0].toLowerCase();
            th.id = `${badge}Badge`;
            if(count === 1) th.classList.add("makeInvisible");
            count++;
        }
        return th;
    }
    generateHead(user){
        let thead = this.table.createTHead();
        let row = thead.insertRow();
        let row1 = thead.insertRow();
        const exception = (this.ownerObject) ? this.transactionException : this.exception;
        if(user === "client"){
           let tableHeader;
           for(let i = 0; i < this.ownerObject.length; i+=1){
               tableHeader =  Table.clientHead(`${Table.capitalize(this.ownerObject[i].type)} Account: ${this.ownerObject[i].accountNumber}`, "client");
               row.appendChild(tableHeader);
           }
           const select = document.createElement("select");
           select.setAttribute("id", "BankAccountOption");
           select.setAttribute("name", "BankAccounts");

           for(let i = 0; i < this.ownerObject.length; i+=1){
            select.appendChild(Table.addOption(this.ownerObject[i].type));
           }

           tableHeader = Table.clientHead(select, "client2");
           row.appendChild(tableHeader);
        }
        const tableRowNames = Object.keys(this.tableObject[0]);
        if(user === "staff"){
            let th = Table.clientHead("S/N");
            row1.appendChild(th);
        } 
        try{
            for(let key of tableRowNames) {
                if(exception.indexOf(key) === -1){
                    let th = Table.clientHead(Table.modify("_", key));
                    row1.appendChild(th);
                }
            }
        }catch(err){
            console.log(err);
        }

        let th = Table.clientHead("Action");
        th.style.minWidth = "100px";
        row1.appendChild(th);

        thead.appendChild(row);
        thead.appendChild(row1);
        this.table.appendChild(thead);
        return;
    }
    createLink(value, num, status){
        const a = document.createElement("a");
        let i;
        let linkText;
        if(value === "Delete"){
            i = document.createElement("i");
            i.classList.add("fas")
            i.classList.add("fa-user-minus")
        }else{
            linkText = document.createTextNode(value);       
        }
        a.classList.add("normal-link")
        if(value === "Delete") a.classList.add("delete-link");
        else a.classList.add("view-link");
        if(value === "View")  a.setAttribute("onclick", `modal(${num}, "${status}")`);
        if(value === "Delete") a.setAttribute("onclick", `deleteSpecificAccount(${num})`);
        a.href = "#"; 
        a.title = num;
        const text = (value === "View") ? linkText : i;
        a.appendChild(text);
        return a;
    }
    emptyRow(id){
        let tbody = this.table.createTBody();
        tbody.id = id;
        tbody.classList.add("makeInvisible")
        let row = tbody.insertRow();
        let cell = row.insertCell();
        let rowContent = document.createTextNode("No Transaction");
        cell.classList.add("center")
        cell.setAttribute("colspan", "100%");
        cell.appendChild(rowContent);
        return;
    }
    tableWithPages(noOfPages, pgClass, user){
        const pagination = new Pagination(noOfPages, user);
        const div = document.createElement("div");
        if(noOfPages < 2) div.id = pgClass;
        div.appendChild(this.table);
        div.appendChild(pagination.createPages(pgClass));
        if (user === "staff") return Table.fullElement(div);
        this.newTable = div;
        return this.newTable;
    }
    tableWithButton(){
        const div = document.createElement("div");
        const button = document.createElement("button");
        button.appendChild(document.createTextNode(this.button));
        button.setAttribute("onclick", "closeViewSpecificAccount()");
        button.classList.add("form-btn")
        button.classList.add("btn-sm")
        button.classList.add("btn")
        div.appendChild(this.table);
        div.appendChild(button);
        this.newTable = div;
        return this.newTable;
    }
    static fullElement(element){
        const div = document.createElement("div");
        const select = document.createElement("select");
        select.setAttribute("id", "BankAccountStatus");
        select.setAttribute("onchange", "loadAccountByStatus()");
        select.classList.add("selectAccount");

        select.appendChild(Table.addOption("All"));
        select.appendChild(Table.addOption("active"));
        select.appendChild(Table.addOption("dormant"));
        div.appendChild(select);
        if(element) div.appendChild(element);
        this.newTable = div;
        return this.newTable;
    }
    static noOfPages(array, user){
        if(user) maxPageNumber = 5;
        return Math.ceil(array/maxPageNumber);
    }
    generateBodyClient(user){
        try{
            const currentAccount = this.ownerObject.filter(x=>x.type.toLowerCase() === "current");
            const savingsAccount = this.ownerObject.filter(x=>x.type.toLowerCase() === "savings");
            let currentTransactions;
            let savingsTransactions;

            if(currentAccount.length > 0) currentTransactions = this.tableObject.filter(x=>x.accountNumber === currentAccount[0].accountNumber);
            if(savingsAccount.length > 0) savingsTransactions = this.tableObject.filter(x=>x.accountNumber === savingsAccount[0].accountNumber);
            if(currentAccount.length >= 1){
                if(currentTransactions.length < 1) this.emptyRow("currentAccount");
                else this.generateBody(currentTransactions, user, "currentAccount", Table.noOfPages(currentTransactions.length));
            }

            if(savingsAccount.length >= 1){
                if(savingsTransactions.length < 1) this.emptyRow("savingsAccount");        
                else this.generateBody(savingsTransactions, user, "savingsAccount",  Table.noOfPages(savingsTransactions.length));
            }
        }catch(err){
            console.log(err);
        }
        return this.newTable || this.table;
    }
    generateBody(tableobject, user, bodyid, pages){
        let tbody = this.table.createTBody();
        if(bodyid) tbody.id = bodyid;
        const exception = (this.ownerObject) ? this.transactionException : this.exception;
        let row;
        try{
            for (let object of tableobject) {
                row = tbody.insertRow();
                if(pages > 1 ) {
                    if(user === "staff")
                    row.classList.add(`page${Math.ceil(this.objCount/maxPageNumber)}`);
                }
                
                if(user === "staff"){
                    let cell = row.insertCell();
                    let content = document.createTextNode(this.objCount);
                    cell.appendChild(content);
                    if(!this.button && pages>1)row.classList.add("makeInvisible")
                }else{
                    const number = (user === "staff") ? 6 : 8;
                    if(Math.ceil(this.objCount/number) > 1) row.classList.add("makeInvisible")
                }
                this.objCount += 1;
                for (let key in object) {
                    if(exception.indexOf(key) === -1){
                        let cell = row.insertCell();
                        let content = document.createTextNode(Table.modify(key, object[key]));
                        cell.appendChild(content);
                    }
                }
                if(user === "staff"){
                    let cell = row.insertCell();
                    let content = document.createTextNode(" | ");
                    cell.appendChild(this.createLink("View", object.accountNumber, object.status));
                    cell.appendChild(content);
                    cell.appendChild(this.createLink("Delete", object.accountNumber, object.status));
                }
                if(user === "client"){
                    let cell = row.insertCell();
                    cell.appendChild(this.createLink("View", object.id, "transaction"));
                }
            }
        }catch(err){
            console.log(err);
        }  
        if (this.button) return this.tableWithButton();
        if(pages > 1) return this.tableWithPages(pages, bodyid, user);
        if(user === "staff") return Table.fullElement(this.table);
    }
    createTable(user){ 
        if(this.ownerObject === "Transactions" && this.tableObject.length < 1) return "No Transactions";
        if( this.tableObject.length < 1 && user === "staff") return emptyData("No Accounts");
        this.generateHead(user);
        let newTable;
        if(user === "client"){ 
            newTable = this.generateBodyClient(user);
        }
        if(user === "staff"){
            if(this.tableObject.length < 1) this.emptyRow("allAccounts");        
            else if(this.button) newTable = this.generateBody(this.tableObject, user, "oneAccounts",  Table.noOfPages(this.tableObject.length, user));
            else newTable = this.generateBody(this.tableObject, user, "allAccounts",  Table.noOfPages(this.tableObject.length, user));
        }
        return (newTable) ? newTable : this.table;
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
        return this.table;
    }
}

class specificTransactionTable{
    constructor (tableObject) {
        this.tableObject = tableObject;
        this.table = document.createElement("table");
    }
    generateHead(){
        let thead = this.table.createTHead();
        let row = thead.insertRow();

        const th = Table.clientHead(Table.modify("_", "Field"));
        row.appendChild(th);
        const th1 = Table.clientHead(Table.modify("_", "Details"));
        row.appendChild(th1);

        thead.appendChild(row);
        this.table.appendChild(thead);
        return;
    }
    generateBody(){
        let tbody = this.table.createTBody();
        const exception = ["cashier"]
            for (let key in this.tableObject[0]) {
                let row ;
                if(exception.indexOf(key) === -1){
                    row = tbody.insertRow();
                    newAccountTable.createBodyRow("_", key, row);
                    newAccountTable.createBodyRow(key, this.tableObject[0][key], row);
                }
            }
    }

    createTable(){ 
        this.generateHead();
        this.generateBody();
        return this.table;
    }
}
class specificAccountTable{
    constructor (tableObject) {
        this.tableObject = tableObject;
        this.table = document.createElement("table");
    }
    generateHead(){
        let thead = this.table.createTHead();
        let row = thead.insertRow();

        const th = Table.clientHead(Table.modify("_", "Field"));
        row.appendChild(th);
        const th1 = Table.clientHead(Table.modify("_", "Details"));
        row.appendChild(th1);

        thead.appendChild(row);
        this.table.appendChild(thead);
        return;
    }
    generateBody(){
        let tbody = this.table.createTBody();
        const exception = ["owner"]
            for (let key in this.tableObject[0]) {
                let row ;
                if(exception.indexOf(key) === -1){
                    row = tbody.insertRow();
                    newAccountTable.createBodyRow("_", key, row);
                    newAccountTable.createBodyRow(key, this.tableObject[0][key], row);
                }
            }
    }

    createTable(){ 
        this.generateHead();
        this.generateBody();
        return this.table;
    }
}

class Pagination {
    constructor(pageNumber, user){
        this.pageNumber = pageNumber;
        this.user = user;
    }
    static createPageLinks(value, div, side, pageNumber){
        const a = document.createElement("a");

        const anchorText =  document.createTextNode(value);
        if(!/\D/.test(value) && side) a.setAttribute("onclick", `paginationLogic(${value})`);
        else if(side){
            a.setAttribute("onclick", `paginationLogic("${side}", "${pageNumber}")`);
        }
        if(side){
            a.id = side;
        }
        if (this.user) a.classList.add("active");
        else if(value == 1) a.classList.add("active");
        if(side) {
            
        }
        a.href = "#";
        (/\D/g.test(value)) ? a.innerHTML = value : a.appendChild(anchorText);
        div.appendChild(a);
    }

    createPages(pageClass){
        const div = document.createElement("div");
        if(pageClass) div.classList.add(pageClass);
        div.classList.add("pageNumbers")
        Pagination.createPageLinks("&laquo;", div, "left", this.pageNumber);
        for(let i=1; i <= this.pageNumber; i+=1){
            Pagination.createPageLinks(`${i}`, div, `a${i}`);

        }
        Pagination.createPageLinks("&raquo;", div, "right", this.pageNumber);
        return div;
    }
}