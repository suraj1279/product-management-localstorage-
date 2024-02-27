let sibutton = document.getElementById("sibutton");

sibutton.addEventListener("click", () => {
  let siname = document.getElementById("siname").value;
  let siemail = document.getElementById("siemail").value;
  let sipass = document.getElementById("sipass").value;
  let objArray1 = [];
  if (localStorage.getItem("User") != null) {
    objArray1 = JSON.parse(localStorage.getItem("User"));
  }
  let obj = {
    name: siname,
    password: sipass, 
    email: siemail,
    role: "user",
  };
  objArray1.push(obj);
  localStorage.setItem("User", JSON.stringify(objArray1));
  if (siemail === "admin@123" && sipass === "123") {
    window.location.href = "login.html";
  } else window.location.href = "home.html";
});
