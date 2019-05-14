const username = document.getElementById("usernames");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const accountInformation = document.getElementById("accountInformation");
const accNumber = document.getElementById("accNum");
const toggle = document.getElementById("toggle");
const nav = document.getElementsByTagName("nav")[0];
const credentials = document.getElementById("credentials");
const toggleUser = document.getElementById("toggle-user");
const navUser = document.getElementById("nav-user");
const transactType = document.getElementById("transactType");
const transactAmount = document.getElementById("transactAmount");
const transactMobile = document.getElementById("transactMobile");
const transactSelect = document.getElementById("transactSelect");
const transactName = document.getElementById("transactName");
const currentAccount = document.getElementById("currentAccount");
const savingsAccount = document.getElementById("savingsAccount");
const currentBadge = document.getElementById("currentBadge");
const savingsBadge = document.getElementById("savingsBadge");
const BankAccountOption = document.getElementById("BankAccountOption");
const emailNotification = document.getElementById("emailNotification");
const transactbtn = document.getElementById("transactbtn");
const signUpModal = document.getElementById("signUpModal");
const signInModal = document.getElementById("signInModal");
const closeSignUp = document.getElementById("closeSignUp");
const resetPassword = document.getElementById("resetPassword");
const closeReset = document.getElementById("closeReset");
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const transactionPopUp = document.getElementById("pop-uptransaction");
const arr = [signUpModal, signInModal, resetPassword]


const path = window.location.href;
const fileName = path.slice(path.lastIndexOf("/") + 1, path.indexOf("?"));

const checkUser = (a) => {
	a.href = `Dashboard-${localStorage.getItem("user").toLowerCase()}.html`;
}
const Visibility = (a) => {
	if(a===undefined){
		Array.from(document.getElementsByClassName("makeVisible")).forEach((x) => x.classList.remove("makeVisible"));
	}
	document.getElementById("pop-up"+a).classList.toggle("makeVisible");
}

if(fileName === "index.html"){
	username.addEventListener("click", () => {
		credentials.style.display = "none";
		username.value = "";
		password.value = "";
	})
		signInBtn.addEventListener("click", () => {
	transactions.classList.add("current-auth")
	signInBtn.classList.remove("current-auth")
});
	signUpBtn.addEventListener("click", () => {
	signInBtn.classList.add("current-auth")
	signUpBtn.classList.remove("current-auth")
});
}
if(fileName ==="Dashboard-user.html"){
	toggleUser.addEventListener("click", (e) => {
		e.preventDefault();
		if(navUser.style.display == "none") navUser.style.display = "block";
		else navUser.style.display = "none";
	})
}

const transaction = () => {
	accNumber.value = "";
	accountInformation.innerHTML = "";
	transactionPopUp.classList.add("makeVisible");
}
const closetransaction = () => {
	transactionPopUp.classList.remove("makeVisible");
	
}

const signIn = () => {
	signInModal.style.display = "block";
	signUpModal.style.display = "none";
}
const signUp = () => {
	signInModal.style.display = "none";
	signUpModal.style.display = "block";
}

const resetPasswordfn = () => {
	signInModal.style.visibility = "hidden";
	resetPassword.style.display = "block";

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

const removeAcc = () => {
	accountInformation.innerHTML = "";
	accNumber.value = "";
}

const selectUser = (submit) => {
	localStorage.setItem("user", username.value);
	if(username.value.toLowerCase() === "admin") submit.action = "staff/Dashboard-admin.html";
	else if (username.value.toLowerCase() === "staff") submit.action = "staff/Dashboard-staff.html";
	else if (username.value.toLowerCase() === "user") submit.action = "user/Dashboard-user.html";
	else credentials.style.display = "block";
}

BankAccountOption.addEventListener("change",()=>{
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
})

if(fileName !== "Dashboard-user.html"){
	toggle.addEventListener("click", (e) => {
		if(nav.style.display == "none" || nav.style.display == "") nav.style.display = "block";
		else nav.style.display = "none";
	})
}

window.addEventListener("click", close);
closeReset.addEventListener("click", () => {
	resetPassword.style.display = "none";
	signInModal.style.visibility = "visible";
	signInModal.style.display = "none";
});

