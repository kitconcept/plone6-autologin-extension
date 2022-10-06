# Introduction

This is a browser (Chrome) extension for fast (re)login in a Plone 6 (Volto) site while in development. It's also handy in case that Plone kicked us out (ie. one day after last login passed) or in some strange cases that the HMR (Hot Module Reloading) provokes to loose the logged-in state.

## How it works

It perfoms a API call to the current opened tab site (seamless mode `++api++` as backend) or if it fails, to the Plone site in the default location (`http://localhost:8080/Plone` also in seamless mode) using the default admin `user:password` pair.

If the above fails, it also tries the acceptance (RobotFramework) testing server setup (used in Cypress tests) using as backend: `http://localhost:55001/plone` using the robot server testing `user:password`.

Just click on the extension button (Volto logo icon). If the request goes well, and you get authenticated, the page will reload and you'll be authenticated in it.

## Installation

1. Clone the repo in your machine.
2. Open your extensions settings in your browser.
3. Enable development mode
4. Add a new extension (`Load unpacked`) and point the browser to the location you've cloned the repo.
5. Add the extension button to your extension buttons pins
