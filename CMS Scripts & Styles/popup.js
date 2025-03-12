function showPopup() {
  const popup = document.getElementById("sizePopup");
  popup.style.visibility = "visible";
  popup.style.opacity = "1";
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
}

function hidePopup() {
  const popup = document.getElementById("sizePopup");
  popup.style.opacity = "0";
  setTimeout(() => {
    popup.style.visibility = "hidden";
    document.body.style.position = "";
    document.body.style.width = "";
  }, 300);	
}

window.onload = function() {
  document.getElementById("sizePopup").addEventListener("click", hidePopup);
  document.querySelector(".popup-content").addEventListener("click", (e) => e.stopPropagation());
  document.querySelector(".close-btn").addEventListener("click", hidePopup);
};
