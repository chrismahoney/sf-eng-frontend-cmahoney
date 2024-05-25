# Clear Connect
This project is a basic React application for use while interacting with the Schmidt Futures TGT Team test backend. Tl,dr;? Go ahead and click [here](#getting-started) to fast-forward to getting started.

## Assessment Project Review
This is an engaging exercise for anybody that enjoys software development in general. Not too short, not too long, and with a good amount of learning along the way that made it valuable for me.

### How'd it go?
Good! Bad! Sometimes just annoying! This exercise is a great assessment of technical skill related to frontend JavaScript work. The backend setup overview should be clear to anybody familiar with Docker or can initially follow the simple setup instructions.

## Technologies used/Pre-requisites
The primary technologies used in this project are:
- NodeJS v20 LTS: I tend to standardize on most recent LTS versions of any tool I use day-to-day. That's v20 for Node.
  - `yarn` for package management versus npm.
- [ReactJS](https://react.dev): A hardened frontend framework for webapp development.
- [React Router 6+](https://reactrouter.com/en/main): A mostly standard library for no-reload location transitions for React apps. I was surprised to find a major feature update in version 6, details of which can be found in the React Router section of the project breakdown.
- [Mantine UI](https://mantine.dev): A ReactJS component library that is designed to be consistent, accessible and easy to use. The Mantine Documentation site is able to easily onboard new developers utilizing it for a new or existing project. I believe Mantine accomplishes the goal of intuitive design, consistent styling and accessibility in a way that MaterialUI has yet to provide.
- [Vite](https://vitejs.dev), currently the easiest build system to use with Mantine as it is integrated into their template projects. There are also options to use webpack and other well-known build systems, but in my experience Vite is the easiest to get started with on fast MVP work.
- Started to reach for [Axios](https://github.com/axios/axios) for API calls which I have used on several projects, until encountering the updates to React Router. I chose to instead use standard fetch() calls for this project to keep the dependencies to a minimum while reducing the risk on this short-term exercise. Time to get started.

## Getting Started

### Docker/Docker Compose
- To use Docker (recommended), make sure to have Docker running per the exercise instructions for the backend, and use the `hello-world` tutorial deployment if you are new to using containers. 
- The docker image can be built from this repo using `docker image build -t sf-eng-frontend-cmahoney:latest .`
- Included docker-compose.yml file can be used to deploy the frontend, this would be intended to be used in conjunction with the backend deployment in a combined compose file.

### Manual Execution
Alternatively, the frontend can be executed using `yarn install`:

```
yarn install
yarn run dev
```

This will deploy the development server at `http://localhost:5173`, at which point you can then begin interacting with the application.

## The Interface
