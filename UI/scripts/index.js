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

const path = window.location.href;
const fileName = path.slice(path.lastIndexOf("/") + 1);

if(fileName !== "Dashboard-user.html"){
	toggle.addEventListener("click", (e) => {
		if(nav.style.display == "none" || nav.style.display == "") nav.style.display = "block";
		else nav.style.display = "none";
	})
}


const selectUser = (submit) => {
	localStorage.setItem("user", username.value);
	if(username.value.toLowerCase() === "admin") submit.action = "Dashboard-admin.html";
	else if (username.value.toLowerCase() === "staff") submit.action = "Dashboard-staff.html";
	else if (username.value.toLowerCase() === "user") submit.action = "Dashboard-user.html";
	else credentials.style.display = "block";
}


const loadAcc = () => {
	accountInformation.innerHTML = `
	<form id="flex-form" action="#pop-up9">
		<h1>New Transaction</h1>
		<p>
			<select id="transactType" required>
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
	<div id="accInfo">
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

const checkUser = (a) => {
	a.href = `Dashboard-${localStorage.getItem("user").toLowerCase()}.html`;
}

if(fileName === "SignIn.html"){
	username.addEventListener("click", () => {
		credentials.style.display = "none";
		username.value = "";
		password.value = "";
	})

}
if(fileName ==="Dashboard-user.html"){
	toggleUser.addEventListener("click", (e) => {
		e.preventDefault();
		if(navUser.style.display == "none") navUser.style.display = "block";
		else navUser.style.display = "none";
	})
}


