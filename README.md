# Sundaes on Demand

This project was built to accompany [React Testing Library and Jest](https://www.udemy.com/course/react-testing-library/?couponCode=TEST-LIB-GITHUB) course.

## Goal

The goal of this repo is to demonstrate knowledge about using Jest and React Testing Library

### What will be tested ✅:
- Complex user interactions
  - mutiple form entry, moving through order phases
- mouseover popup
  - test that element disappers from DOM
- simulating server response
  - mock service worker
- async app updates
  - awaiting DOM changes
- global state via context

## App Summary

- Choose ice cream flavors and toppings and submit order
- Flavors and toppings come from server
- order is sent to server
  - use [sundaes-server repo](https://github.com/bonnie/udemy-TESTING-LIBRARY/tree/main/sundae-server) to run the project locally.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.