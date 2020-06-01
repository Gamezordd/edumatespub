## Importing Login/Registration Form
Import `RenderForm` from `./components` to add form to your component. You may define your custom "login" and "registration" components and add it to the respective routes in the current `App.tsx` file. Since the form fields rendered and actions handled depend on the route, it should work just fine throughout the app.

If you wish to edit the fields, this may be done through `FormFields.tsx` which currently supports Input fields (semantic-ui), Buttons and Dropdowns. Supported props (ex: field type, button color etc.) maybe viewed at `CustomProps.tsx` in the same folder.

Edit: The registration form now has multiple pages, fields for which can be manipulated using the same `FormFields.tsx` file. The rule is that 1st subarray contains page 1 fields and so on.

## Store keys for Firebase
1. Create a copy of `firebaseConfig.example.json`.
2. Add necessary values to the keys.
3. Rename it to `firebaseConfig.json`.

# Run `npm install` before working on the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
