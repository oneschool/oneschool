# oneschool

> Always pull before you push

### The recommended IDE: 
- Backend: IntelliJ with Cloud Code and Google SDK Setup.
- Frontend: VSCode with ext: tailwind css intellisense, es6-string-html and live-server.

To run a local server, execute this
command:

`mvn package appengine:run`

or

Directly run a `Google App Engine Standard Local Server` from IntelliJ


### Frontend Setup

Make sure to run the following commands after installing yarn v1.22.4
```
yarn
yarn build:css
// you'd need to build:css anytime you make changes to tailwind.config.js or css/style.css
````

### branch etiquette

- master (mainline) - only after review from team members and Arijit
    - merged only from dev branch
- dev (wip) - Playground
- feature/*featurename* - keep this format for feature branch names.

#### In order to create a new branch:

```
git checkout -b feature/assignment-api
// make commits...
// first push to remote
git push -u origin feature/assignment-api
// further pushes, simply stay on the branch and run
git push

```