# Notes-UI
This is a simple Notes Application written using [React](https://react.dev/). This also uses [Material UI](https://mui.com/) for all it's components. It utilizes [React Router DOM](https://reactrouter.com/en/main) for navigation.

## Pages

### Home Page

Displays all the notes saved in the database! User can click on a note to get redirected to the page specific to the particular note.

The (+) button in the bottom navigates the user to the create note page. 

![HomePage](HomePage.png)

### Create page

Contains input boxes to create a note. on clicking the save button the note gets added to the database, and the user is redirected to the home page.

![CreatePage](CreatePage.png)

### Note page

This page is used to display a note. User can also delete the note by clicking the delete button.

![NotePage](NotePage.png)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

