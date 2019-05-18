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
const BankAccountOption = document.getElementById("BankAccountOption");
const clientDashboardOld = clientDashboard.innerHTML;
const baseURL = "https://bankaproject.herokuapp.com/api/v1";
const token = sessionStorage.getItem("token");
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



const Visibility = (a) => {
	if(a===undefined){
		Array.from(document.getElementsByClassName("makeVisible")).forEach((x) => x.classList.remove("makeVisible"));
	}
	document.getElementById("pop-up"+a).classList.toggle("makeVisible");
}

if(BankAccountOption){
	BankAccountOption.onchange = () => {
		if(BankAccountOption.value.toLowerCase() === "savings"){
			currentAccount.classList.add("makeInvisible");
			savingsAccount.classList.remove("makeInvisible");
			currentBadge.classList.add("makeInvisible");
			savingsBadge.classList.remove("makeInvisible");
		}else{
			currentAccount.classList.remove("makeInvisible");
			savingsAccount.classList.add("makeInvisible");
			currentBadge.classList.remove("makeInvisible");
			savingsBadge.classList.add("makeInvisible");
		}
	}
}

let type;
if(createAccountType){
    createAccountType.onclick = () => {
        type = document.querySelector('input[name = accountType]:checked').value;
    }
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
}

const tableLogic = (table) => {
    const tableData = table.createTable("client");

    clientDashboard.style.fontSize = "initial";
    clientDashboard.style.padding = "5px";
    clientDashboard.innerHTML = "";

    clientDashboard.append(tableData);
}
const table ;
const bankAccounts = (data) => {
    if (data.data.length > 1){
        document.getElementById("createAccountBtn").classList.add("makeInvisible");
        document.getElementById("createuserbtn").classList.add("makeInvisible");
        allTransactions(data.data[1].accountNumber)
    }else{
        document.getElementById("createAccountBtn").classList.remove("makeInvisible");
        document.getElementById("createuserbtn").classList.remove("makeInvisible");
    }
    allTransactions(data.data[0].accountNumber)
    
        const dataArray = (typeof data.data === "object" && data.data[0] !== undefined) ? data.data : [data.data];
        table = new newAccountTable(dataArray);
        tableLogic(table);
}

const BankTransactions = (data) => {
    const dataArray = (typeof data.data === "object" && data.data[0] !== undefined) ? data.data : [data.data];
    table = new Table(dataArray);
    tableLogic(table);
}

const successLogic = (data, action) => {
    if(data.data){
        if((action === "getaccountbyemail" && data.data.length < 1)) {
            clientDashboard.innerHTML = clientDashboardOld;
            return;
        }
        switch(action.toLowerCase()){
            case "getaccountbyemail": 
                bankAccounts(data);
                break;
            case "alltransactions":
                BankTransactions(data);
                break;
            default:
                break;
        }
    } else if(action === "allTransactions"){
        tableLogic(table);
        return;
    } else {
        console.log(data.error, data.message, data)
        clientDashboardErrorBadge.textContent = `Error: ${ data.error || data.message || data || "Something Happened"}`;
        clientDashboardErrorBadge.style.display = "block";
        clientDashboard.innerHTML = `<p style="font-size:60px; margin-top:17%">Banka</p>
        <p style="font-size:40px;">Something Happened</p>`;
    }
}

const accountCreated = (data) => {
	const createAccountForm = document.getElementById("createAccountForm");
	const old = createAccountForm.innerHTML;
	createAccountForm.innerHTML = "Account Created!!!";
	createAccountForm.style.fontSize = "25px";
	createAccountForm.style.padding = "30px 20px";

	window.setTimeout(() => {
		createUserPopup.classList.remove("makeVisible");
		createAccountForm.innerHTML = old;
		createAccountForm.style.fontSize = "initial";
		createAccountForm.style.padding = "initial";
    }, 700);
    loadAccounts(data.email)
}
const logic = async (Request, action) => {
	await fetch(Request)
	.then(response => response.json())
	.then(data => {
		switch(data.status){
			case 200:
				return successLogic(data, action);
				break;
			case 400:
			case 403:
			case 407:
                return successLogic(data, action);
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
	logic(createAccountRequest);
}

const specificAccount = (accountNumber) => {
    const url = `${baseURL}/accounts/${accountNumber}`;
	accountLogic(accountNumber, url, "specificAccount");
}

const allTransactions = (accountNumber) => {
    const url = `${baseURL}/accounts/${accountNumber}/transactions`;
	accountLogic(accountNumber, url, "allTransactions");
}

const specificTransaction = (number) => {
    const url = `${baseURL}/transactions/${number}`;
	accountLogic(accountNumber, url, "specificTransaction");
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