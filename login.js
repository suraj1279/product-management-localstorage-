let lobtn = document.getElementById("lobtn");
lobtn.addEventListener("click", () => {
  let loemail = document.getElementById("loemail");
  let lopass = document.getElementById("lopass");
  let obj = [];
  obj = JSON.parse(localStorage.getItem("User"));
  console.log(obj);
  let user = obj.filter((item) => {
    if (item.email === loemail.value && item.password === lopass.value) {
      return true;
    }
  });

  if (user.length == 0) {
    window.location.href = "signup.html";
  } else {
    localStorage.setItem("logeduser", JSON.stringify(loemail.value));
    console.log(user);
    if (user[0].role === "admin") {
      window.location.href = "index.html";
    } else {
      window.location.href = "home.html";
    }
  }
});
