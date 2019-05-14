const SingleBankAccount = document.getElementById("viewOne"),
	  AllBankAccount = document.getElementById("viewAllAccounts"),
	  AllTransactions = document.getElementById("viewTransactions"),
	  updateSingle = document.getElementById("updateSingle"),
	  closeSingle = document.getElementById("closeSingle"),
	  UpdateBankAccountbtn = document.getElementById("updateAccNum"),
	  viewSingleBankAccountBtn = document.getElementById("bankAccbtn"),
	  Deletebtn = document.getElementById("deletebtn"),
	  BankAccountNumber = document.getElementById("bankAccNum"),
	  accounts = document.getElementById("accounts"),
	  transactions = document.getElementById("transactions"),
	  createUserPopup = document.getElementById("pop-up12"),
	  bankAccountClosebtn = document.getElementById("bankAccClosebtn");

	  const pathh = window.location.href;
	  const fileNamee = pathh.slice(pathh.lastIndexOf("/")+1, pathh.lastIndexOf(".html"));
window.onload = function(){
	SingleBankAccount.style.display = "none";
	AllTransactions.style.display = "none";
}

accounts.addEventListener("click", () => {
	AllBankAccount.style.display = "block";
	AllTransactions.style.display = "none";
	SingleBankAccount.style.display = "none";
	transactions.classList.remove("current-tab");
	accounts.classList.add("current-tab");
});
transactions.addEventListener("click", () => {
	AllBankAccount.style.display = "none";
	AllTransactions.style.display = "block";
	SingleBankAccount.style.display = "none";
	accounts.classList.remove("current-tab")
	transactions.classList.add("current-tab")
});
const closePopUp = () => {
	SingleBankAccount.style.display = "none";
	AllBankAccount.style.display = "block";
	BankAccountNumber.value = ""; 
}

viewSingleBankAccountBtn.addEventListener("click", ()=>{
	UpdateBankAccountbtn.innerHTML = BankAccountNumber.value;
	SingleBankAccount.style.display = "block"; 
	AllBankAccount.style.display = "none";
})
bankAccountClosebtn.addEventListener("click", closePopUp)

Deletebtn.addEventListener("click", ()=>{
	BankAccountNumber.value = "";
	SingleBankAccount.style.display = "none";
	AllBankAccount.style.display = "block";
})

updateSingle.addEventListener("click", closePopUp);
closeSingle.addEventListener("click", closePopUp);


const createUserClosebtn = () => {
	createUserPopup.classList.remove("makeVisible")
}

const createUserbtn = () => {
	createUserPopup.classList.add("makeVisible")
}





 
