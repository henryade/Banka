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
	document.getElementById("pop-up"+a).classList.toggle("makeVisible")
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


window.addEventListener("click", close);
closeReset.addEventListener("click", () => {
	resetPassword.style.display = "none";
	signInModal.style.visibility = "visible";
	signInModal.style.display = "none";
});



if(fileName !== "Dashboard-user.html"){
	toggle.addEventListener("click", (e) => {
		if(nav.style.display == "none" || nav.style.display == "") nav.style.display = "block";
		else nav.style.display = "none";
	})
}


const selectUser = (submit) => {
	localStorage.setItem("user", username.value);
	if(username.value.toLowerCase() === "admin") submit.action = "UI/Dashboard-admin.html";
	else if (username.value.toLowerCase() === "staff") submit.action = "UI/Dashboard-staff.html";
	else if (username.value.toLowerCase() === "user") submit.action = "UI/Dashboard-user.html";
	else credentials.style.display = "block";
}


const loadAcc = () => {
	accountInformation.innerHTML = `
	<div>
		<h1>Account Details</h1>
		<p>
			<span>Account Name:</span> David Flush
		</p>
		<p>
			<span>Account Type:</span> Savings
		</p>
		<p>
			<span>Account Number:</span> ${accNumber.value}
		</p>
		<p>
			<span>Account Balance:</span> N1,000,000
		</p>
		<p>
			<span>Account Status:</span> Active
		</p>
	</div>
	<form action="#pop-up9">
		<h1>New Transaction</h1>
		<p>
			<select required>
				<option value="">--Choose transaction type--</option>
				<option value="debit">Debit</option>
				<option value="credit">Credit</option>
			</select>
		</p>
	
		<p>
			<div>
				<input type="text" id="name" name="name" required placeholder="Name" class="authInput accTransactInput input-lm" />
			</div>
			<div>
				<input type="tel" id="mobile" name="mobile" required placeholder="Mobile" class="authInput accTransactInput input-lm" />
			</div>
			<div>
				<input type="number" id="transactAmount" name="amount" required placeholder="Amount" class="authInput accTransactInput input-lm" />
			</div>
		</p>
		<button id="transactbtn" class="btn btn-sm form-btn">Submit</button>
	</form>
	<div>
		<h1>Account Details</h1>
		<p>
			<span>Account Name:</span> David Flush
		</p>
		<p>
			<span>Account Type:</span> Savings
		</p>
		<p>
			<span>Account Number:</span> ${accNumber.value}
		</p>
		<p>
			<span>Account Balance:</span> N1,000,000
		</p>
		<p>
			<span>Account Status:</span> Active
		</p>
	</div>
	`;

}

const removeAcc = () => {
	accountInformation.innerHTML = "";
	accNumber.value = "";
}






clientDashboard.onclick = () => {
	if(document.getElementById("BankAccountOption")){
		BankAccountOption = document.getElementById("BankAccountOption");
		let currentBadge = document.getElementById("currentBadge");
		let savingsBadge = document.getElementById("savingsBadge");
		let currentAccount = document.getElementById("currentAccount");
		let savingsAccount = document.getElementById("savingsAccount");
		let currentAccountPage = document.getElementsByClassName[0]("currentAccount");
		let savingsAccountPage = document.getElementsByClassName[0]("savingsAccount");
		BankAccountOption.onchange = () => {
			if(BankAccountOption.value.toLowerCase() === "savings"){
				currentAccount.classList.add("makeInvisible");
				savingsAccount.classList.remove("makeInvisible");
				currentBadge.classList.add("makeInvisible");
				savingsBadge.classList.remove("makeInvisible");
				if(currentAccountPage) currentAccountPage.classList.add("makeInvisible")
				if(savingsAccountPage) savingsAccountPage.classList.remove("makeInvisible")
			}else{
				currentAccount.classList.remove("makeInvisible");
				savingsAccount.classList.add("makeInvisible");
				currentBadge.classList.remove("makeInvisible");
				savingsBadge.classList.add("makeInvisible");
				if(currentAccountPage) currentAccountPage.classList.add("makeInvisible")
				if(savingsAccountPage) savingsAccountPage.classList.remove("makeInvisibl
			}
		}
	}
}
