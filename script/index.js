
// let item={
//     item_images:'images/1.jpg',
//     rating:{
//      stars:4.5,
//      reviews:1.4
//     },
//     company_name:"Carlton London",
//     item_name:"Rhodium-Plated CZ Floral Studs",
//     current_price:600,
//     original_price:1800,
//     discounted_price:43
// }

// itemsContainerElement.innerHTML = ` 
//             <div class="item-container">
//                 <img class="item-image" src=${item.item_images}  alt="item image">
//                 <div class="rating">
//                     ${item.rating.stars} ⭐ | ${item.rating.reviews}k
//                 </div>
//                 <div class="company-name">${item.company_name}</div>
//                 <div class="item-name">${item.item_name}</div>
//                 <div class="price">
//                     <span class="current-price">Rs ${item.current_price}</span>
//                     <span class="original-price">Rs ${item.original_price}</span>
//                     <span class="discount">(${item.discounted_price}%)</span>
//                 </div>
//                 <button class="btn-add-bag">Add to bag</button>
//             </div>
//         `;


let bagItems=[];
onLoad();

function onLoad(){
let bagItemStr=localStorage.getItem("bagItems");
bagItems=bagItemStr? JSON.parse(bagItemStr):[];
displayItemOnHomePage();
displayBagIcon();
}
function addToBag(itemID){
    bagItems.push(itemID)
    localStorage.setItem("bagItems",JSON.stringify(bagItems))
    displayBagIcon();
}

function displayBagIcon(){
    
let bagItemCount=document.querySelector(".bag-item-count");

if(bagItems.length>0){

bagItemCount.style.visibility="visible";
bagItemCount.innerText=bagItems.length;

}else{
    bagItemCount.style.visibility="hidden";
}

}


function displayItemOnHomePage(){
let itemsContainerElement = document.querySelector(".items-container");
if(!itemsContainerElement){
        return
    }
let innerHtml='';

items.forEach(item=>{
    innerHtml+=` <div class="item-container">
                <img class="item-image" src=${item.image}  alt="item image">
                <div class="rating">
                    ${item.rating.stars} ⭐ | ${item.rating.count}
                </div>
                <div class="company-name">${item.company}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price">
                    <span class="current-price">Rs ${item.current_price}</span>
                    <span class="original-price">Rs ${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}%)</span>
                </div>
                <button class="btn-add-bag" onClick="addToBag(${item.id})">Add to bag</button>
            </div> `
})

itemsContainerElement.innerHTML=innerHtml;
}



