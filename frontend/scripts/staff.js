const staffEmail = document.getElementById("staffEmail");
const staffFirstname = document.getElementById("staffFirstname");
const staffLastname = document.getElementById("staffLastname");
const staffUsertype = document.getElementById("staffUsertype");
const staffCreateBtn = document.getElementById("submitcreateuser");
const accountInformation = document.getElementById("accountInformation");
const userFullname = document.getElementsByClassName("userFullname")[0];
const errorBadge = document.getElementsByClassName("errorBadge");
const accNumber = document.getElementById("accNum");
const toggle = document.getElementById("toggle");
const nav = document.getElementsByTagName("nav")[0];
const toggleUser = document.getElementById("toggle-user");
const transactType = document.getElementById("transactType");
const transactAmount = document.getElementById("transactAmount");
const transactMobile = document.getElementById("transactMobile");
const transactSelect = document.getElementById("transactSelect");
const transactName = document.getElementById("transactName");
const emailNotification = document.getElementById("emailNotification");
const transactbtn = document.getElementById("transactbtn");
const searchErrorBadge = document.getElementById("searchErrorBadge");
const closetransactbtn = document.getElementById("closetransactbtn");
const closeReset = document.getElementById("closeReset");
const transactionPopUp = document.getElementById("pop-uptransaction");
const currentAccount = document.getElementById("currentAccount");
const savingsAccount = document.getElementById("savingsAccount");
const currentBadge = document.getElementById("currentBadge");
const savingsBadge = document.getElementById("savingsBadge");
let staffErrorBadge = document.getElementById("staffErrorBadge");
const adminDashboard = document.getElementById("AdminDashboard");
const transactionErrorBadge = document.getElementById("transactionErrorBadge");
const SingleBankAccount = document.getElementById("viewOne"),
	  AllBankAccount = document.getElementById("viewAllAccounts"),
	  AllTransactions = document.getElementById("viewTransactions"),
	  updateSingle = document.getElementById("updateSingle"),
	  closeSingle = document.getElementById("closeSingle"),
	  UpdateBankAccountbtn = document.getElementById("updateAccNum"),
	  viewSingleBankAccountBtn = document.getElementById("bankAccbtn"),
	  searchAccountbtn = document.getElementById("searchAccountbtn"),
	  BankAccountNumber = document.getElementById("bankAccNum"),
	  transactions = document.getElementById("transactions"),
	  createUserPopup = document.getElementById("pop-up12"),
	  bankAccountClosebtn = document.getElementById("bankAccClosebtn");
	  
const baseURL = "https://bankaproject.herokuapp.com/api/v1";
const token = sessionStorage.getItem("token");
const headers = new Headers({
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${token}`,
});
const staffInit = (method,body) => ({ 
	method,
	headers,
	mode: 'cors',
	body, 
});

const staffGetInit = (method) => ({ 
	method,
	headers,
	mode: 'cors',
});

userFullname.innerHTML = sessionStorage.getItem('fullname');
const oldAdminDashboard = AdminDashboard.innerHTML;
const noBtnOnclick = (acc) => {
	document.getElementById(`pop-up${acc}confirmAction`).remove();
	return
}

const yesBtnOnclick = (acc) => {
	deleteLogic(acc);
	document.getElementById(`pop-up${acc}confirmAction`).remove();
	return;
}
if(staffErrorBadge){
	if(staffErrorBadge.style.display !== "none"){
		if(accountInformation){
			accountInformation.onclick = () => {
				staffErrorBadge.style.display = "none";
				staffErrorBadge.innerHTML="";
			}
		}
	}
}

const switchPage = (e, pageNumber, arr1, arr2) => {
	const anchor = document.getElementById(`a${pageNumber}`)
	if(anchor) anchor.classList.remove("active");
	if(arr2) arr2.forEach(x => x.classList.add("makeInvisible"))

	const anchor2 = document.getElementById(`a${e}`)
	if(anchor2) anchor2.classList.add("active");
	if(arr1) arr1.forEach(x => x.classList.remove("makeInvisible"))

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


const elementToggle = (element, addClass) => {
	const other = (addClass === "makeInvisible") ? "makeVisible" : "makeInvisible";
	element.classList.add(addClass);
	element.classList.remove(other);
}

const closePopUp = () => {
	SingleBankAccount.style.display = "none";
	AllBankAccount.style.display = "block";
	BankAccountNumber.value = ""; 
}

const createUserClosebtn = () => {
	createUserPopup.classList.remove("makeVisible")
}

const createUserbtn = () => {
	createUserPopup.classList.add("makeVisible")
}

const Visibility = (a) => {
	if(a===undefined){
		Array.from(document.getElementsByClassName("makeVisible")).forEach((x) => x.classList.remove("makeVisible"));
	}
	document.getElementById("pop-up"+a).classList.toggle("makeVisible");
}

const transaction = () => {
	accNumber.value = "";
	accountInformation.innerHTML = "";
	elementToggle(transactionPopUp,"makeVisible")
}
const closetransaction = () => {
	elementToggle(transactionPopUp,"makeInvisible")
}

const close = (e) => {
	if(arr.indexOf(e.target) !== -1)
	return e.target.style.display="none";
}


const loadAcc = (data) => {
	accountInformation.innerHTML = `
	<div>
		<div>
			<h3>Account Details</h3>
			<p>
				<span>Account Email:</span> ${data.email}
			</p>
			<p>
				<span>Account Type:</span> ${data.type}
			</p>
			<p>
				<span>Account Number:</span> ${data.accountNumber}
			</p>
			<p>
				<span>Account Balance:</span> ${data.balance}
			</p>
			<p>
				<span>Account Status:</span> ${data.status}
			</p>
		</div>
		<form onsubmit="createTransaction(${data.accountNumber})" method="POST" action="javascript:void(0)">
			<h3>New Transaction</h3>
			<p id="staffErrorBadge" class="errorBadge"></p>
			<p>
				<select id="transactSelect" required>
					<option value="">--Choose transaction type--</option>
					<option value="debit">Debit</option>
					<option value="credit">Credit</option>
				</select>
			</p>

			<p>
				<div>
					<input type="text" id="transactName" name="name" required placeholder="Name" class="authInput accTransactInput input-lm" />
				</div>
				<div>
					<input type="tel" id="transactMobile" name="mobile" required placeholder="Mobile" class="authInput accTransactInput input-lm" />
				</div>
				<div>
					<input type="number" id="transactAmount" name="amount" required placeholder="Amount" class="authInput accTransactInput input-lm" />
				</div>
			</p>
			<button type="button" id="closetransactbtn" onclick="closetransaction()" class="btn btn-sm form-btn">Close</button>
			<button id="transactbtn" class="btn btn-sm form-btn">Submit</button>
			
		</form>
	</div>
	`;
	if(transactAmount)	transactAmount.value = "";
	if(transactMobile)	transactMobile.value = "";
	if(transactName)	transactName.value = "";
	if(transactSelect)	transactSelect.value = "";
}

toggle.onclick =(e) => {
    if(nav.style.display == "none" || nav.style.display == "") nav.style.display = "block";
    else nav.style.display = "none";
}

const ClearErrorBadge = () => {
	Array.from(errorBadge).forEach(x=>{
		x.style.display = "none";
		x.innerHTML="";
	})
	
}

window.onclick = () => ClearErrorBadge();

const loading = () => {
	adminDashboard.innerHTML = "Loading...";
    adminDashboard.style.fontSize = "25px";
    adminDashboard.style.margin = "10% auto";
}

const stopLoading = () => {
	adminDashboard.innerHTML = "";
	adminDashboard.style.fontSize = "initial";
    adminDashboard.style.margin = "5% 3%";
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

const displayError = (error) => {
	staffErrorBadge.innerHTML = error;
	staffErrorBadge.style.display = "block";
}

const checkErrors = (args) => {
	if(args.firstName.length < 2 || args.firstName.length > 35) return "Invalid Firstname";
	if(args.lastName.length < 2 || args.lastName.length > 35)	return "Invalid Lastname";
}

const checkError = (arg) => {
	if(/\D/g.test(arg)) return "Invalid parameter";
}

const loadAccountByStatus = () => {
	const status = document.getElementById("BankAccountStatus").value;
	loading();
	if(status.toLowerCase() === "all") return allAccounts();
	return allAccounts(status);
}

const checkAccountError = (arg) => {
   if (arg.toString().length !== 10) return "Account Number must be 10 characters long";
   if (arg.toString().charAt(0) !== "9") return "Invalid Account Number";
}

const checkTransactionError = (arg) => {
    if(/^234[7-9][0-1][0-9]+$/.test(arg)) return "Phone number format: 2348071232442";
    if(arg.length !== 13) return "Phone number must be 13 characters";
}

const bankAccounts = (data) => {
	const table = new Table(data);
	stopLoading();
	adminDashboard.append(table.createTable("staff"));
	paginationLogic(1);
}
const closeViewSpecificAccount = () => {
	adminDashboard.innerHTML = "";
	window.location.href = "./dashboard.html";
}
const viewOneBankAccounts = (data) => {
	const table = new Table([data],undefined, "close");
	stopButtonLoading(viewSingleBankAccountBtn);
	adminDashboard.innerHTML = "";
	adminDashboard.append(table.createTable("staff"));
}

const viewSpecificAccount = async (data) => {
	const dataArray = (typeof data === "object" && data[0] !== undefined) ? data : [data];
	const user = await getAccountByEmail(dataArray[0].email);
	const {firstName, lastName} = user;
	let newDataArray;
	for(let object of dataArray) newDataArray = [{firstName, lastName, ...object}];
	const tableObj = new specificAccountTable(newDataArray);
	const table = tableObj.createTable()
	const modalBody = document.getElementById(`modalBody${data.accountNumber}`)
	document.getElementById(`Loading${data.accountNumber}`).classList.add("makeInvisible");
	if(document.getElementById("accountImg") && user.imageurl) document.getElementById("accountImg").src = user.imageurl; 
	modalBody.style.color = "initial";
	modalBody.style.fontSize = "initial";
	modalBody.classList.add("inverse");
	modalBody.append(table);
	return;
}

const successLogic = (data, action) => {
	switch(action){
		case "allAccounts":
			bankAccounts(data.data);
			break;
		case "getAccountByEmail":
			return data.data;
			break;
		case "specificAccount":
			viewSpecificAccount(data.data);
			break;
		case "searchAccount":
			viewOneBankAccounts(data.data);
			break;
		case "specificAccountTransaction":
			stopButtonLoading(searchAccountbtn);
			loadAcc(data.data);
			break;
		case "createTransaction":
			stopButtonLoading(document.getElementById("transactbtn"));
			stopButtonLoading(document.getElementById("closetransactbtn"), "_");
			accountInformation.innerHTML = `<p style="margin:40px auto;font-size:40px;font-weight:bolder;">Success</p>`
			window.setTimeout(() => {
				window.location.href = "./dashboard.html";
				closetransaction();
			}, 500);
			
			break;
		case "deleteAccount":
		case "changeAccountStatus":
			location.href = "./dashboard.html";
			break;
		default:
			break;
	}
}
const failureLogic = (data, action) => {
	switch(action){
		case "allAccounts":
			adminDashboard.innerHTML = `<p style="font-size:40px; margin:10% auto 3% auto">Banka</p>
        		<p style="font-size:20px;">Error: Something Happened <span style="font-size:25px;margin-left:10px;">&clubs;</span></p>`;
			break;
		case "specificAccountTransaction":
			stopButtonLoading(searchAccountbtn);
			transactionErrorBadge.innerHTML = data.error || data.message || data;
			transactionErrorBadge.style.display = "block";
			break;
		case "searchAccount":
			stopButtonLoading(viewSingleBankAccountBtn);

			searchErrorBadge.innerHTML = data.error || data.message || data;
			searchErrorBadge.style.display = "block";
			break;
		case "createTransaction":
			stopButtonLoading(document.getElementById("transactbtn"));
			stopButtonLoading(document.getElementById("closetransactbtn"), "_");
			const staffErrorBadgeSession = document.getElementById("staffErrorBadge")
				staffErrorBadgeSession.innerHTML = data.error || data;
				staffErrorBadgeSession.style.display = "block";
			break;
		default:
			console.log(data)
			break;
	}
}

const modal = (a, status) => {
	if(document.getElementById(`pop-up${a}`)){
		let popUp = document.getElementById(`pop-up${a}`);
		popUp.classList.toggle("makeVisible");
		popUp.classList.toggle("makeInvisible");
	}else{
		const p = document.createElement("p");
		p.style.fontSize = "20px";
		p.style.margin = "10% auto";
		p.id = "Loading"+a;
		const pText = document.createTextNode("Loading...");
		if(status !== "transaction"){
			p.style.color = "white";
			p.style.fontSize = "35px";
		}
		p.appendChild(pText);
		specificAccount(a, "specificAccount");
		adminDashboard.append(createAccountModal(a, p, status))
	}
}

const deleteSpecificAccount = (a) => {
	adminDashboard.append(confirmDeleteAction(a));
}
const deleteLogic = (a) => {;
	deleteAccount(a);
	const popUp = document.getElementById(`pop-up${a}`);
	if(popUp) popUp.remove();
	
}

const accountCreated = () => {
	const createStaffForm = document.getElementById("createStaffForm");
	const old = createStaffForm.innerHTML;
	createStaffForm.innerHTML = "Account Created!!!";
	createStaffForm.style.fontSize = "25px";
	createStaffForm.style.margin = "20px auto";
	createStaffForm.style.textAlign = "center";

	window.setTimeout(() => {
		elementToggle(createUserPopup, "makeInvisible")
		createStaffForm.innerHTML = old;
		createStaffForm.style.fontSize = "initial";
		createStaffForm.style.margin = "initial";
    }, 700);
}

const logic = async (Request, action) => {
	return await fetch(Request)
	.then(response => response.json())
	.then(data => {
		switch(data.status){
			case 200:
				return successLogic(data, action);
			case 401:			
			case 403:
			case 407:
				window.location.href = "../index.html";
				break;
			case 400:
			case 404:
                return failureLogic(data, action);
			default:
				break;
		}
	}).catch(error => {
		return failureLogic(error, action);
	})
}

const getAccountDetail = () => {
	if(accNumber.value.toString().length !== 10 || accNumber.value.toString().charAt(0) !== "9") {
		transactionErrorBadge.innerHTML = "Invalid Account Number";
		transactionErrorBadge.style.display = "block";
		return;
	}
	buttonloading(searchAccountbtn);
	specificAccount(accNumber.value,"specificAccountTransaction");
}

const allAccounts = async (status) => {
	const url  = (status) ? `${baseURL}/accounts?status=${status}` : `${baseURL}/accounts`;
	const staffAccountRequest = new Request(url, staffGetInit("GET"));
	logic(staffAccountRequest, "allAccounts");
}

const alterAccount = (accountNumber, method, action) => {
	const result = checkError(accountNumber) || checkAccountError(accountNumber);
	if (result){
		searchErrorBadge.innerHTML = result;
		searchErrorBadge.style.display = "block";
		stopButtonLoading(viewSingleBankAccountBtn);
		return;
	}
    const createAccountRequest = new Request(`${baseURL}/accounts/${accountNumber}`, staffGetInit(method));
	logic(createAccountRequest, action);
}
const changeAccountStatus = (accountNumber) => alterAccount(accountNumber, "PATCH", "changeAccountStatus")
const searchAccount = () => {
	buttonloading(viewSingleBankAccountBtn)
	specificAccount(bankAccNum.value, "searchAccount")
}

const specificAccount = (accountNumber, action) => alterAccount(accountNumber, "GET", action)
const deleteAccount = (accountNumber) => alterAccount(accountNumber, "DELETE", "deleteAccount")
const getAccountByEmail = async (email) => {
	const createAccountRequest = new Request(`${baseURL}/${email}/user`, staffGetInit("GET"));
    return logic(createAccountRequest, "getAccountByEmail");
}

const createTransaction = (accountNumber) => {
	const Body = {
		amount : document.getElementById("transactAmount").value,
		depositor : document.getElementById("transactName").value,
		depositorPhoneNumber : document.getElementById("transactMobile").value,	
	}
	const result = checkError(Body.amount);
	if(result){
		staffErrorBadge.innerHTML = result;
		staffErrorBadge.style.display = "block";
		return;
	}
	const createStaffRequest = new Request(`${baseURL}/transactions/${accountNumber}/${document.getElementById("transactSelect").value.toLowerCase()}`, staffInit("POST", JSON.stringify(Body)));
	buttonloading(document.getElementById("transactbtn"));
	buttonloading(document.getElementById("closetransactbtn"), "_");
	logic(createStaffRequest, "createTransaction")
}


const registerStaff = () => {
	const Body = {
		firstName: staffFirstname.value,
		lastName: staffLastname.value,
		email: staffEmail.value,
		userType: staffUsertype.value,
	}
	const result = checkErrors(Body); 
	if(result){
		staffErrorBadge.innerHTML = result;
		staffErrorBadge.style.display = "block";
		return;
	}
	buttonloading(staffCreateBtn)
	const createStaffRequest = new Request(`${baseURL}/users`, staffInit("POST", JSON.stringify(Body)));
	fetch(createStaffRequest)
	.then(response => response.json())
	.then(data => {
		stopButtonLoading(staffCreateBtn);
		switch(data.status){
			case 201:
				accountCreated();
				break;
			case 400:
			case 401:
			case 403:
			case 407:
				displayError(data.error)
				break;
			default:
				break;
		}
	}).catch(error => {
		stopButtonLoading(staffCreateBtn);
		displayError(error);
	})
}
const loadAccounts = async () => {
	loading();
    allAccounts();
}
loadAccounts();