chrome.browserAction.onClicked.addListener(function(tab) {
  fetch(`http://localhost:8080/Plone/@login`, {
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ login: "admin", password: "admin" })
  })
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      // alert(JSON.stringify(data.token));
      chrome.cookies.set({
        url: "http://localhost:3000/",
        domain: "localhost",
        name: "auth_token",
        path: "/",
        value: data.token
      });
      chrome.tabs.reload(tab.id);
    });
});
