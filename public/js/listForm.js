const holidayNameInpt = document.querySelector("#present-holiday");
const receiverNameInpt = document.querySelector("#present-receiver");
const presentNameInpt = document.querySelector("#present-name");

const submitBtn = document.querySelector("#present-form__submit");
const presentList = document.querySelector("#present-list");

function getLocStorage() {
  var appStorage = localStorage.getItem("present-list");
  if (appStorage == null) {
    localStorage.setItem("present-list", JSON.stringify({}));
  }
  appStorage = JSON.parse(localStorage.getItem("present-list"));
  return appStorage;
}

function addLocStorage(id, data) {
  var list = getLocStorage();
  list[id] = data;
  localStorage.setItem("present-list", JSON.stringify(list));
}

function removeLocStorage(id) {
  var list = getLocStorage();
  delete list[id];
  localStorage.setItem("present-list", JSON.stringify(list));
}

function newListItem(id, content) {
  let present = document.createElement("div");
  present.classList.add("list__item");
  present.setAttribute("present-id", id);

  let info = document.createElement("div");
  info.classList.add("present-info");

  let title = document.createElement("div");
  title.classList.add("present-title");

  let text = document.createElement("div");
  text.classList.add("present-text");

  title.innerText = content.holidayName + " || " + content.receiverName;
  text.innerText = content.presentName;

  info.appendChild(title);
  info.appendChild(text);

  present.appendChild(info);

  present.innerHTML += '<a class="button present-delete">\n' + "DEL" + "</a>";
  present.querySelector(".present-delete").onclick = function (event) {
    let h = document.querySelector('[present-id="' + id + '"]');
    h.parentElement.removeChild(h);
    removeLocStorage(id);
  };

  return present;
}

function addNewItem(event) {
  input = {
    holidayName: holidayNameInpt.value,
    receiverName: receiverNameInpt.value,
    presentName: presentNameInpt.value,
  };
  if (
    input.holidayName == "" ||
    input.receiverName == "" ||
    input.presentName == ""
  )
    return;
  presentList.appendChild(newListItem(+new Date(), input));
  addLocStorage(+new Date(), input);
  //   clear input fields
}

document.querySelector("#present-form").addEventListener("submit", (event) => {
  event.preventDefault();
  addNewItem(event);
  return false;
});

var locStorage = getLocStorage();
for (let i in locStorage) {
  presentList.appendChild(newListItem(i, locStorage[i]));
}
