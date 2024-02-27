let filterOrder = JSON.parse(localStorage.getItem("cart"));

let container = document.getElementById("container");
let totalPriceDiv = document.createElement("div");
totalPriceDiv.setAttribute("id", "totalPrice");
container.append(totalPriceDiv);
let rupess = 0;
let totalprice = 0;
let userEmail = [];
userEmail = JSON.parse(localStorage.getItem("logeduser"));
filterOrder = filterOrder.filter((item) => {
  console.log(item.email);
  console.log(userEmail);
  return item.email == userEmail;
});
if (filterOrder.length === 0) {
  document.body.innerHTML = "";
  let homeButton = document.createElement("button");
  homeButton.textContent = "Home";
  homeButton.addEventListener("click", function () {
    window.location.href = "home.html";
  });
  document.body.appendChild(homeButton);
  let message = document.createElement("h2");
  message.innerHTML = "Your Cart is Empty";
  message.style.textAlign = "center";
  document.body.appendChild(message);
} else {
  filterOrder.forEach((item) => {
    var div = document.createElement("div");
    div.setAttribute("class", "cart-item");

    var h2 = document.createElement("h2");
    h2.innerHTML = item.product;
    div.appendChild(h2);

    var image = document.createElement("img");
    image.setAttribute("height", "100");
    image.setAttribute("src", item.img);
    let dd = document.createElement("div");
    dd.setAttribute("class", "set");
    dd.appendChild(image);
    div.appendChild(dd);

    var price = document.createElement("h2");
    price.setAttribute("id", "pri");
    price.innerHTML = item.price + "₹";
    rupess = item.price;
    div.appendChild(price);
    totalprice += parseInt(rupess);

    var quantityDiv = document.createElement("div");
    quantityDiv.setAttribute("class", "quantity");

    var decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    quantityDiv.appendChild(decrementButton);

    var quantityText = document.createElement("span");
    quantityText.textContent = "1";
    quantityDiv.appendChild(quantityText);

    var incrementButton = document.createElement("button");
    incrementButton.textContent = "+";
    quantityDiv.appendChild(incrementButton);

    div.appendChild(quantityDiv);

    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("class", "remove-btn");

    removeButton.addEventListener("click", function () {
      filterOrder = filterOrder.filter((ele) => {
        return ele.id != item.id;
      });
      div.remove();
      localStorage.setItem("cart", JSON.stringify(filterOrder));
      updateTotalPrice();

      if (filterOrder.length === 0) {
        document.body.innerHTML = "";
        let homeButton = document.createElement("button");
        homeButton.textContent = "Home";
        homeButton.addEventListener("click", function () {
          window.location.href = "home.html";
        });
        document.body.appendChild(homeButton);
        let message = document.createElement("h2");
        message.innerHTML = "Your Cart is Empty";
        message.style.textAlign = "center";
        document.body.appendChild(message);
      }
    });

    div.appendChild(removeButton);

    container.appendChild(div);

    decrementButton.addEventListener("click", function () {
      var currentQuantity = parseInt(quantityText.textContent);
      if (currentQuantity > 1) {
        currentQuantity--;
        quantityText.textContent = currentQuantity;
        updateTotalPrice();
      }
    });

    incrementButton.addEventListener("click", function () {
      var currentQuantity = parseInt(quantityText.textContent);
      currentQuantity++;
      quantityText.textContent = currentQuantity;
      updateTotalPrice();
    });
  });
}

totalPriceDiv.textContent = "Total Price: " + totalprice.toFixed(2) + "₹";
var checkoutButton = document.createElement("button");
checkoutButton.textContent = "Checkout";
checkoutButton.setAttribute("class", "btn");
totalPriceDiv.appendChild(checkoutButton);

function updateTotalPrice() {
  var total = 0;
  totalPriceDiv.textContent = "";
  var cartItems = document.querySelectorAll(".cart-item");
  cartItems.forEach((item) => {
    let priceString = item.querySelector("#pri").textContent;
    let price = parseInt(priceString.replace("₹", ""));
    let quantity = parseInt(item.querySelector(".quantity span").textContent);
    total += price * quantity;
  });
  totalPriceDiv.textContent = "Total Price:" + total.toFixed(2) + "₹";
  var checkoutButton = document.createElement("button");
  checkoutButton.textContent = "Checkout";
  checkoutButton.setAttribute("class", "btn");
  let a = document.createElement("a");
  a.setAttribute("href", "payment.html");
  a.appendChild(checkoutButton);
  totalPriceDiv.appendChild(a);
  container.appendChild(totalPriceDiv);
}
