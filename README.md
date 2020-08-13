# oneschool

> Recommended IDE: IntelliJ with Cloud Code and Google SDK Setup.

To run a local server, execute this
command:

`mvn package appengine:run`

or

Directly run a `Google App Engine Standard Local Server` from IntelliJ


> Note Make sure to run `yarn build:css` in the webapp directory if you're going to be working with frontend.

yarn - v1.22.4

## branch etiquette

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