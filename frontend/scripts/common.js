const createAccountModalTemplate = (text, input, content) => {
    const div = document.createElement("div");
    div.id = (text === `confirmAction`) ? `pop-up${input}${text}` : `pop-up${input}`;
    
    div.classList.add("pop-up");
    div.classList.add("makeVisible");

        const div1 = document.createElement("div");
        div1.classList.add("pop-upBodyTransaction");
        if(text === "transaction") {
            div1.style.marginTop = "2%";
        }

            const span = document.createElement("span");
            span.classList.add("pop-upSpan");

        div1.appendChild(span);

            const div2 = document.createElement("div");

                const a = document.createElement("a");

                    const i = document.createElement("i");
                    i.classList.add("fas")
                    i.classList.add("fa-times-circle")

                a.classList.add("closePop-up")
                if(text === `confirmAction`) a.setAttribute("onclick", `noBtnOnclick(${input})`);
                else a.setAttribute("onclick", `modal(${input})`);
                a.href = "#"; 
                a.appendChild(i);
            
            div2.appendChild(a);
            div2.appendChild(content);
        
        div1.appendChild(div2);
    
    div.appendChild(div1);
    return div;
}

const createButton = (btnid, value, num, status) => {
    const btn = document.createElement("button");
    btn.id = btnid;
    btn.type = "button";
    btn.style.marginRight = "5%";
    btn.classList.add("btn");
    if(value === "Change Status") btn.classList.add("btn-md");
    else btn.classList.add("btn-sm");
    if(value === "No" )  btn.setAttribute("onclick", `noBtnOnclick(${num})`);
    if(value === "Yes")  btn.setAttribute("onclick", `yesBtnOnclick(${num})`);
    if(value !== "No" && value !== "Yes") btn.setAttribute("onclick", `modal("${num}", "${status}")`);
    if(value !== "No" && value !== "Yes" && value !== "Change Status") btn.setAttribute("onclick", `modal(${num})`);
    if(value === "No" || value === "Yes") btn.style.margin = "5%";
    if(value === "Change Status") {
        btn.title = "Change Status";
        btn.setAttribute("onclick", `changeAccountStatus(${num})`)
    }
    let btnValue = value;
    if(value === "Change Status") btnValue = (status.toLowerCase() === "active") ? "Deactivate" : "Activate";
    const btnText = document.createTextNode(btnValue);
    btn.appendChild(btnText); 
    return btn;
}

const createAccountModal = (a, table, status) => {
    const div = document.createElement("div");
    div.classList.add("col-5-5");
        const div1 = document.createElement("div");
        if(status !== "transaction"){
            div1.classList.add("col-5");
                const divImg = document.createElement("div");
                divImg.classList.add("accountImage");
                    const img = document.createElement("img");
                    img.src = "../public/images.png";
                    img.style.minWidth = "100px";
                    img.id = "accountImg";
                divImg.appendChild(img);
            div1.appendChild(divImg);
            div.appendChild(div1);
        }
        const div2 = document.createElement("div");
        if(status === "transaction") div2.classList.add("col-5-5");
        else div2.classList.add("col-5");  
        div2.id = "modalBody"+a;
        div2.appendChild(table);
    if(status !== "transaction"){
            const divBtn = document.createElement("div");
                const closeBtn = createButton("closeSingle", "Close", a, status);
                const updateBtn = createButton("updateSingle", "Change Status", a, status);
            divBtn.appendChild(closeBtn);
            divBtn.appendChild(updateBtn);
        div2.appendChild(divBtn);
    }
    div.appendChild(div2);
    if(status === "transaction")return createAccountModalTemplate(status, a, div)
    return createAccountModalTemplate("_",a, div)
}

const confirmDeleteAction = (a) => {
    const divContainer = document.createElement("div");
    divContainer.id = "confirmAction";
        const div = document.createElement("div");
        div.style.padding = "7% 5% 2% 5%";
        div.style.fontSize = "20px";
        const divText = document.createTextNode("Are You Sure?");
        div.appendChild(divText);
        const noBtn = createButton("noBtn", "No", a);
        const yesBtn = createButton("yesBtn", "Yes", a);
    divContainer.appendChild(div);
    divContainer.appendChild(noBtn);
    divContainer.appendChild(yesBtn);
    const text = "confirmAction";
    return createAccountModalTemplate(text, a, divContainer)
}

const largeImg = document.getElementById("large-img");
const otherImg = document.getElementById("other-img");
const smallImg = document.getElementById("small-img");
const avatar = document.getElementById("avatar");
const uploadErrorBadge = document.getElementById("uploadErrorBadge");
const popUp = document.getElementById("pop-up8");
const uploadButton = document.getElementById("changebtn");

const imageURL = sessionStorage.getItem("profilePic");

const URL = "https://bankaproject.herokuapp.com/api/v1";
const accessToken = sessionStorage.getItem("token");
const head = new Headers({
	'Accept': 'application/json',
	'Authorization': `Bearer ${accessToken}`,
});
const Init = (method,body) => ({ 
	method,
	headers: head,
	mode: 'cors',
  body,  
});


const defaultImageURL = "../public/profile.png";
largeImg.src = (imageURL && imageURL !== "null") ? imageURL : defaultImageURL;
smallImg.src = (imageURL && imageURL !== "null") ? imageURL : defaultImageURL;
otherImg.src = (imageURL && imageURL !== "null") ? imageURL : defaultImageURL;

const uploading = (element,disable) => {
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
    uploadErrorBadge.innerHTML= error;
    uploadErrorBadge.style.display = "block";
}

const hideBadge = () => {
    uploadErrorBadge.style.display = "none";
    uploadErrorBadge.innerHTML= "";
}

const onSuccess = (data) => {
    finished(uploadButton);
    sessionStorage.setItem("profilePic", data.data.imageurl);
    window.location.href = "./dashboard.html";
}
const onFailure = (data) => { 
    finished(uploadButton);
    showBadge(data.error || data.message || data);
}

const uploadPicture = (Image) => {
    const request = new Request(`${URL}/upload`, Init("POST", Image));
    uploading(uploadButton);
  
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

const changeProficPicture = () => { 
    if(avatar.files.length === 0) return showBadge("Choose a picture"); 
    let formdata = new FormData();
    formdata.append("avatar", avatar.value);
    formdata.append("Image", avatar.files[0], `${sessionStorage.getItem("email")}.png`);
    uploadPicture(formdata);
}