# CS4300

Computer Graphics Fall 2020

This project uses [React](https://reactjs.org/) and [Webpack](https://webpack.js.org/) to serve friendly web pages with work from each assignment.

## Organization

Each assignment is contained within a folder called `assignmentN`, in the [`src/`](./src) folder. You can choose to either spin up a development server or build the project (details below) in order to view the project.

<!-- https://www.tablesgenerator.com/markdown_tables# -->

| Name        | Description                                                                    | Type              | Link                      |
| ----------- | ------------------------------------------------------------------------------ | ----------------- | ------------------------- |
| assignment1 | A trivial WebGL application that renders a simple triangle                     | JavaScript, HTML  | [link](./src/assignment1) |
| assignment2 | A simple CAD (Computer Aided Design) application using HTML and WebGL          | JavaScript, HTML  | [link](./src/assignment2) |
| assignment3 | A take on A2 where you can interact with the WebGL canvas using the mouse      | TypeScript, HTML  | [link](./src/assignment3) |
| assignment4 | Apply matrix multiplications on shapes to perform transformations              | TypeScript, React | [link](./src/assignment4) |
| assignment5 | Using 3D perspective projection                                                | TypeScript, React | [link](./src/assignment5) |
| assignment6 | Adding support to move the camera around in WebGL using six degrees of freedom | TypeScript, React | [link](./src/assignment6) |
| assignment7 | Modeling light in a WebGL 3D scene                                             | TypeScript, React | [link](./src/assignment7) |

### Utilities

Files that might be shared between assignments have been placed into the [`common`](./src/common) folder for usages. All imports that use common files must begin like so:

```tsx
import Foo from "@common/my/file";
```

## Development

You can spin up the webpack dev server by running:

```bash
$ npm run dev
```

## Build

If you want to build the project and serve static files, you can run

```bash
$ npm run build
```

and when you're ready to spin up a service that serves these files, you run

```bash
$ npm run serve
```
