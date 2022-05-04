// TODO:
// 1. Add info about author (get JWT from localStorage)
// 2. Add info about theme

const editor = new EditorJS({
  tools: {
    header: Header,
  },
});

window.onload = () => {
  let saveBtn = document.getElementById("btn-save");
  saveBtn.addEventListener("click", () => {
    textTitle = document.getElementById("text-title").value;
    editor
      .save()
      .then((outputData) => {
        console.log("Article data: ", outputData, "Text Title: ", textTitle);
        fetch("/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: textTitle,
            text: outputData,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.link) {
              document.getElementById("link-addr").style.display = "inline";
              document.getElementById("link-addr").innerHTML =
                "Post link: " + data["link"];
              document.getElementById("link-addr").href = data["link"];
              // scroll to the bottom of the page
              window.scrollTo(0, document.body.scrollHeight);
            }
          })
          .catch((err) => console.log(err));
        // if title or content is empty
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  });
};
