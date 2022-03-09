loadTimeFiller = () => {
  let start_load_time = new Date().getTime();
  window.addEventListener("load", () => {
    let end_load_time = new Date().getTime();
    let timeToLoadServer =
      document.getElementsByClassName("time-to-load")[0].innerHTML;
    document.getElementsByClassName("time-to-load")[0].innerHTML =
      "Total load time: " +
      (end_load_time - start_load_time) +
      "ms (client) + " +
      timeToLoadServer;
  });
};
loadTimeFiller();
