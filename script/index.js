// Set favicon
document.querySelector("link[rel~='icon']").href = chrome.runtime.getURL("../assets/twitter-favicon.png");

const logo = ["../assets/twitter.png", "../assets/lamento.png"];

function waitForElement(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

// Set loading page icon
waitForElement('[aria-label="Loading…"]').then((container) => {
  // TODO
  container.innerHTML = "";
});

// Set web app icon
waitForElement('[aria-label="X"]').then((elm) => {

  const container = elm.children[0];
  container.innerHTML = "";

  const twitterIcon = document.createElement("img");
  twitterIcon.src = chrome.runtime.getURL(logo[0]);
  twitterIcon.width = 42;
  twitterIcon.height = 42;
  twitterIcon.setAttribute("aria-label", "X");
  twitterIcon.id = "X";

  container.appendChild(twitterIcon);
});


// Attach the replaceImage function to the button click event.
document.getElementById('replaceButton').addEventListener('click', replaceImage);

document.addEventListener("click", (e) => {
  // get element with id="X" and replace it with lamento icon

});

// Change website title
const titleObserver = new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    if (
      mutation.addedNodes.forEach((node) => {
        const title = document.querySelector("title");
        if (node.textContent.endsWith("X"))
          title.innerText = title.innerText.slice(0, -1) + "Twitter";
      })
    );
  }
});

waitForElement("title").then((title) =>
  titleObserver.observe(title, { childList: true })
);
