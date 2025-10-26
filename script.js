const bagIcon = document.querySelector("#bag-icon");
const bag = document.querySelector(".bag");
const bagClose = document.querySelector(".bag-close");
bagIcon.addEventListener("click", () => bag.classList.add("active"));
bagClose.addEventListener("click", () => bag.classList.remove("active"));

const addBagButtons = document.querySelectorAll(".add-bag");
addBagButtons.forEach(button => {
  button.addEventListener("click", event => {
    const productCard = event.target.closest(".product-card");
    addToBag(productCard);
  });
});

const bagContent = document.querySelector(".bag-content");
const addToBag = productCard => {
    const productImgSrc = productCard.querySelector(".hidden-img").src;
    const productName = productCard.querySelector(".product-name").textContent;
    const productPrice = productCard.querySelector(".product-price").textContent;
    const productSize = productCard.querySelector(".product-size").textContent;

    const bagItems = bagContent.querySelectorAll(".bag-product-name");
    for (let item of bagItems) {
      if (item.textContent === productName) {
        alert("This item is already in the bag.");
        return;
      }
    }

    const bagBox = document.createElement("div");
    bagBox.classList.add("bag-box");
    bagBox.innerHTML = `
    <img src="${productImgSrc}" class="bag-img">
        <div class="bag-detail">
          <h2 class="bag-product-name">${productName}</h2>
        <span class="bag-price">${productPrice}</span>
        <p class="product-size">${productSize}</p>
        <div class="bag-quantity">
        <button id="decrement">-</button> 
        <span class="number">1</span>
        <button id="increment">+</button>
        
        </div>   
      </div>
      <i class="ri-delete-bin-2-line remove-item"></i>
      `;
    bagContent.appendChild(bagBox);

    bagBox.querySelector(".remove-item").addEventListener("click", () => {
      bagBox.remove();

      updateBagCount(-1);

      updateTotalPrice();

      });
      
     bagBox.querySelector(".bag-quantity").addEventListener("click", event => {
      const numberElement = bagBox.querySelector(".number");
      const decrementButton = bagBox.querySelector("#decrement");
      let quantity = numberElement.textContent;
      
    if (event.target.id === "decrement" && quantity > 1) {
      quantity--;
      if (quantity === 1) {
        decrementButton.style.color = "#f5efeb";
      }
    } else if (event.target.id === "increment") {
      quantity++;
      decrementButton.style.color = "#999";
    }
    numberElement.textContent = quantity;

    updateTotalPrice();
     });

     updateBagCount(1);

     updateTotalPrice();
};

const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector(".total-price");
  const bagBoxes = bagContent.querySelectorAll(".bag-box");
  let total = 0;
  bagBoxes.forEach(bagBox => {
    const priceElement = bagBox.querySelector(".bag-price");
    const quantityElement = bagBox.querySelector(".number");
    const price = priceElement.textContent.replace("NGN", "").replace(/,/g, "");
    const quantity = quantityElement.textContent;
    total += price * quantity;
  });
  totalPriceElement.textContent = `NGN ${total}`;
};

let bagItemCount = 0;
const updateBagCount = change => {
  const bagItemCountBadge = document.querySelector(".bag-item-count");
  bagItemCount += change;
  if (bagItemCount > 0) {
    bagItemCountBadge.style.visibility = "visible";
    bagItemCountBadge.textContent = bagItemCount;
  } else {
    bagItemCountBadge.style.visibility = "hidden";
    bagItemCountBadge.textContent = "";
  }
};

const checkoutButton = document.querySelector(".btn-buy");
checkoutButton.addEventListener("click", () => {
  const bagBoxes = bagContent.querySelectorAll(".bag-box");
  if (bagBoxes.length === 0) {
    alert("Your bag is empty. Please continue Shopping");
    return;
  }

  bagBoxes.forEach(bagBox => bagBox.remove());

  bagItemCount = 0;
  updateBagCount(0);

  updateTotalPrice();

  alert("Thank you for your Purchase!");
});