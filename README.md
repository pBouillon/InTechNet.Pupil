# InTechNet.Pupil

InTechNet front-end in Angular - Pupil side

## Installation

> You can find the detailed documentation in french [here](https://pbouillon.gitbook.io/intechnet/)

### Prerequisites

In order to correctly proceed to the installation you will need:

- An up to date version of [npm](https://www.npmjs.com/)
- C# 8.0
- An IDE such as [VS Code](https://code.visualstudio.com/)

### Clone the repository

Start by creating a local copy of this repository

```bash
~$ git clone https://github.com/pBouillon/InTechNet.Pupil/
```

> If you want to work on new features, you can create your very own fork

### Install dependencies

To install all dependencies, simply run the following

```bash
~$ cd InTechNet.Pupil/intechnet-pupils
InTechNet.Pupil/intechnet-pupils$ npm install
```

#### Compile the project

When you still are in the `intechnet-pupils/` folder, run the following:

```bash
InTechNet.Pupil/intechnet-pupils$ ng build
```

The compilation result will be available in the `dist/` folder

### Run the SPA

In order to run the application locally, execute:

```bash
InTechNet.Pupil/intechnet-pupils$ ng serve --open
```

A new tab will be opened with the application running in development mode.
By default the used port is 4201.

> This is not suitable to deploy the website. If you want to serve your product in production mode, see the [related Angular guide](https://angular.io/guide/deployment).
