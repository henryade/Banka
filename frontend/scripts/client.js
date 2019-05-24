const errorBadge = document.getElementsByClassName("errorBadge");
const userFullname = document.getElementsByClassName("userFullname")[0];
const createAccountFullName  = document.getElementById("createAccountFullName");
const createAccountLastName  = document.getElementById("createAccountLastName");
const createAccountEmail  = document.getElementById("createAccountEmail");
const clientErrorBadge  = document.getElementById("clientErrorBadge");
const clientDashboardErrorBadge  = document.getElementById("clientDashboardErrorBadge");
const createAccountBtn  = document.getElementById("createAccountBtn");
const clientDashboard  = document.getElementById("newUser");
const createAccountOpeningBalance  = document.getElementById("createAccountOpeningBalance");
const createAccountType  = document.getElementById("createAccountType");
let BankAccountOption = document.getElementById("BankAccountOption");
const viewSingleBankAccountBtn = document.getElementById("bankAccbtn");
const queryDate = document.getElementById("date");
const createAccountOuterBtn = document.getElementById("createAccountOuterBtn");
const createuserbtn = document.getElementById("createuserbtn");
const baseURL = "https://bankaproject.herokuapp.com/api/v1";
let token = sessionStorage.getItem("token");
const headers = new Headers({
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${token}`,
});
const clientInit = (method,body) => ({ 
	method,
	headers,
	mode: 'cors',
	body, 
});
const clientGetInit = (method) => ({ 
	method,
	headers,
	mode: 'cors',
});

    userFullname.innerHTML = sessionStorage.getItem('fullname');
    createAccountFullName.value = sessionStorage.getItem('fullname');
	createAccountEmail.value = sessionStorage.getItem('email');
	const clientDashboardOld = clientDashboard.innerHTML;

window.ondblclick =() =>{
	const visibleBadge = Array.from(errorBadge).filter(x=> x.style.display === "block");
	if(visibleBadge.length >= 1){
		visibleBadge.forEach(x=>{
			x.style.display = "none";
			x.innerHTML="";
		})
	}
}

const toggleMultiple = (arr) => {
	arr.forEach(x=>x.classList.toggle("makeInvisible"))
}

let table;

const switchPage = (e, pageNumber, arr1, arr2) => {
	document.getElementById(`a${pageNumber}`).classList.remove("active");
	arr2.forEach(x => x.classList.add("makeInvisible"))

	document.getElementById(`a${e}`).classList.add("active");
	arr1.forEach(x => x.classList.remove("makeInvisible"))

	sessionStorage.setItem("pageNumber", `${e}`)
}

const paginationLogic = (e, pgNo) => {
	const divArray = Array.from(document.getElementsByClassName(`page${e}`));
	let pageNumber = sessionStorage.getItem("pageNumber");
	let previousPage = Number(pageNumber) - 1;
	let nextPage = Number(pageNumber) + 1;
	const previousDivArray = Array.from(document.getElementsByClassName(`page${pageNumber}`));
	if(/\D/.test(e)){
		if (e === "left" && pageNumber > 1){
			switchPage(previousPage, pageNumber, Array.from(document.getElementsByClassName(`page${previousPage}`)), previousDivArray);
		}else if(e === "right" && pageNumber < pgNo) switchPage(nextPage, pageNumber, Array.from(document.getElementsByClassName(`page${nextPage}`)), previousDivArray);
	}else{
		switchPage(e, pageNumber, divArray, previousDivArray);
	}

}

const Visibility = (a) => {
	if(a===undefined){
		Array.from(document.getElementsByClassName("makeVisible")).forEach((x) => x.classList.remove("makeVisible"));
	}
	document.getElementById("pop-up"+a).classList.toggle("makeVisible");
}
const elementToggle = (element, addClass) => {
	const other = (addClass === "makeInvisible") ? "makeVisible" : "makeInvisible";
	element.classList.add(addClass);
	element.classList.remove(other);
}
clientDashboard.onclick = () => {
	if(document.getElementById("BankAccountOption")){
		BankAccountOption = document.getElementById("BankAccountOption");
		let currentBadge = document.getElementById("currentBadge");
		let savingsBadge = document.getElementById("savingsBadge");
		let currentAccount = document.getElementById("currentAccount");
		let savingsAccount = document.getElementById("savingsAccount");
		let currentAccountPage = document.getElementsByClassName("currentAccount")[0];
		let savingsAccountPage = document.getElementsByClassName("savingsAccount")[0];
		BankAccountOption.onchange = () => {
			if(BankAccountOption.value.toLowerCase() === "savings"){
				currentAccount.classList.add("makeInvisible");
				savingsAccount.classList.remove("makeInvisible");
				currentBadge.classList.add("makeInvisible");
				savingsBadge.classList.remove("makeInvisible");
				if(currentAccountPage) currentAccountPage.classList.add("makeInvisible")
				if(savingsAccountPage) savingsAccountPage.classList.remove("makeInvisible")
				sessionStorage.setItem("label", "savings");
			}else{
				currentAccount.classList.remove("makeInvisible");
				savingsAccount.classList.add("makeInvisible");
				currentBadge.classList.remove("makeInvisible");
				savingsBadge.classList.add("makeInvisible");
				if(currentAccountPage) currentAccountPage.classList.remove("makeInvisible")
				if(savingsAccountPage) savingsAccountPage.classList.add("makeInvisible")
				sessionStorage.setItem("label", "current");
			}
		}
	}
}

let type;
if(createAccountType){
    createAccountType.onclick = () => {
		let checked = document.querySelector('input[name = accountType]:checked')
		if(checked !== null && checked !== undefined && checked !== "null") {
			type = checked.value;
		};
		
    }
}

const buttonToggle = (button, show) => {
	const other = (show === "makeInvisible") ? "makeVisible" : "makeInvisible";
	button.classList.add(show)
	button.classList.remove(other)

}
const createUserClosebtn = () => {
	createUserPopup.classList.remove("makeVisible")
}

const createUserbtn = () => {
	createUserPopup.classList.add("makeVisible")
}

if (clientErrorBadge){
		if(clientErrorBadge.style.display !== "none"){
		window.onclick = () => {
            clientErrorBadge.style.display = "none";
            clientErrorBadge.innerHTML="";
        }
	}
}

const enableCreateAccountBtn = () => {
	createAccountBtn.classList.remove("disabled");
	createAccountBtn.textContent = "Submit";
	createAccountBtn.style.backgroundColor = "#09BC8A";
}

const disableCreateAccountBtn = () => {
	createAccountBtn.classList.add("disabled");
	createAccountBtn.style.backgroundColor = "gray";
	createAccountBtn.textContent = "Loading...";
}

const displayError = (error) => {
	clientErrorBadge.innerHTML = error;
	clientErrorBadge.style.display = "block";
}

const checkErrors = (args) => {
	if(args.type === undefined) return "Choose an Account Type";
    if(/\D/.test(args.openingBalance) && args.openingBalance.match(/\D/g)[0] !== ".")	{
        return "Opening Balance must contain only numbers";
    }  
    args.openingBalance = parseFloat(args.openingBalance)
}

const checkError = (arg) => {
	if(/\D/.test(arg)) return "Invalid parameter";
	if (arg.length !== 10) return "Account Number must be 10 characters long";
	if (arg.charAt(0) !== "9") return "Invalid Account Number"; 
}

const buttonloading = (element,disable) => {
	element.classList.add("disabled");
	element.style.backgroundColor = "gray";
	if(!disable) element.textContent = "Loading...";
}

const stopButtonLoading = (element, disable) => {
	element.classList.remove("disabled");
	if(!disable) element.textContent = "Submit";
	element.style.backgroundColor = "#09BC8A";
}

const tableLogic = (table) => {
    const tableData = table.createTable("client");

    clientDashboard.style.fontSize = "initial";
    clientDashboard.style.padding = "5px";
    clientDashboard.style.marginTop = "initial";
    clientDashboard.innerHTML = "";

	clientDashboard.append(tableData);
	return tableData;
}

const showPage = async (data) => {
	const AccountTransactions = await allTransactions(data.data[0].accountNumber, data.data);
	if(AccountTransactions === "No Transactions") bankAccounts(data);
}

const bankAccounts = async (data) => {    
	const dataArray = (typeof data.data === "object" && data.data[0] !== undefined) ? data.data : [data.data];
	const table = new newAccountTable(dataArray);
	tableLogic(table);
}

const BankTransactions = (data, parsedData) => {
    const dataArray = (typeof data.data === "object" && data.data[0] !== undefined) ? data.data : [data.data];
    table = new Table(dataArray, parsedData);
    return tableLogic(table, "Transactions");
}
const viewSpecificTransaction = (data) => {
	const dataArray = (typeof data === "object" && data[0] !== undefined) ? data : [data];
	const tableObj = new specificTransactionTable(dataArray);
	const table = tableObj.createTable()
	const modalBody = document.getElementById(`modalBody${data.id}`)
	document.getElementById(`Loading${data.id}`).classList.add("makeInvisible");
	document.getElementById(`Loading${data.id}`).style.margin = "0";
	modalBody.append(table);
	return;
}

const modal = (a, status) => {
	if(document.getElementById(`pop-up${a}`)){
		let popUp = document.getElementById(`pop-up${a}`);
		popUp.classList.toggle("makeVisible");
		popUp.classList.toggle("makeInvisible");
	}else{
		const p = document.createElement("p");
		p.style.margin = "-11% auto";
		p.id = "Loading"+a;
		const pText = document.createTextNode("Loading...");
		p.appendChild(pText);
		specificTransaction(a);
		clientDashboard.append(createAccountModal(a, p, status))
	}
}

const successLogic = (data, action, parsedData) => {
    if(data.data){
        if((action === "getaccountbyemail" && data.data.length < 1)) {
            clientDashboard.innerHTML = clientDashboardOld;
            return;
		}
        switch(action.toLowerCase()){
			case "getaccountbyemail": 
				showPage(data);
                break;
			case "specifictransaction": 
			viewSpecificTransaction(data.data);
                break;
            case "alltransactions":
                return BankTransactions(data, parsedData);
                break;
            default:
                break;
        }
    } else if(action === "allTransactions"){
		return "No Transactions";
    }
	else if(action === "getAccountByEmail" && data.error){
		clientDashboard.innerHTML = clientDashboardOld;
	} else {
        clientDashboardErrorBadge.textContent = `Error: ${ data.error || data.message || data || "Something Happened"}`;
        clientDashboardErrorBadge.style.display = "block";
        clientDashboard.innerHTML = `<p style="font-size:60px; margin-top:17%">Banka</p>
        <p style="font-size:40px;">Something Happened</p>`;
	}
	if(action === "getaccountbyemail" && data.data.length > 1){
		buttonToggle(createAccountOuterBtn, "makeInvisible");
		buttonToggle(createuserbtn, "makeInvisible");
		allTransactions(data.data[1].accountNumber)
	}
	else{
		buttonToggle(createAccountOuterBtn, "makeVisible");
		createuserbtn.classList.remove("makeInvisible");
	}
}

const accountCreated = (data) => {
	const createAccountForm = document.getElementById("createAccountForm");
	const old = createAccountForm.innerHTML;
	createAccountForm.innerHTML = "Account Created!!!";
	createAccountForm.style.fontSize = "25px";
	createAccountForm.style.padding = "30px 20px";

	window.setTimeout(() => {
		Visibility(13);
		createAccountForm.innerHTML = old;
		createAccountForm.style.fontSize = "initial";
		createAccountForm.style.padding = "initial";
    }, 700);
    loadAccounts(data.email)
}
const logic = async (Request, action, parsedData) => {
	return fetch(Request)
	.then(response => response.json())
	.then(data => {
		switch(data.status){
			case 200:
				return (parsedData) ? successLogic(data, action, parsedData) : successLogic(data, action);
				break;
			case 400:
			case 404:
				return successLogic(data, action);
				break;
			case 401:
				const loaded = sessionStorage.getItem("loaded");
				if(loaded === "1" && action === "getAccountByEmail"){
					window.location.href = "../dashboard.html";
					sessionStorage.setItem("loaded", "2");
				}
				else window.location.href = "../index.html";
				break;
			case 403:
			case 407:
				window.location.href = "../index.html";
				break;
			default:
				break;
		}
	}).catch(error => {
		return successLogic(error, action);
	})
}

const getAccountByEmail = async (email) => {
    const createAccountRequest = new Request(`${baseURL}/user/${email}/accounts`, clientGetInit("GET"));
    logic(createAccountRequest, "getAccountByEmail");
}

const accountLogic = (accountNumber, url, action) => {
    checkError(accountNumber);
    const createAccountRequest = new Request(url, clientGetInit("GET"));
	return logic(createAccountRequest, action);
}

const specificAccount = (accountNumber) => {
    const url = `${baseURL}/accounts/${accountNumber}`;
	accountLogic(accountNumber, url, "specificAccount");
}

const allTransactions = (accountNumber, data) => {
	const url = `${baseURL}/accounts/${accountNumber}/transactions`;
	checkError(accountNumber);
    const createAccountRequest = new Request(url, clientGetInit("GET"));
	return logic(createAccountRequest, "allTransactions", data);
}

const specificTransaction = (number) => {
    const url = `${baseURL}/transactions/${number}`;
	const specificTransactionRequest = new Request(url, clientGetInit("GET"));
	return logic(specificTransactionRequest, "specificTransaction");
}

const createAccount = () => {
	const Body = {
		openingBalance: createAccountOpeningBalance.value,
		email: createAccountEmail.value,
		type,
	}
	const result = checkErrors(Body); 
	if(result){
        displayError(result);
		return;
	}
    disableCreateAccountBtn();
	const createAccountRequest = new Request(`${baseURL}/accounts`, clientInit("POST", JSON.stringify(Body)));
	fetch(createAccountRequest)
	.then(response => response.json())
	.then(data => {
		enableCreateAccountBtn();
		switch(data.status){
			case 201:
				accountCreated(data.data);
				break;
			case 400:
			case 401:
			case 403:
			case 407:
				displayError(data.error || data.message)
				break;
			default:
				break;
		}
	}).catch(error => {
		enableCreateAccountBtn();
		displayError(error);
	})
}
const loadAccounts = async (email) => {
    clientDashboard.innerHTML = "Loading...";
    clientDashboard.style.marginTop = "10%";
	getAccountByEmail(email);
}
loadAccounts(sessionStorage.getItem('email'));