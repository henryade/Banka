const staffEmail = document.getElementById("staffEmail");
const staffFirstname = document.getElementById("staffFirstname");
const staffLastname = document.getElementById("staffLastname");
const staffUsertype = document.getElementById("staffUsertype");
const staffCreateBtn = document.getElementById("submitcreateuser");
const accountInformation = document.getElementById("accountInformation");
const userFullname = document.getElementsByClassName("userFullname")[0];
const errorBadge = document.getElementsByClassName("errorBadge")[0];
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
const closeReset = document.getElementById("closeReset");
const transactionPopUp = document.getElementById("pop-uptransaction");
const currentAccount = document.getElementById("currentAccount");
const savingsAccount = document.getElementById("savingsAccount");
const currentBadge = document.getElementById("currentBadge");
const savingsBadge = document.getElementById("savingsBadge");
const staffErrorBadge = document.getElementById("staffErrorBadge");
const transactionErrorBadge = document.getElementById("transactionErrorBadge");
const SingleBankAccount = document.getElementById("viewOne"),
	  AllBankAccount = document.getElementById("viewAllAccounts"),
	  AllTransactions = document.getElementById("viewTransactions"),
	  updateSingle = document.getElementById("updateSingle"),
	  closeSingle = document.getElementById("closeSingle"),
	  UpdateBankAccountbtn = document.getElementById("updateAccNum"),
	  viewSingleBankAccountBtn = document.getElementById("bankAccbtn"),
	  searchAccountbtn = document.getElementById("searchAccountbtn"),
	  Deletebtn = document.getElementById("deletebtn"),
	  BankAccountNumber = document.getElementById("bankAccNum"),
	  accounts = document.getElementById("accounts"),
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


const closePopUp = () => {
	SingleBankAccount.style.display = "none";
	AllBankAccount.style.display = "block";
	BankAccountNumber.value = ""; 
}

viewSingleBankAccountBtn.onclick = ()=>{
	UpdateBankAccountbtn.innerHTML = BankAccountNumber.value;
	SingleBankAccount.style.display = "block"; 
	AllBankAccount.style.display = "none";
}
bankAccountClosebtn.onclick = closePopUp

Deletebtn.onclick = ()=>{
	BankAccountNumber.value = "";
	SingleBankAccount.style.display = "none";
	AllBankAccount.style.display = "block";
}

updateSingle.onclick = closePopUp;
closeSingle.onclick = closePopUp;


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
	transactionPopUp.classList.add("makeVisible");
}
const closetransaction = () => {
	transactionPopUp.classList.remove("makeVisible");
}

const close = (e) => {
	if(arr.indexOf(e.target) !== -1)
	return e.target.style.display="none";
}


const loadAcc = () => {
	accountInformation.innerHTML = `
	<div>
		<div>
			<h3>Account Details</h3>
			<p>
				<span>Account Name:</span> David Flush
			</p>
			<p>
				<span>Account Type:</span> Savings
			</p>
			<p>
				<span>Account Number:</span> 9345678765
			</p>
			<p>
				<span>Account Balance:</span> N1,000,000
			</p>
			<p>
				<span>Account Status:</span> Active
			</p>
		</div>
		<form onsubmit="Visibility(9);" method="GET" action="javascript:void(0)">
			<h3>New Transaction</h3>
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
			<button type="button" onclick="closetransaction()" class="btn btn-sm form-btn">Close</button>
			<button id="transactbtn" class="btn btn-sm form-btn">Submit</button>
			
		</form>
	</div>
	`;
	transactAmount.value = "";
	transactMobile.value = "";
	transactName.value = "";
	transactSelect.value = "";
}

toggle.onclick =(e) => {
    if(nav.style.display == "none" || nav.style.display == "") nav.style.display = "block";
    else nav.style.display = "none";
}

const ClearErrorBadge = () => {
	errorBadge.style.display = "none";
	errorBadge.innerHTML="";
}

if (errorBadge){
	if(errorBadge.style.display !== "none"){
		window.onclick = () => ClearErrorBadge();
	}
}


const enableCreateStaffBtn = () => {
	staffCreateBtn.classList.remove("disabled");
	staffCreateBtn.textContent = "Submit";
	staffCreateBtn.style.backgroundColor = "#09BC8A";
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
    if(/\D/.test(arg)) return "Invalid parameter";
}

const getAccountDetail = () => {
	if(accNumber.toString().length !== 10 || accNumber.toString().charAt(0) !== "9") {
		transactionErrorBadge.innerHTML = "Invalid Account Number";
		return;
	}
	searchAccountbtn.classList.add("disabled");
	searchAccountbtn.textContent = "Loading...";
	const data = specificAccount(accNumber);
	searchAccountbtn.classList.remove("disabled");
	searchAccountbtn.textContent = "Submit";

	if(data.data){
		accountInformation = data.data;
	} else {
		transactionErrorBadge.innerHTML = data.error || data.message || data;
	}
}

const logic = (Request) => {
	fetch(Request)
	.then(response => response.json())
	.then(data => {
		switch(data.status){
			case 200:
				console.log(data);
				return data;
				break;
			case 400:
			case 403:
			case 407:
				console.log(data.error || data.message)
				return data;
				break;
			default:
				break;
		}
	}).catch(error => {
		console.log(error);
		return error;
	})
}
const allAccounts = (status) => {
	if (status){
		if(status.toLowerCase() !== "active" || status.toLowerCase() !== "dormant") return "Error;"
	}
	const url  = (status) ? `${baseURL}/accounts?status=${status}` : `${baseURL}/accounts`;
	const staffAccountRequest = new Request(url, staffGetInit("GET"));
	logic(staffAccountRequest);
}
const alterAccount = (accountNumber, method) => {
    checkError(accountNumber);
    const createAccountRequest = new Request(`${baseURL}/accounts/${accountNumber}`, clientGetInit(method));
	logic(createAccountRequest);
}

const specificAccount = (accountNumber) => alterAccount(accountNumber, "GET")
const deleteAccount = (accountNumber) => alterAccount(accountNumber, "DELETE")
const changeAccountStatus = (accountNumber) => alterAccount(accountNumber, "PATCH")

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
	staffCreateBtn.classList.add("disabled");
	staffCreateBtn.style.backgroundColor = "gray";
	staffCreateBtn.textContent = "Loading...";
	const createStaffRequest = new Request(`${baseURL}/users`, staffInit("POST", JSON.stringify(Body)));
	fetch(createStaffRequest)
	.then(response => response.json())
	.then(data => {
		enableCreateStaffBtn();
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
		enableCreateStaffBtn();
		displayError(error);
	})
}