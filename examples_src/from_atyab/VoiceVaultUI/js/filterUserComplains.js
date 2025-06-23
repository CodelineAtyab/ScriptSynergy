// const complainViewDivObj = document.getElementById("complainViewDiv");

document.getElementById("userList").addEventListener("change", (event) => {
  // Handle complaint selection change
  const selectedValue = event.target.value;
  const selectedOption = event.target.options[event.target.selectedIndex];

  console.log(selectedValue);

  const filteredComplains = filterComplainsOptionsByUserId(selectedValue);

  console.log(filteredComplains);

  hideAllComplaintOptions();
  
  showSpecificComplainOptions(filteredComplains);

  if(filteredComplains.length > 0 && filteredComplains[0] instanceof HTMLOptionElement) {
    updateComplainView(filteredComplains[0].originalObj.title, filteredComplains[0].originalObj.uuid);
    filteredComplains[0].selected = true;
  }
});
