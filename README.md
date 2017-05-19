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

The React application itself is what is called a univeral (formerly "isomorphic") JavaScript application. This means that on the server, React will render its component tree into HTML markup as a big string, and pass it down to the browser. Instead of the browser having to wait for a JavaScript bundle with the React application, it can simply show the HTML it's getting right away while the JavaScript bundles download. Once the React application code finishes downloading to the client, the JavaScript will be able to handle user interactions without needing to re-render the markup that already arrived pre-rendered from the server. This has huge performance wins for users with slow connections and is becoming a common way serve production React applications, in addition to other frameworks like Angular 2 and 4.

## Why another boilerplate? :dancers:

Free Code Camp encourages students to use a boilerplate collection called `Clementine.js`, which is very powerful and easy to set up. It has great documentation and tutorials so it's the way to go if you're new to building full stack applications.

This boilerplate is meant to be an alternative for students who want to build their full stack application projects using modern tools from the React ecosystem, with a project structure that is tailored to using React and Redux.

There are many mature React boilerplates out their with dozens (or hundreds!) of smart, experienced developers contributing to them all the time, but a lot of them are overly complex for just building a basic full stack application in my opinion. This boilerplate isn't meant to address every use case, or be optimally polished for production ready apps. It's meant to be easy to understand and extend, while encouraging good habits for a good user and developer experience.

I encourage you to learn these technologies deeply before using this for a project, as it is fairly complex. I'll be working on documenting and commenting every aspect of this boilerplate to make it as clear and extendable as possible, but you'll get much more out of it if you have a solid understanding of how the underlying technologies like React, Redux, React Router 4, and Express all work and work together. Server side rendering has gotten easier over time, but that's another level of complexity that needs to be accounted for when adding features.

That said, I think it's beneficial to challenge yourself with modern tools you'll likely find at companies using React every day.
 
 ## Roadmap :milky_way:

 * Thorough documentation
 * Testing all the things
 * A complete mobile audit

