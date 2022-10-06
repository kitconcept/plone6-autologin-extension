function login({ tab, apiPath, dev, user, password }) {
  const currentBrowser = navigator.userAgent;
  const userAgentHandler =
    currentBrowser.indexOf("Firefox") != -1 ? browser : chrome;

  return fetch(`${apiPath}/++api++/@login`, {
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ login: user, password }),
  })
    .then(function (response) {
      if (response.ok) return response.json();
    })
    .then((data) => {
      if (dev) {
        userAgentHandler.cookies.set({
          url: "http://localhost:3000/",
          domain: "localhost",
          name: "auth_token",
          path: "/",
          value: data.token,
        });
      } else {
        userAgentHandler.cookies.set({
          url: getServerName(apiPath),
          name: "auth_token",
          path: "/",
          value: data.token,
        });
      }
      userAgentHandler.tabs.reload(tab.id);
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

const currentBrowser = navigator.userAgent;
const userAgentHandler =
  currentBrowser.indexOf("Firefox") != -1 ? browser : chrome;

userAgentHandler.browserAction.onClicked.addListener(function (tab) {
  login({
    tab,
    apiPath: `${getServerName(tab.url)}/api`,
    dev: false,
    user: "admin",
    password: "admin",
  }).catch((error) => {
    login({
      tab,
      apiPath: `${getServerName(tab.url)}`,
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
          password: "secret",
        });
      });
    });
  });
});
