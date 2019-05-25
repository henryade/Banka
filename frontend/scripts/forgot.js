const forgotPassword = document.getElementById("forgotPassword");
const forgotConfirmPassword = document.getElementById("forgotConfirmPassword");
const showforgotPassword = document.getElementById("showforgotPassword");
const showforgotConfirmPassword = document.getElementById("showforgotConfirmPassword");
const forgotContainer = document.getElementById("forgotContainer");
const forgotErrorBadge = document.getElementById("forgotErrorBadge");
const forgotBtn = document.getElementById("forgotBtn");

const display = (e) => {
	if (e.target.id === "showforgotPassword"){
		if(forgotPassword.type === "password"){
			forgotPassword.type = "text";
		}else{
			forgotPassword.type = "password";
		}
	}
	if (e.target.id === "showforgotConfirmPassword"){
		if(forgotConfirmPassword.type === "password"){
			forgotConfirmPassword.type = "text";
		}else{
			forgotConfirmPassword.type = "password";
		}
	}

		forgotErrorBadge.innerHTML = "";
		forgotErrorBadge.style.display = "none";
}

window.addEventListener("click", display);


const URL = "https://bankaproject.herokuapp.com/api/v1";
const headers = new Headers({
	'Content-Type': 'application/json',
});
const Init = (method,body) => ({ 
	method,
	headers,
	mode: 'cors',
	body, 
});

const loading = (element,disable) => {
	element.classList.add("disabled");
	element.style.backgroundColor = "gray";
	if(!disable) element.textContent = "Loading...";
}

const finished = (element, disable) => {
	element.classList.remove("disabled");
	if(!disable) element.textContent = "Submit";
	element.style.backgroundColor = "#09BC8A";
}

const showBadge = (error) => {
    forgotErrorBadge.innerHTML= error;
    forgotErrorBadge.style.display = "block";
}

const onSuccess = (data) => {
    finished(forgotBtn);
    showBadge("Sucess!!!")
    window.setTimeout(() => {
			forgotErrorBadge.innerHTML= "";
			forgotErrorBadge.style.display = "none";
		window.location.href = "./index.html";
    }, 500);
    
}
const onFailure = (data) => { 
    finished(forgotBtn);
    showBadge(data.error || data.message || data);
}

const resetLogic = (password, confirm, email, id) => {
    const body = {
				id:id,
				email: email,
        password: password,
        confirmPassword: confirm,
		}
    const request = new Request(`${URL}/auth/reset`, Init("POST", JSON.stringify(body)));
		loading(forgotBtn);
  
	fetch(request)
	.then(response => response.json())
	.then(data => {
		switch(data.status){
			case 200:
				return onSuccess(data);
			case 401:			
			case 403:
			case 407:
				window.location.href = "../index.html";
				break;
			case 400:
			case 404:
        return onFailure(data);
			default:
				break;
		}
	}).catch(error => {
		return onFailure(error);
	})
}
const checkError = (a,b, email, id) => {
     if(a.length < 7) return "Password must be at least 7 characters long";
		 if(a !== b) return "Passwords do not match";
		 if(email.length < 7) return "Bad Url. Reload Link from Email or Reset Password again with the right email";
		 if(id.length < 1 || /\D/.test(id)) return "Bad Url. Reset Password again"
		}

const forgottenPassword = () => {	
		const urlParams = new URLSearchParams(window.location.search);
		const email = urlParams.get('email');
		const id = urlParams.get('id');

    const result = checkError(forgotPassword.value, forgotConfirmPassword.value, email, id);
    if(result){
			showBadge(result);
			return;
		}
		resetLogic(forgotPassword.value, forgotConfirmPassword.value, email, parseInt(id));
}

