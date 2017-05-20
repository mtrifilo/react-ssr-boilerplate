# React Server Side Rendered Boilerplate :rocket:

### [Live Demo](https://react-ssr-boilerplate.matttrifilo.com/)

A minimalistic boiler plate with everything you need to get a server side rendered React application up and running FAST. 

This is meant to be an alternative starter project for Free Code Camp full stack application projects. It's not officially affiliated with Free Code Camp.

Many of the implementations here are opinionated, so feel free to refactor them, or gut them, in anyway you see fit to work for your way of thinking and your use case.

## Batteries Included :battery:

You get everything you need to build out a full stack application with: 
- React
- React Router 4
- Redux
- Webpack 2
- Jest
- Bootstrap 4
- PostCSS
- Express
- Mongoose
- Passport

Out of the box, the boilerplate comes with a few views, and working local and OAuth authentication to get you going. 

The React application itself is what is called a universal (formerly "isomorphic") JavaScript application. This means that on the server, React will render its component tree into HTML markup as a big string, and pass it down to the browser. Instead of the browser having to wait for a JavaScript bundle with the React application, it can simply show the HTML it's getting right away while the JavaScript bundles download. Once the React application code finishes downloading to the client, the JavaScript will be able to handle user interactions without needing to re-render the markup that already arrived pre-rendered from the server. This has huge performance wins for users with slow connections and is becoming a common way serve production React applications, in addition to other frameworks like Angular 2 and 4.

### Why another boilerplate? :dancers:

Free Code Camp encourages students to use a boilerplate collection called `Clementine.js`, which is very powerful and easy to set up. It has great documentation and tutorials so it's the way to go if you're new to building full stack applications.

This boilerplate is meant to be an alternative for students who want to build their full stack application projects using modern tools from the React ecosystem, with a project structure that is tailored to using React and Redux.

There are many mature React boilerplates out their with dozens (or hundreds!) of smart, experienced developers contributing to them all the time, but a lot of them are overly complex for just building a basic full stack application in my opinion. This boilerplate isn't meant to address every use case, or be optimally polished for production ready apps. It's meant to be easy to understand and extend, while encouraging good habits for a good user and developer experience.

I encourage you to learn these technologies deeply before using this for a project, as it is fairly complex. I'll be working on documenting and commenting every aspect of this boilerplate to make it as clear and extendable as possible, but you'll get much more out of it if you have a solid understanding of how the underlying technologies like React, Redux, React Router 4, and Express all work and work together. Server side rendering has gotten easier over time, but that's another level of complexity that needs to be accounted for when adding features.

That said, I think it's beneficial to challenge yourself with modern tools you'll likely find at companies using React every day.
 
### Roadmap :milky_way:

 * Thorough documentation
 * Testing all the things
 * A complete mobile audit

## Quick Start

This project uses `yarn`, but the equivalent `npm` commands will work fine as well.

If you want to run MongoDB locally, make sure it is installed.
run `mongod --version` in your terminal. If you get some version information back, you're ready to go! Otherwise you can either install mongoDB on your system, or set up a cloud MongoDB instance on [mlab.com](mlab.com) for free.

### Clone this Repo

`git clone https://github.com/itxchy/react-ssr-boilerplate.git`

### Install Dependencies

```bash
yarn
```

### Personalize `config.json`

In the root directory, you'll find `config.sample.json`.

Rename it to `config.json`.

Here are the constants it contains:
```js
{
  // The port Express will use
  "expressPort": "4000",
  // The full domain for Passport to use in the GitHub strategy.
  // For actual DNS names, the port will not be necessary
  "domain": "http://localhost:4000",
  // If you're running MongoDB locally, this address will work fine with 
  // the mongo NPM script during development.
  "mongoUriDev": "mongodb://localhost:27017/react-ssr-boiler",
  // You can set up a free MongoDB instance at mlab.com
  "mongoUriProduction": "ENTER_YOUR_PRODUCTION_MONGO_URI_FROM_MLAB_OR_ELSEWHERE",
  // A complex string to be used for creating and verifying JSON Web Tokens
  "jwtSecret": "PickAComplexString1337",
  // Your app's GitHub credentials. 
  // Go to github.com, log in, go to settings, then scroll down to "developer settings"
  // and you'll find "OAuth Applications". Go there to register your new application.
  // The callback URL will be `${domain}/api/login/github/callback`
  // ${domain} is indeed the domain a few lines above, making the URL http://localhost:4000/api/login/github/callback in this case.
  // Once your app is registered, your client ID and client secret will be available
  "GITHUB_CLIENT_ID": "ENTER_YOUR_APP'S_CLIENT_ID",
  "GITHUB_CLIENT_SECRET": "ENTER_YOUR_APP'S_CLIENT_SECRET"
}
```
### Build and Run The Application

#### Development

##### Webpack
To build and watch the client side JavaScript bundles with Webpack 2, run:
```bash
yarn run watch
```

##### Express Server
To start the server, open a separate tab or terminal window and run:
```bash
yarn run server
```

##### MongoDB
To start MongoDB locally, open a separate tab or terminal window and run:
```bash
yarn run mongo
```

##### Jest
To start Jest in watch mode, open a separate tab or terminal window and run:
```bash
yarn run tdd
```

#### Production

To build the production version of your app, run this;
```bash
yarn build:prod
```

`build:prod` will run all of the React and Redux source files through babel, and output them to a production folder in the public directory.

In a development environment, `babel-register` runs on the server, transpiling the application source code on the fly. This is great for development since we don't need to re-compile our code everytime we want serve a change in the application code. In a production environment, it's a waste of resources to recompile the same code over and over again when it hasn't changed.

In a production environment, the server will not use `babel-register` to transpile the application source code. Instead, the server will use a pre-compiled copy of the source code in the `public/production` directory. If you make changes to the source code in this environment, you'll need to re-compile the production code before you'll be able to see the change in production.
