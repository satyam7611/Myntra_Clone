const CONVENIENCE_FEE=99;
let bagItemsObject;
onLoad();

function onLoad() {
  loadBagItemsObject();
  displayBagItemContainer();
  displayBagSummary();
}



function displayBagSummary() {
  let displayBagSummary = document.querySelector(".bag-summary");
  let totalItems=bagItems.length;
  let totalMRP=0;
  let totalDiscount=0;
 

  bagItemsObject.forEach(bagItem=>{
    totalMRP+=bagItem.original_price;
    totalDiscount+=bagItem.original_price-bagItem.current_price;
  })

   let finalPayment=0;
   if(bagItems.length!=0){
    finalPayment=totalMRP-totalDiscount+CONVENIENCE_FEE;
   }else{
   
   }


  displayBagSummary.innerHTML = `  <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItems} Items)</div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹ ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount"
                >-₹ ${totalDiscount}</span
              >
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr />
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹ ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni"  >PLACE ORDER</div>
          </button>`;
}

function loadBagItemsObject() {
  bagItemsObject = bagItems.map((itemID) => {
    for (let i = 0; i < items.length; i++) {
      if (itemID == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemsObject);
}

function displayBagItemContainer() {
  let bagContainer = document.querySelector(".bag-items-container");
  let innerHTML = "";
  bagItemsObject.forEach((element) => {
    innerHTML += generateItemHtml(element);
  });
  bagContainer.innerHTML = innerHTML;
}

function removeFromBag(itemID) {
  bagItems = bagItems.filter((bagItemID) => bagItemID != itemID);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemsObject();
  displayBagIcon();
  displayBagItemContainer();
  displayBagSummary();
}

function generateItemHtml(item) {
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period}</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
                   <div class="remove-from-cart"  onClick="removeFromBag(${item.id})">X</div>
            </div>`;
}
