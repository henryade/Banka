
![Logo of the project](UI/images/banka-logo.png)

# BANKA
> Bank with Banka today

A light-weight core banking application that manage all bank account operations. A bank that is readily available to you anywhere you go. Allows you to perform most banking activities, view previous banking transactions, know the state of you financies anywhere you are.

## Developing

After cloning the repository, open the server directory in the banka app before installing package manager:

```shell
git clone https://github.com/henryade/Banka.git
cd Banka/server
npm install
```

- clone repository
- cd Banka/server
- npm install
- start editing...
- Use postman to test all endpoints

## Badges

[![Build Status](https://travis-ci.com/henryade/Banka.svg?branch=develop)](https://travis-ci.com/henryade/Banka)
[![Coverage Status](https://coveralls.io/repos/github/henryade/Banka/badge.svg?branch=develop)](https://coveralls.io/github/henryade/Banka?branch=develop)
<a href="https://codeclimate.com/github/henryade/Banka/maintainability"><img src="https://api.codeclimate.com/v1/badges/30d4b5e07e586ab752cc/maintainability" /></a>
<a href="https://codeclimate.com/github/henryade/Banka/test_coverage"><img src="https://api.codeclimate.com/v1/badges/30d4b5e07e586ab752cc/test_coverage" /></a>

## Features

Route Testing prefix = localhost:(portname)api/v1
***
### A User can solely perform the following functionalities:                               
|Functionalities                         | Route Testing                                |
|:--------------------------------------:|:--------------------------------------------:|
| Sign up for an account                 |POST /auth/signup                             |
| Sign into created account              |POST /auth/signin                             |
| Create a bank account                  |POST /accounts                                |
| View previous account transactions     |GET /accounts/:account-number/transactions    |
| View a specific account transaction    |GET /transactions/:transaction-id             |
  
### A Staff can solely perform the following functionalities:
|Functionalities                         | Route Testing                                |
|:--------------------------------------:|:--------------------------------------------:|
| Credit a user account                  |POST /transactions/:account-number/credit     |
| Debit a user account                   |POST /transactions/:account-number/debit      |

### An/A Admin/Staff has the shared access of performing the following functionalities:
|Functionalities                         | Route Testing                                |
|:--------------------------------------:|:--------------------------------------------:|
|View a list of all bank accounts        |GET /accounts                                 |
|View all active user account            |GET /accounts?status=active                   |
|View all dormant user account           |GET /accounts?status=dormant                  |
|View accounts owned by a specific user  |GET /user/:user-email-address/accounts        |
|View a specific user account            |GET /accounts/:account-number                 |
|Delete a specific user account          |DELETE /accounts/:account-number              |
|Activate a user account                 |PATCH /accounts/:account-number               |
|Deactivate a user account               |PATCH /accounts/:account-number               |

### An Admin can solely perform the following
|Functionalities                         | Route Testing                                |
|:--------------------------------------:|:--------------------------------------------:|
| Create a staff account                 |POST /user                                    |
| Create an admin account                |POST /user                                    |

## Configuration

```
npm run dev   ------ To run app in development
npm run test-dev --- To run development testing

npm run build ------ To build production folder
npm test ----------- To test production ready app
npm start -----------To run production ready app
```

## Technologies Used

*   Nodejs
*   Express
*   joi - validation
*   Eslint - airbnb style
*   Babel 

## Links

Project links:
- Project homepage: https://henryade.github.io/Banka/
- Repository: https://github.com/henryade/Banka

  - In case of sensitive bugs like security vulnerabilities, please contact
    clasiqaas@email.com directly.
- Helpful links:
  - https://youtu.be/0D5EEKH97NA
  - https://github.com/hapijs/joi/blob/v14.3.1/API.md
  - https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
  - https://stackoverflow.com/questions/19877246/nodemailer-with-gmail-and-nodejs

## Licensing

"The code in this project is licensed under ADC Licence."

