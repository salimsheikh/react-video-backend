"# Backend Code" 

````js
npm init
npm i -D nodemone
````
npm i -D nodemone(install nodemone for auto restart/refresh code, only for development(-D))

package.json
````js
{
  "name": "react-video-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon src/index.js"
  },
  "author": "Salim Shaikh",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}

````
"type": "module",
"dev": "nodemon src/index.js"


Install Prettier
````js
npm i -D prettier
````
add file .prettierrc setting file
````js
{
    "singleQuote": false,
    "bracketSpacing": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "semi": true
}
````

add .prettierignore ignore file
````js
/.vscode
/node_modules
./dist

*.env
.env
.env.*

````


````js

````