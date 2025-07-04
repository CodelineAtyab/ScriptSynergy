document.addEventListener("DOMContentLoaded", function() {
  const fullName = "My Name Is Asma ";
  const nameParts = fullName.split(" ");
  const displayElement = document.getElementById("displyfullName");
  let index = 0;

  function showNext() {
    if (index < nameParts.length) {
      displayElement.textContent = nameParts[index];
      index++;
      setTimeout(showNext, 1000);
    }
  }

  showNext();
});
