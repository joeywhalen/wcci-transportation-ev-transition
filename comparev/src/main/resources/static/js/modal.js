const contactsModal = function () {

  let modal = document.getElementById("myModal");
  let btn = document.getElementById("myBtn");
  let span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
    console.log("Clicked.")
  }

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }

  }

}

export {
  contactsModal
}