const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPassword");
const signUpEmail = document.getElementById("signUpEmail");
const signUpPassword = document.getElementById("signUpPassword");
const signUpConfirmPassword = document.getElementById("signUpConfirmPassword");
const signUpFirstname = document.getElementById("signUpFirstname");
const signUpLastname = document.getElementById("signUpLastname");
const showSignInPassword = document.getElementById("showSignInPassword");
const showSignUpPassword = document.getElementById("showSignUpPassword");
const showSignUpConfirmPassword = document.getElementById("showSignUpConfirmPassword");
const accountInformation = document.getElementById("accountInformation");
const accNumber = document.getElementById("accNum");
const toggle = document.getElementById("toggle");
const nav = document.getElementsByTagName("nav")[0];
const SignInErrorBadge = document.getElementById("SignInErrorBadge");
const SignUpErrorBadge = document.getElementById("SignUpErrorBadge");
const errorBadge = document.getElementById("errorBadge");
const toggleUser = document.getElementById("toggle-user");
const navUser = document.getElementById("nav-user");
const transactType = document.getElementById("transactType");
const transactAmount = document.getElementById("transactAmount");
const transactMobile = document.getElementById("transactMobile");
const transactSelect = document.getElementById("transactSelect");
const transactName = document.getElementById("transactName");
const emailNotification = document.getElementById("emailNotification");
const transactbtn = document.getElementById("transactbtn");
const signUpModal = document.getElementById("signUpModal");
const signInModal = document.getElementById("signInModal");
const closeSignUp = document.getElementById("closeSignUp");
const resetPassword = document.getElementById("resetPassword");
const closeReset = document.getElementById("closeReset");
const signInModalBtn = document.getElementById("signInBtn");
const signUpModalBtn = document.getElementById("signUpBtn");
const signUpBtn = document.getElementById("signup-btn");
const signInBtn = document.getElementById("signin-btn");
const transactionPopUp = document.getElementById("pop-uptransaction");
const arr = [signUpModal, signInModal, resetPassword]
const baseURL = "https://bankaproject.herokuapp.com/api/v1";
const headers = new Headers({'Content-Type': 'application/json'});
const authInit = (method,body) => ({ 
	method,
	headers,
	mode: 'cors',
	body, 
});
sessionStorage.clear();

const signUp = () => {
	signInModal.style.display = "none";
	signUpModal.style.display = "block";
}
const signIn = () => {
	signInModal.style.display = "block";
	signUpModal.style.display = "none";
}
const SignUpClearBadge = () => {
	SignUpErrorBadge.style.display = "none";
	SignUpErrorBadge.innerHTML="";
}
const SignInClearBadge = () => {
	SignInErrorBadge.style.display = "none";
	SignInErrorBadge.innerHTML="";
}

if(SignUpErrorBadge.style.display !== "none"){
	window.onclick = () => SignUpClearBadge();
}

if(SignInErrorBadge.style.display !== "none"){
	signInEmail.onclick = () => SignInClearBadge();
	signInPassword.onclick = () => SignInClearBadge();
}
	signInModalBtn.onclick = () => {
	signInModalBtn.classList.add("current-auth");
	signUpModalBtn.classList.remove("current-auth");
	signIn();
};
	signUpModalBtn.onclick = () => {
	signUpModalBtn.classList.add("current-auth")
	signInModalBtn.classList.remove("current-auth")
	signUp();
};
if(toggleUser){
	toggleUser.onclick = (e) => {
		e.preventDefault();
		if(navUser.style.display == "none") navUser.style.display = "block";
		else navUser.style.display = "none";
	}
}

const resetPasswordfn = () => {
	signInModal.style.visibility = "hidden";
	resetPassword.style.display = "block";

}
const close = (e) => {
	if (e.target.id === "showSignInPassword"){
		if(signInPassword.type === "password" ){
			signInPassword.type = "text";
		}else{
			signInPassword.type = "password";
		}
	}
	if (e.target.id === "showSignUpPassword"){
		if(signUpPassword.type === "password"){
			signUpPassword.type = "text";
		}else{
			signUpPassword.type = "password";
		}
	}
	if (e.target.id === "showSignUpConfirmPassword"){
		if(signUpConfirmPassword.type === "password"){
			signUpConfirmPassword.type = "text";
		}else{
			signUpConfirmPassword.type = "password";
		}
	}
	
	if(arr.indexOf(e.target) !== -1)
	return e.target.style.display="none";
}

const capitalize = (a) =>{
	return a.slice(0,1).toUpperCase() + a.slice(1).toLowerCase();
}

const selectUser = (data) => {
	const fullname = `${capitalize(data.firstName)} ${capitalize(data.lastName)}`;
	sessionStorage.setItem('token', data.token);
	sessionStorage.setItem('fullname', fullname);
	sessionStorage.setItem('email', data.email);
	sessionStorage.setItem("pageNumber", "1");
	sessionStorage.setItem("loaded", "1");
	sessionStorage.setItem("label", "current")
	console.log(data)
	if(data.type === "staff" && data.isAdmin) window.location.href = "admin/dashboard.html";
	else if (data.type === "staff" && !data.isAdmin) window.location.href = "cashier/dashboard.html";
	else window.location.href = "client/dashboard.html";
}
window.addEventListener("click", close);
closeReset.addEventListener("click", () => {
	resetPassword.style.display = "none";
	signInModal.style.visibility = "visible";
	signInModal.style.display = "none";
});

	toggle.onclick =(e) => {
		if(nav.style.display == "none" || nav.style.display == "") nav.style.display = "block";
		else nav.style.display = "none";
	}

const checkErrors = (args) => {
	const size = Object.keys(args).length;
	if(size >= 2){

		if(args.password.length < 7){
			return "Password length must be at least 7";
		}
		if(args.password.trim().length === 0){
			return "Password must contain at least a character";
		}
	}
	if(size > 2){
		if(args.firstName < 2 || args.firstName > 35){
			return "Invalid Firstname";
		}
		if(args.lastName < 2 || args.lastName > 35){
			return "Invalid Lastname";
		}
		if(args.password !== args.confirmPassword){
			return "Passwords do not match";
		}
	}
}
const enableSignInBtn = () => {
	signInBtn.classList.remove("disabled");
	signInBtn.textContent = "Submit";
	signInBtn.style.backgroundColor = "#09BC8A";
}
const enableSignUpBtn = () => {
	signUpBtn.classList.remove("disabled");
	signUpBtn.textContent = "Submit";
	signUpBtn.style.backgroundColor = "#09BC8A";
}

const accountAuth = () => {
	const signInBody = {
		email: signInEmail.value,
		password: signInPassword.value,
	}
	const result = checkErrors(signInBody); 
	if(result){
		SignInErrorBadge.innerHTML = result;
		SignInErrorBadge.style.display = "block";
		return;
	}
	signInBtn.classList.add("disabled");
	signInBtn.style.backgroundColor = "gray";
	signInBtn.textContent = "Loading...";
	const signInRequest = new Request(`${baseURL}/auth/signin`, authInit("POST", JSON.stringify(signInBody)));
	fetch(signInRequest)
	.then(response => response.json())
	.then(data => {
		enableSignInBtn();
		switch(data.status){
			case 200:
				selectUser(data.data);
				break;
			case 400:
			case 401:
			case 403:
				SignInErrorBadge.innerHTML = data.error;
				SignInErrorBadge.style.display = "block";
				break;
			default:
				break;
		}
	}).catch(error => {
		enableSignInBtn();
		SignInErrorBadge.innerHTML=error;
	})
}

const registerUser = () => {
	const signUpBody = {
		firstName: signUpFirstname.value,
		lastName: signUpLastname.value,
		email: signUpEmail.value,
		password: signUpPassword.value,
		confirmPassword: signUpConfirmPassword.value,
	}
	const result = checkErrors(signUpBody); 
	if(result){
		SignUpErrorBadge.innerHTML = result;
		SignUpErrorBadge.style.display = "block";
		return;
	}
	signUpBtn.classList.add("disabled");
	signUpBtn.style.backgroundColor = "gray";
	signUpBtn.textContent = "Loading...";
	const signUpRequest = new Request(`${baseURL}/auth/signup`, authInit("POST", JSON.stringify(signUpBody)));
	fetch(signUpRequest)
	.then(response => response.json())
	.then(data => {
		enableSignUpBtn();
		switch(data.status){
			case 201:
				selectUser(data.data);
				break;
			case 400:
			case 401:
			case 403:
				SignUpErrorBadge.innerHTML = data.error;
				SignUpErrorBadge.style.display = "block";
				break;
			default:
				break;
		}
	}).catch(error => {
		enableSignUpBtn();
		SignInErrorBadge.innerHTML=error;
	})
}