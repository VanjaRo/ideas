loadTimeFiller = () => {
  let start_load_time = new Date().getTime();
  window.addEventListener("load", () => {
    let end_load_time = new Date().getTime();
    document.getElementById("page-load-time").innerHTML =
      "Percent of life dissatisfaction: " +
      ((end_load_time - start_load_time) / 10).toString() +
      "%";
  });
};
loadTimeFiller();
