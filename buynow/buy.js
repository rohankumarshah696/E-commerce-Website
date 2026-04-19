
import { product } from "../objects.js";

document.addEventListener("DOMContentLoaded",()=>{
    
    const image=document.querySelector(".image");
    const product_name=document.querySelector(".product_name");
    const description=document.querySelector(".description");
    let parameter=new URLSearchParams(window.location.search);
    let id= Number(parameter.get("id"));
    const rangeval=document.querySelector("#rangeval");
    const product_price=document.querySelector(".product_price");
    const total_price=document.querySelector(".total_price");
    
    product.forEach(k=>{
        if(k.id==id){
            image.src=k.src;
            product_name.textContent=k.name;
            description.textContent=k.details;
            product_price.textContent=`Price : ${k.price}`;
            total_price.textContent = "Total Price: " + "$"+Number(product_price.textContent.slice(9)) * Number(rangeval.value);
        }
    })





rangeval.addEventListener("input",function total(){
    if(rangeval.value<0){
        rangeval.value=0;
    }
    total_price.textContent = "Total Price: " + "$"+Number(product_price.textContent.slice(9)) * Number(rangeval.value);
})

})



