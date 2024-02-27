let checkUser = [];
checkUser = JSON.parse(localStorage.getItem("logeduser"));
console.log(checkUser);
if (checkUser != null) {
  let logout = document.createElement("button");
  logout.setAttribute("id", "out");
  logout.textContent += "Logout";
  document.body.appendChild(logout);
  logout.addEventListener("click", () => {
    localStorage.removeItem("logeduser");
    logout.style.display = "none";
    checkUser = null;
    window.location.href = "login.html";
  });
}
let product = document.getElementById("product");
let description = document.getElementById("description");
let price = document.getElementById("price");
let btn = document.getElementById("btn");
let img = document.getElementById("img");
let outdiv = document.getElementById("outdiv");
let tasks = [];
let usercheck = [];
usercheck = localStorage.getItem("logeduser");
if (usercheck) {
  if (localStorage.getItem("mytask") != null) {
    let obj = localStorage.getItem("mytask");
    addToUI(obj);
  }
  btn.addEventListener("click", addproduct);
} else {
  window.location.href = "login.html";
}

function addproduct() {
  if (
    product.value.trim() == "" ||
    description.value.trim() == "" ||
    price.value.trim() == ""
  ) {
    alert("input box is empty");
    return;
  }
  let count = chance.guid();
  // console.log(product.value);
  let obj = {
    id: count,
    product: product.value,
    description: description.value,
    price: price.value,
    img: img.value,
  };
  tasks.push(obj);

  addToUI(obj);
  product.value = "";
  description.value = "";
  price.value = "";
  storeLocalStorage();
}

function addToUI(obj) {
  // console.log(obj);
  let div = document.createElement("div");
  div.setAttribute("id", "divStyle");
  let imgdiv = document.createElement("img");
  imgdiv.setAttribute("src", obj.img);
  imgdiv.setAttribute("id", "imgset");
  let productspan = document.createElement("span");
  productspan.setAttribute("id", "productspan");
  productspan.innerHTML = obj.product;

  let descriptionspan = document.createElement("span");
  descriptionspan.setAttribute("id", "descriptionspan");
  descriptionspan.innerHTML = obj.description;
  let pricespan = document.createElement("span");
  pricespan.setAttribute("id", "pricespan");
  pricespan.innerHTML = obj.price;

  let delbtn = document.createElement("button");
  delbtn.setAttribute("id", "delbtn");
  delbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>`;
  delbtn.addEventListener("click", function () {
    tasks = tasks.filter(function (item) {
      return item.id != obj.id;
    });
    div.remove();
    storeLocalStorage();
  });
  let updbtn = document.createElement("button");
  updbtn.setAttribute("id", "updbtn");
  updbtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
    </svg>`;
  updbtn.addEventListener("click", function () {
    let upddiv = document.createElement("div");
    let updproduct = document.createElement("input");
    updproduct.setAttribute("type", "text");
    updproduct.value = obj.product;
    upddiv.appendChild(updproduct);
    outdiv.appendChild(upddiv);

    let upddescription = document.createElement("input");
    upddescription.setAttribute("type", "text");
    upddescription.value = obj.description;
    upddiv.appendChild(upddescription);
    outdiv.appendChild(upddiv);

    let updprice = document.createElement("input");
    updprice.setAttribute("type", "number");
    updprice.value = obj.price;
    upddiv.appendChild(updprice);
    outdiv.appendChild(upddiv);

    let newupdbtn = document.createElement("button");
    newupdbtn.setAttribute("id", "newupdbtn");
    newupdbtn.textContent = "UPDATE";
    upddiv.appendChild(newupdbtn);
    newupdbtn.addEventListener("click", function () {
      obj.price = updprice.value;
      obj.product = updproduct.value;
      obj.description = upddescription.value;
      upddiv.remove();
      addToUI(obj);
      div.remove();

      storeLocalStorage();
    });
  });
  div.appendChild(productspan);
  div.appendChild(imgdiv);
  div.appendChild(descriptionspan);
  div.appendChild(pricespan);
  div.appendChild(updbtn);
  div.appendChild(delbtn);

  outdiv.appendChild(div);
}

function storeLocalStorage() {
  localStorage.setItem("mytasks", JSON.stringify(tasks));
}

function getLocalStorage() {
  if (localStorage.getItem("mytasks")) {
    tasks = JSON.parse(localStorage.getItem("mytasks"));
  }
  tasks.forEach(function (item) {
    addToUI(item);
  });
}
getLocalStorage();
