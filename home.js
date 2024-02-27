let count = 5;
let tasks = [];
let start = 0;
let btn = document.getElementById("load");
let maindiv1 = document.createElement("div");
maindiv1.setAttribute("id", "main1");
let di = document.getElementById("di");
let checkUser = [];
checkUser = JSON.parse(localStorage.getItem("logeduser"));
console.log(checkUser);
if (checkUser != null) {
  let cartbtn = document.createElement("button");
  cartbtn.setAttribute("id", "cartbtn");
  cartbtn.textContent = "Cart";
  let a = document.createElement("a");
  a.setAttribute("href", "cart.html");
  a.appendChild(cartbtn);
  document.body.appendChild(a);
  let logout = document.createElement("button");
  logout.setAttribute("id", "out");
  logout.textContent += "Logout";
  document.body.appendChild(logout);
  logout.addEventListener("click", () => {
    localStorage.removeItem("logeduser");
    logout.style.display = "none";
    checkUser = null;
  });
}
function fun() {
  let objArray1 = [];
  if (localStorage.getItem("mytasks") != null) {
    objArray1 = JSON.parse(localStorage.getItem("mytasks"));
  }
  for (let i = start; i < count; i++) {
    if (i < objArray1.length) {
      let obj = objArray1[i];
      let div = document.createElement("div");
      div.setAttribute("class", "maindiv");
      let imgg = document.createElement("img");
      imgg.setAttribute("src",obj.img);
      imgg.setAttribute("id", "im");
      div.appendChild(imgg);
      let h5 = document.createElement("h5");
      h5.setAttribute("class", "heading");
      h5.innerHTML += `Name:)  ` + obj.product;
      div.appendChild(h5);
      let h5desc = document.createElement("h5");
      h5desc.setAttribute("class", "heading");
      h5desc.innerHTML += `Description:)  ` + obj.description;
      div.appendChild(h5desc);
      let h5price = document.createElement("h5");
      h5price.setAttribute("class", "heading");
      h5price.innerHTML += `Price:)  ` + obj.price;

      let addtocart = document.createElement("button");
      addtocart.setAttribute("id", "addtocart");
      addtocart.textContent = "Add to cart";

      div.appendChild(h5price);
      div.appendChild(addtocart);
      maindiv1.appendChild(div);

      document.body.appendChild(maindiv1);

      addtocart.addEventListener("click", () => {
        if (checkUser != null) {
          let ar = [];
          let itemAlreadyAdded = false; 
          if (localStorage.getItem("cart") != null) {
            ar = JSON.parse(localStorage.getItem("cart"));
            for (let i = 0; i < ar.length; i++) {
              if (obj.id == ar[i].id) {
                alert("Item Already added");
                itemAlreadyAdded = true;
                break; 
              }
            }
          }
          if (!itemAlreadyAdded) {
            
            obj.email = checkUser;
            ar.push(obj);
            localStorage.setItem("cart", JSON.stringify(ar));
          }
          window.location.href = "cart.html";
        } else {
          window.location.href = "login.html";
        }
      });
    }
  }
  start = count;
  count += 5;
  if (start >= objArray1.length) {
    btn.style.display = "none";
  }
}
fun();
btn.addEventListener("click", () => {
  fun();
});

