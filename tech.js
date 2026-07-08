import { product,people } from "./objects.js";


const products=document.querySelector(".products");

const review=document.querySelector(".review");
const hero=document.querySelectorAll(".slide");
const nav_search=document.querySelector("#nav_search"); 
const pages=document.querySelector(".pages");
const menu=document.querySelector(".menu"); 
const menu_contents=document.querySelector(".menu_contents"); 
const search_icon=document.querySelector(".search_icon");
const logo=document.querySelector(".logo")
const profile_icon=document.querySelector(".profile_icon");
const cart_icon=document.querySelector(".cart_icon");
const favorites_icon=document.querySelector(".favorites_icon");
const body_container=document.querySelector(".container"); //This is for Searching 
const favourites_score=document.querySelector(".favourites_score");
const cart_score=document.querySelector(".cart_score");
const cart=document.querySelector(".cart");
const favourite=document.querySelector(".favourite");
const purchase=document.querySelectorAll(".purchase");
const search_time=document.querySelectorAll(".searchtime");
const options_active_check=document.querySelectorAll(".options");
let currentslide=0;
let favourites_saved=[];
let carts_saved=[];

      var  favourites =0;
      var cart_items =0;

document.addEventListener("DOMContentLoaded",()=>{



      //Loading Products
         product.forEach(k=>{
            products.innerHTML +=`
            <div data-id="${k.id}" class="relative product_show sm:shadow-black sm:shadow-2xl h-50 sm:h-fit p-2  w-35 sm:w-50 bg-gray-300 rounded-md pt-2  md:w-60 flex justify-center gap-1.5 items-center flex-col pl-3 ">
                <div class="product_details absolute inset-0 bg-white pt-2 flex-col items-center justify-center opacity-0 hidden transition-opacity duration-1000 details text-black   overflow-scroll no-scrollbar">
               <p class="m-1 ext-sm text-gray-700">${k.details}</p>
               <input type="button" value="Close" class="close-details bg-black text-white h-8 w-25 rounded-sm mt-4 cursor-pointer">
            </div> 
                <img src="${k.src}" alt="" class=" h-30 object-cover  mix-blend-multiply rounded-2xl">
                  <p class="font-extrabold text-md">${k.name}</p>
                  <p class="font-bold text-orange-700">${k.price}</p>
                  <div class="flex gap-2 items-center justify-center flex-wrap">
                  <input type="button" value="Buy Now" class="hidden sm:block purchase bg-black  text-white h-8 w-25 rounded-sm cursor-pointer">
                  <input type="button" value="View Details" class="hidden sm:block details bg-black  text-white h-8 w-25 rounded-sm cursor-pointer">
                  </div>
                  <i class="fa-regular fa-heart favourite_list absolute right-2 top-2"></i>
                 <i class="fa-solid fa-cart-shopping absolute left-2 top-2 cart_list">
            </div>
            `
      });


        //Loading People's review
        people.forEach(k=>{
        review.innerHTML += `
        <div class="h-20 sm:h-30 p-2 w-30 sm:w-65 rounded-xl bg-gray-500 shadow-gray-800 shadow-xl flex flex-col overflow-scroll no-scrollbar">
              <div class="person p-1 flex sm:gap-3 items-center">
                <img src="${k.src}" alt="${k.name}" class="h-5 sm:h-15 rounded-full">
                <p class="font-bold sm:text-2xl">${k.name}</p>
              </div>
              <p class=" sm:mt-2 sm:text-md font-medium">${k.review}</p>
        </div>
       `
       });


       //Click Event 
document.addEventListener("click",(e)=>{
      //for profile
      if(e.target.closest(".profile_icon")){
            window.location.href="login page/login.html";
      }
      //buying
      if(e.target.closest(".purchase")){
            let trargetted_btn=e.target.closest(".purchase");
            let product_id=trargetted_btn.closest(".product_show").dataset.id;
         window.location.href=`buynow/buy.html?id=${product_id}`;
      }

      //buying on touch
      function handleProductTap(e) {
    const product = e.target.closest(".product_show");
    const inCart = e.target.closest(".cart_list");
    const inFav = e.target.closest(".favourite_list");

    if (!product) return;      
    if (inCart || inFav) return;    

    if ( window.matchMedia("(max-width: 640px)").matches) {
        const product_id = product.dataset.id;
        if (product_id) {
            window.location.href = `buynow/buy.html?id=${product_id}`;
        }
    }
}

// listen for touch on phone
document.addEventListener("click", handleProductTap, false);
      //for Menu
      if(e.target.closest(".menu")){
            menu_contents.classList.toggle("hidden");
      }
      //Loading Cart items and their value
      if(e.target.closest(".cart_list")){
            let target=e.target.closest(".cart_list");
            let id=target.closest(".product_show").dataset.id;
            target.classList.toggle("text-red-600")
            if(!cart_score.classList.contains("bg-red-600")){
                  cart_score.classList.add("bg-red-600");
            }
            if(target.classList.contains("text-red-600")){
                  cart_items+=1;
                  carts_saved.push(id);
            let obj_string=JSON.stringify(carts_saved);
            localStorage.setItem("Cart",obj_string);
            
            }
            if(!target.classList.contains("text-red-600")){
                  cart_items-=1;
                  for(let i=0;i<carts_saved.length;i++){
                        if(id==carts_saved[i]){
                         carts_saved.splice(i,1);
                        }
                  }
                  let obj_string=JSON.stringify(carts_saved);
            localStorage.setItem("Cart",obj_string);
            
            }
            if(cart_items==0){ 
                  cart_score.classList.remove("bg-red-600");
                  cart_score.textContent="";
                  localStorage.removeItem("Cart");
                  
            }
            else if(cart_items > 9){
                  cart_score.textContent="9+";
            }else{
          cart_score.textContent=cart_items;
            }
      }
      if(e.target.closest(".cart_icon")){
            cart.innerHTML="";
            cart.classList.toggle("hidden");
            cart.classList.toggle("flex");
            let target=e.target.closest(".cart_icon");
            target.classList.toggle("is_active");

            favourite.classList.add("hidden");
            favourite.classList.remove("flex");
            favorites_icon.classList.remove("is_active");

            if(target.classList.contains("is_active")){
                  search_time.forEach(s=>{ 
                s.classList.add("hidden");
            });
            }
           else{
            search_time.forEach(s=>{ 
                s.classList.remove("hidden");
            });
           }
           
           let obj = JSON.parse(localStorage.getItem("Cart")) || [];
           let cart_products_id= obj;
          product.forEach(k=>{
            for(let i=0;i<cart_products_id.length;i++){
                  if(cart_products_id[i]==k.id){
                        cart.innerHTML+=`
                        <div data-id="${k.id}" class="relative product_show shadow-black shadow-2xl h-fit p-2 w-30 sm:w-50 bg-gray-300 rounded-md pt-2  md:w-60 flex justify-center gap-1.5 items-center flex-col pl-3 ">
                <div class="product_details absolute inset-0 bg-white p-4  flex-col items-center justify-center opacity-0 hidden transition-opacity duration-1000 details">
               <h2 class=" font-bold text-lg mb-2">${k.name} Details</h2>
               <p class="price mb-2">Price: ${k.price}</p>
               <p class=" ext-sm text-gray-700">${k.details}</p>
               <input type="button" value="Close" class="close-details bg-black text-white h-8 w-25 rounded-sm mt-4 cursor-pointer">
            </div> 
                <img src="${k.src}" alt="" class=" h-30 object-cover  mix-blend-multiply rounded-2xl">
                  <p class="font-extrabold text-md">${k.name}</p>
                  <p class="font-bold text-orange-700">${k.price}</p>
                  <div class="flex gap-2 items-center justify-center flex-wrap">
                  <input type="button" value="Buy Now" class="purchase bg-black  text-white h-8 w-25 rounded-sm cursor-pointer">
                  <input type="button" value="View Details" class="details bg-black  text-white h-8 w-25 rounded-sm cursor-pointer">
                  </div>
                  <i class="fa-regular fa-heart favourite_list absolute right-2 top-2"></i>
                 <i class="fa-solid fa-cart-shopping absolute left-2 top-2 cart_list">
            </div>
            `
                  }
            }
          })
      }
      //Loading favourites and their value
      if(e.target.closest(".favourite_list")){
            
            let target=e.target.closest(".favourite_list");
            let id=target.closest(".product_show").dataset.id;
            target.classList.toggle("text-red-600")
                  favourites_score.classList.add("bg-red-600");
            if(target.classList.contains("text-red-600")){
                  favourites+=1;
            favourites_saved.push(id);
            let obj_string=JSON.stringify(favourites_saved);
            localStorage.setItem("favourites",obj_string);
            }
            if(!target.classList.contains("text-red-600")){
                  favourites-=1;
                  for(let i=0;i<favourites_saved.length;i++){
                        if(id==favourites_saved[i]){
                         favourites_saved.splice(i,1);
                        }
                  }
                  let obj_string=JSON.stringify(favourites_saved);
            localStorage.setItem("favourites",obj_string);
            }
            if(favourites==0){ 
                  favourites_score.classList.remove("bg-red-600");
                  favourites_score.textContent="";
                  localStorage.removeItem("favourites");
            }
            else if(favourites > 9){
                  favourites_score.textContent="9+";
            }else{
          favourites_score.textContent=favourites;
            }
      }
      if(e.target.closest(".favorites_icon")){
            favourite.innerHTML="";
            favourite.classList.toggle("hidden");
            favourite.classList.toggle("flex");
            let target=e.target.closest(".favorites_icon");
            target.classList.toggle("is_active");

            cart.classList.add("hidden");
            cart.classList.remove("flex");
            cart_icon.classList.remove("is_active");
           
            if(target.classList.contains("is_active")){
                  search_time.forEach(s=>{ 
                s.classList.add("hidden");
            });
            }
           else{
            search_time.forEach(s=>{ 
                s.classList.remove("hidden");
            });
           }
           let obj = JSON.parse(localStorage.getItem("favourites")) || [];
           let fav_products_id= obj;
          product.forEach(k=>{
            for(let i=0;i<fav_products_id.length;i++){
                  if(fav_products_id[i]==k.id){
                        favourite.innerHTML+=`
                        <div data-id="${k.id}" class="relative product_show shadow-black shadow-2xl h-fit p-2 w-30 sm:w-50 bg-gray-300 rounded-md pt-2  md:w-60 flex justify-center gap-1.5 items-center flex-col pl-3 ">
                <div class="product_details absolute inset-0 bg-white p-4  flex-col items-center justify-center opacity-0 hidden transition-opacity duration-1000 details">
               <h2 class=" font-bold text-lg mb-2">${k.name} Details</h2>
               <p class="price mb-2">Price: ${k.price}</p>
               <p class=" ext-sm text-gray-700">${k.details}</p>
               <input type="button" value="Close" class="close-details bg-black text-white h-8 w-25 rounded-sm mt-4 cursor-pointer">
            </div> 
                <img src="${k.src}" alt="" class=" h-30 object-cover  mix-blend-multiply rounded-2xl">
                  <p class="font-extrabold text-md">${k.name}</p>
                  <p class="font-bold text-orange-700">${k.price}</p>
                  <div class="flex gap-2 items-center justify-center flex-wrap">
                  <input type="button" value="Buy Now" class="purchase bg-black  text-white h-8 w-25 rounded-sm cursor-pointer">
                  <input type="button" value="View Details" class="details bg-black  text-white h-8 w-25 rounded-sm cursor-pointer">
                  </div>
                  <i class="fa-regular fa-heart favourite_list absolute right-2 top-2"></i>
                 <i class="fa-solid fa-cart-shopping absolute left-2 top-2 cart_list">
            </div>
            `
                  }
            }
          })
      }
       // SLider adjustment
      if(e.target.closest(".left")){
            currentslide=(currentslide-1+hero.length)%hero.length;
            heroloader(currentslide);
      }
      if(e.target.closest(".right")){
            currentslide=(currentslide+1)%hero.length;
            heroloader(currentslide);
      }
      function heroloader(currentslide){
      hero.forEach((k,i)=>{
             k.classList.toggle("opacity-100",i===currentslide);
             k.classList.toggle("opacity-0",i!==currentslide);
       });
      }
// setInterval(()=>{
//       currentslide = (currentslide + 1) % hero.length;
//           heroloader(currentslide);
//     },3000);

//When search Icon is active
   if (e.target.closest(".search_icon")){
       favourite.classList.add("hidden");
            favourite.classList.remove("flex");
            favorites_icon.classList.remove("is_active");
            cart.classList.add("hidden");
            cart.classList.remove("flex");
            cart_icon.classList.remove("is_active");
            search_icon.classList.toggle("is_active");
            nav_search.classList.toggle("hidden");
            
        if(search_icon.classList.contains("is_active")){
      // When Clicked for the first time
        search_time.forEach(s=>{ 
                s.classList.add("hidden");

            });
      }
      if(window.innerWidth<540 ){

          nav_search.classList.toggle("input_anim_v_small");
          menu.classList.toggle("!hidden");
          cart_icon.classList.toggle("!hidden");
          favorites_icon.classList.toggle("!hidden");
          profile_icon.classList.toggle("!hidden");
   }
     else if(window.innerWidth>=540 && window.innerWidth < 768){
      nav_search.classList.toggle("input_anim_small_screen");
          menu.classList.toggle("!hidden");
          cart_icon.classList.toggle("!hidden");
          favorites_icon.classList.toggle("!hidden");
          profile_icon.classList.toggle("!hidden");
         
   }
   else if(window.innerWidth >=768 && window.innerWidth < 1100){
      nav_search.classList.toggle("input_anim_mid_screen");
      pages.classList.toggle("md:hidden");
      
    }
    else{
      nav_search.classList.toggle("input_anim_big_screen");
      pages.classList.toggle("md:hidden");
       search_icon.classList.remove("search_anim");
      
    }
       nav_search.focus();

    //when clicked to search
    if(!search_icon.classList.contains("is_active")){
      
      search_icon.classList.remove("search_anim");
      search_time.forEach(s=>{ 
                s.classList.remove("hidden");
                body_container.classList.add("hidden");
                 body_container.classList.remove("flex");
            });
    }
    else{
      compare();
    }
}
   
//Viewing Details
if(e.target.closest(".details")){
      // let check_details=document.querySelectorAll(".details");
      // check_details.forEach(k=>{
      //       if(k.classList.contains("opacity-100","z-2")){
      //             k.classList.add("opacity-0");
      //             k.classList.remove("opacity-100","z-2");
      //       }
      
      let details=e.target.closest(".details").closest(".product_show").querySelector(".product_details");;
      details.classList.remove("opacity-0","hidden");
      details.classList.add("flex","opacity-100","z-2");
}
if(e.target.closest(".close-details")){
      let close_details=e.target.closest(".close-details");
      close_details.closest(".product_details").classList.add("opacity-0","hidden");
      close_details.closest(".product_details").classList.remove("opacity-100","z-2","flex");
}
  //Changing products as category
  if(e.target.closest(".options")){
           
            products.innerHTML="";
        let options=e.target.closest(".options");
        let option_value= options.dataset.category.trim().toLowerCase() ;
        options_active_check.forEach(opts=>{
              if(opts.dataset.category.trim().toLowerCase() !==option_value){
                  opts.classList.remove("active");
              }
        })
        options.classList.add("active");
        if(option_value=="all"){
            
            product.forEach(k=>{
            products.innerHTML +=`
            <div data-id="${k.id}" class="relative product_show sm:shadow-black sm:shadow-2xl h-50 sm:h-fit p-2  w-35 sm:w-50 bg-gray-300 rounded-md pt-2  md:w-60 flex justify-center gap-1.5 items-center flex-col pl-3 ">
                <div class="product_details absolute inset-0 bg-white pt-2 flex-col items-center justify-center opacity-0 hidden transition-opacity duration-1000 details text-black   overflow-scroll no-scrollbar">
               <p class="m-1 ext-sm text-gray-700">${k.details}</p>
               <input type="button" value="Close" class="close-details bg-black text-white h-8 w-25 rounded-sm mt-4 cursor-pointer">
            </div> 
                <img src="${k.src}" alt="" class=" h-30 object-cover  mix-blend-multiply rounded-2xl">
                  <p class="font-extrabold text-md">${k.name}</p>
                  <p class="font-bold text-orange-700">${k.price}</p>
                  <div class="flex gap-2 items-center justify-center flex-wrap">
                  <input type="button" value="Buy Now" class="hidden sm:block purchase bg-black  text-white h-8 w-25 rounded-sm cursor-pointer">
                  <input type="button" value="View Details" class="hidden sm:block details bg-black  text-white h-8 w-25 rounded-sm cursor-pointer">
                  </div>
                  <i class="fa-regular fa-heart favourite_list absolute right-2 top-2"></i>
                 <i class="fa-solid fa-cart-shopping absolute left-2 top-2 cart_list">
            </div>
            `
            
      });
        }
        else{
            
                  product.forEach(k=>{
             let product_category=k.category.trim().toLowerCase();
            if( option_value===product_category){
            products.innerHTML +=`
            <div data-id="${k.id}" class="relative product_show sm:shadow-black sm:shadow-2xl h-50 sm:h-fit p-2  w-35 sm:w-50 bg-gray-300 rounded-md pt-2  md:w-60 flex justify-center gap-1.5 items-center flex-col pl-3 ">
                <div class="product_details absolute inset-0 bg-white pt-2 flex-col items-center justify-center opacity-0 hidden transition-opacity duration-1000 details text-black   overflow-scroll no-scrollbar">
               <p class="m-1 ext-sm text-gray-700">${k.details}</p>
               <input type="button" value="Close" class="close-details bg-black text-white h-8 w-25 rounded-sm mt-4 cursor-pointer">
            </div> 
                <img src="${k.src}" alt="" class=" h-30 object-cover  mix-blend-multiply rounded-2xl">
                  <p class="font-extrabold text-md">${k.name}</p>
                  <p class="font-bold text-orange-700">${k.price}</p>
                  <div class="flex gap-2 items-center justify-center flex-wrap">
                  <input type="button" value="Buy Now" class="hidden sm:block purchase bg-black  text-white h-8 w-25 rounded-sm cursor-pointer">
                  <input type="button" value="View Details" class="hidden sm:block details bg-black  text-white h-8 w-25 rounded-sm cursor-pointer">
                  </div>
                  <i class="fa-regular fa-heart favourite_list absolute right-2 top-2"></i>
                 <i class="fa-solid fa-cart-shopping absolute left-2 top-2 cart_list">
            </div>
            `
            }
            
      })
  }
}
});


//Switching on window resize
function switchSearchState(){
if(window.innerWidth <=540 && (nav_search.classList.contains("input_anim_big_screen") || nav_search.classList.contains("input_anim_mid_screen") ||nav_search.classList.contains("input_anim_small_screen"))){
      nav_search.classList.remove("input_anim_big_screen");
      nav_search.classList.remove("input_anim_mid_screen");
      nav_search.classList.remove("input_anim_small_screen");
      nav_search.classList.add("input_anim_v_small");
          menu.classList.add("!hidden");
          cart_icon.classList.add("!hidden");
          favorites_icon.classList.add("!hidden");
          profile_icon.classList.add("!hidden");
          nav_search.focus();
}
if( (window.innerWidth >=540 && window.innerWidth < 768) && (nav_search.classList.contains("input_anim_big_screen") || nav_search.classList.contains("input_anim_mid_screen") || nav_search.classList.contains("input_anim_v_small") )){
      nav_search.classList.remove("input_anim_big_screen");
      nav_search.classList.remove("input_anim_mid_screen");
      nav_search.classList.remove("input_anim_v_small");
      nav_search.classList.add("input_anim_small_screen");
         menu.classList.add("!hidden");
          cart_icon.classList.add("!hidden");
          favorites_icon.classList.add("!hidden");
          profile_icon.classList.add("!hidden"); 
          nav_search.focus();

}
if(window.innerWidth >=768 && (nav_search.classList.contains("input_anim_small_screen") || nav_search.classList.contains("input_anim_big_screen"))){
      nav_search.classList.remove("input_anim_small_screen");
      nav_search.classList.remove("input_anim_big_screen");
      nav_search.classList.add("input_anim_mid_screen");
      cart_icon.classList.remove("opacity-0");
      favorites_icon.classList.remove("opacity-0");
      profile_icon.classList.remove("opacity-0");
      pages.classList.add("md:hidden");
      logo.classList.remove("logo_anim");
      search_icon.classList.remove("search_anim");
      nav_search.focus();
}

if(window.innerWidth>1100 && (nav_search.classList.contains("input_anim_mid_screen") || nav_search.classList.contains("input_anim_small_screen"))){
      nav_search.classList.remove("input_anim_mid_screen");
      nav_search.classList.remove("input_anim_small_screen");
      nav_search.classList.add("input_anim_big_screen");
      cart_icon.classList.remove("opacity-0");
      favorites_icon.classList.remove("opacity-0");
      profile_icon.classList.remove("opacity-0");
      pages.classList.add("md:hidden");
      logo.classList.remove("logo_anim");
      search_icon.classList.remove("search_anim");
      nav_search.focus();
}

}
window.addEventListener("resize", switchSearchState);

//Having items as list
nav_search.addEventListener("input",compare);

   render();
});

     // Adding the favourites and card items
     const render = () => {
                      const product_show=document.querySelectorAll(".product_show");

            if (JSON.parse(localStorage.getItem("Cart")).length){
                  cart_items = JSON.parse(localStorage.getItem("Cart")).length;
                  cart_score.classList.add("bg-red-600");
            if(cart_items > 9){
                  cart_score.textContent="9+";
            }
            else{
          cart_score.textContent=cart_items;
            }
                  //Marking Cart products
              
                       let obj = JSON.parse(localStorage.getItem("Cart"));
                 
                product_show.forEach(k=>{
                  for(let i=0;i<obj.length;i++){
                        if(obj[i] == k.dataset.id){
                            k.querySelector(".cart_list").classList.add("text-red-600");
                            carts_saved.push(obj[i]);
                  }
            }
            });
            }
            if (JSON.parse(localStorage.getItem("favourites")).length){

                  //Loading favourite's value
                  favourites = JSON.parse(localStorage.getItem("favourites")).length;
                 favourites_score.classList.add("bg-red-600");
            if(favourites > 9){
                  favourites_score.textContent="9+";
            }else{
          favourites_score.textContent=favourites;
      }  
      //Marking favourite products
              
                       let obj = JSON.parse(localStorage.getItem("favourites"));
                 
                product_show.forEach(k=>{
                  for(let i=0;i<obj.length;i++){
                        if(obj[i] == k.dataset.id){
                            k.querySelector(".favourite_list").classList.add("text-red-600");
                            favourites_saved.push(obj[i]);
                  }
            }
      });
      }
}
              

function compare(){
      body_container.classList.remove("hidden");
      body_container.classList.add("flex");
       body_container.innerHTML ="";
      search_time.forEach(s=>{
          if(!s.classList.contains("hidden"))  
                {s.classList.add("hidden");}
            });
       let tosearch = nav_search.value.toLowerCase().trim();
      product.forEach( k=>{
            if(k.name.toLowerCase().includes(tosearch) || k.category.toLowerCase().includes(tosearch)){
         body_container.innerHTML +=`
            <div data-id="${k.id}" class="relative product_show shadow-black shadow-2xl h-fit p-2 w-30 sm:w-50 bg-gray-300 rounded-md pt-2  md:w-60 flex justify-center gap-1.5 items-center flex-col pl-3 ">
                <div class="product_details absolute inset-0 bg-white p-4  flex-col items-center justify-center opacity-0 hidden transition-opacity duration-1000 details">
               <h2 class=" font-bold text-lg mb-2">${k.name} Details</h2>
               <p class="price mb-2">Price: ${k.price}</p>
               <p class=" ext-sm text-gray-700">${k.details}</p>
               <input type="button" value="Close" class="close-details bg-black text-white h-8 w-25 rounded-sm mt-4 cursor-pointer">
            </div> 
                <img src="${k.src}" alt="" class=" h-30 object-cover  mix-blend-multiply rounded-2xl">
                  <p class="font-extrabold text-md">${k.name}</p>
                  <p class="font-bold text-orange-700">${k.price}</p>
                  <div class="flex gap-2 items-center justify-center flex-wrap">
                  <input type="button" value="Buy Now" class="purchase bg-black  text-white h-8 w-25 rounded-sm cursor-pointer">
                  <input type="button" value="View Details" class="details bg-black  text-white h-8 w-25 rounded-sm cursor-pointer">
                  </div>
                  <i class="fa-regular fa-heart favourite_list absolute right-2 top-2"></i>
                 <i class="fa-solid fa-cart-shopping absolute left-2 top-2 cart_list">
            </div>
         `
            }
      });
}


