const select = document.getElementById("selectHome");
const input = document.getElementById("input");
const saveButton = document.getElementById("save");

select.addEventListener("change", (event) => {
  input.value = event.target.value;
});

saveButton.addEventListener("click", () => {
  if (input.value.length > 0)
    select.options[select.options.selectedIndex].text = input.value;
});
