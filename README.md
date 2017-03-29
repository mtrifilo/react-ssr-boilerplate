# React Server Side Rendered Boilerplate

> :construction: A work in progress! The first release will be ready soon.

This will be a minimalistic boiler plate with everything you need to get a server side rendered React application up and running FAST. 

This is meant to be an alternative starter project for Free Code Camp full stack application projects. It's not officially affiliated with Free Code Camp. 

## Roadmap

The initial alpha release should be finished by early April.

This will provide a bare-bones full stack application with: 
- React
- React Router 4
- Redux
- Webpack 2
- Express
- Mongoose
- Passport

The application itself will have a few views, and working local and OAuth authentication to get you going. 

It will be a server side rendered universal JavaScript application. This means that React will render the markup into a string on the server, and pass on the prepared markup to the browser. Once the identical React application finishes loading on the client, it will take over interactions without re-rendering the markup that already arrived from the server. This has huge performance wins for users with slow connections and is becoming a common way serve production React applications, in addition to other frameworks like Angular 2 and 4.

## Why another boilerplate?

Free Code Camp encourages students to use a boilerplate collection called `Clementine.js`, which is very powerful and easy to set up. It has great documentation and tutorials so it's the way to go if you're new to building full stack applications.

This boilerplate is meant to be an alternative for students who want to build their full stack application projects using modern tools from the React ecosystem, with a project structure that is tailored to using React and Redux.

There are many mature React boilerplates out their with many smart, experienced developers contributing to them every day, but a lot of them are overly complex for just building a basic full stack application in my opinion. This boilerplate isn't meant to address every use case, or be optimally polished for production ready apps. It's meant to be easy to understand and extend, while encouraging good habits for a good user and developer experience.

I encourage you to learn these technologies deeply before using this for a project, as it is fairly complex. I'll be working on documenting and commenting every aspect of this boilerplate to make it as clear and extendable as possible, but you'll get much more out of it if you have a solid understanding of how the underlying technologies like React, Redux, React Router 4, and Express all work and work together. Server side rendering has gotten easier over time, but that's another level of complexity that needs to be accounted for when adding features.

That said, I think it's beneficial to challenge yourself with modern tools you'll likely find at companies using React every day.

