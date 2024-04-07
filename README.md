# Covid Tracker

This project is a COVID-19 tracking application developed using React. The application allows users to view COVID-19 statistics for that country by searching for the name of the country they want. However, the project was developed specifically to demonstrate how **unit tests** can be implemented.

## Features:

The unit tests used in this project are especially focused on Redux actions and reducers. In addition, issues such as whether some components were rendered correctly and whether the data was processed correctly were also tested. These tests are typically written using popular testing libraries such as Jest and React Testing Library. They play a crucial role in increasing the reliability of the application and detecting errors early.

* **Redux Action Tests:** These tests verify that Redux actions are dispatched correctly and update the state with the expected data. Redux mock store is typically used for these tests.

* **Redux Reducer Tests:** These tests confirm that Redux reducers update the state correctly in response to specific actions and transform the state as expected.

* **Component Render Tests:** Particularly for the DetailPage component, there are tests to ensure it is rendered correctly in different scenarios (loading state, error state, data loaded state).

* **API Integration Tests:** These tests verify that the application makes the correct API requests and processes the received data accurately. Mock API services are often used for these tests.

* **Form Submit Tests:** Tests for the Form component in the Header ensure that when a user enters a country name and submits the form, it redirects the user to the correct page.

## Used Technologies

- React
- React Router Dom
- Axios
- Redux Toolkit
- React Icons
- React Simple Maps
- Tailwind CSS
- React Testing Library
- Testing Library / User Event v14.0
- Jest

## Preview

![kayt2-ezgif com-video-to-gif-converter](https://github.com/serhatakhan/UnitTest-CovidMap/assets/147662915/d5844b76-f9c1-43b7-bf3b-5417ddea43c2)

