const password = document.querySelector("#password");
const hide = document.querySelector("#hide");
const show = document.querySelector("#show");

document.addEventListener("click",(e)=>{
    if(e.target.closest("#show")){
      password.type="text";
      hide.style.display="block";
      show.style.display="none";
    }
    if(e.target.closest("#hide")){
      password.type="password";
      show.style.display="block";
    hide.style.display="none";
    }
})

password.addEventListener("click",hideshowicon);

function hideshowicon(){
    if(password.type=="text"){
      hide.style.display="block";
      show.style.display="none";
    }
    if(password.type=="password"){
    show.style.display="block";
    hide.style.display="none";
    }
}