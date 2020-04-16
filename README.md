# Census GraphQL-Apollo-Express Server (Population registration backend server)

This is a simple apollo-graphql-express server built while learning GraphQL. This server does not cover all the use cases related to population registration but the intention is to cover explore graphql arena using type-graphql, type-orm, using meta-programming instead of writing schema files etc.
Also, from security point of view, secure JWT token based authentication and autorization(with secure cookies) is implemeted with refresh token to invalidate any session anytime from back-end

### Demo(GIF)

[GraphQL playground is available at](https://census-graphql-server.herokuapp.com/graphql)
It is deployed on heroku.

### Prerequisites

Please install latest [NodeJS](https://nodejs.org) & NPM which is required to run this app.

This app can be tested with client mobile app developed using React-Native [Census-App](https://github.com/noghanodedra/census-app).
Clone this repository locally and follow set up intructions available on that repository.
You will also need to have Xcode and iOS simulator set up for IOS and for Android will need respective SDK & emulator set up before hand.

### Installing

Clone the repository by below command.

```
git clone https://github.com/noghanodedra/census-graphql-server.git
```

Then CD to cloned repo folder by

```
cd census-graphql-server
npm install
```

### Locally running the app

Use below commands to start the app locally from the project root folder.

```
npm start
```

### Database and other settings

For database , type-orm is used so all supported databases can be used. To configure database change settings in below file.

```
ormconfig.json
```

For cross-domain origin url(local development) and access-token secret, token expiration time use below file.

```
.env
```

## Built With

- [Apollo GraphQL](https://www.apollographql.com/) - Simplify app development by combining APIs, databases, and microservices into a single data graph that you can query with GraphQL
- [apollo-server-express](https://www.npmjs.com/package/apollo-server-express) - Express and Connect integration of GraphQL Server
- [type-graphql](https://github.com/MichalLytek/type-graphql) - Create GraphQL schema and resolvers with TypeScript, using classes and decorators!
- [type-orm](https://typeorm.io) - TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).

## Authors

- **Noghan Odedra** - (https://www.linkedin.com/in/noghanodedra)
