# Changelog

## 2.0.0 (6/25/17)

In light of the release of Node 8, Webpack 3, and Eslint 4, a semver major release is fitting. Node 7 should still work just fine, but Node 8 is recommended as it will be the next LTS version, and is under more active development.

* Upgrade Webpack to 3.0.0  

As Sean Larkin remarked in his [release post on Medium](https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b), Webpack 3 shouldn't break anything when upgrading from version 2.  

* Upgrade Node requirement to >=8.0.0 or >=7.6.0  

Node 8 is out! Yarn will still be used for this project for now, but NPM 5 is awesome and will have similar performance to yarn going forward. One of the most exciting additions to Node, thanks to a newer version of the V8 JavaScript engine, is the ability to use `async`/`await` natively. This will vastly clean up a lot of the `.then` chains used in the server side code of this project. Stay tuned for that!  

Here's a great [Hacker Noon post](https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016) about using `async`/`await` effectively.  

* Upgrade Eslint to 4.0.1

One issue that arose:

https://github.com/eslint/eslint/issues/8720

* More dependency upgrades


## 1.0.0 (05/19/2017)

This marks the first release of the boilerplate! :tada:

Proper documentation is forthcoming, but everything is working as it should for the first release. Please kick the tires and run this off-road. If you find any problems or errors off the bat, please open an issue.