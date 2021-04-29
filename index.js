function login({ tab, apiPath, dev, user, password }) {
  return fetch(`${apiPath}/@login`, {
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ login: user, password }),
  })
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (dev) {
        chrome.cookies.set({
          url: "http://localhost:3000/",
          domain: "localhost",
          name: "auth_token",
          path: "/",
          value: data.token,
        });
      } else {
        chrome.cookies.set({
          url: getServerName(apiPath),
          domain: getHostName(apiPath),
          name: "auth_token",
          path: "/",
          value: data.token,
        });
      }
      chrome.tabs.reload(tab.id);
    });
}

function getHostName(url) {
  const parsedURL = new URL(url);
  return parsedURL.hostname;
}

function getServerName(url) {
  const parsedURL = new URL(url);
  return parsedURL.origin;
}

chrome.browserAction.onClicked.addListener(function (tab) {
  login({
    tab,
    apiPath: `${getServerName(tab.url)}/api`,
    dev: false,
    user: "admin",
    password: "admin",
  }).catch((error) => {
    login({
      tab,
      apiPath: "http://localhost:8080/Plone",
      dev: true,
      user: "admin",
      password: "admin",
    }).catch((error) => {
      login({
        tab,
        apiPath: "http://localhost:55001/plone",
        dev: true,
        user: "admin",
        password: "admin",
      });
    });
  });
});
