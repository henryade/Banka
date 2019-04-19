
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

A User can solely perform the following functionalities:
* Sign up for an account
* Sign into created account
* Create a bank account
* View previous account transactions
* View a specific account transaction
  
A Staff can solely perform the following functionalities:
* Credit a user account
* Debit a user account

An/A Admin/Staff has the shared access of performing the following functionalities:
* View all active user account
* View all dormant user account
* View accounts owned by a specific user
* View a specific user account
* Delete a specific user account
* Activate a user account
* Deactivate a user account

An Admin can solely perform the following
* Create a staff account
* Create an admin account

## Configuration

### Routes Testing Endpoints

* View previous account transactions ----------- GET /accounts/:account-number/transactions
* View a specific account transaction ---------- GET /transactions/:transaction-id
* View all active user account ----------------- GET /accounts?status=active
* View all dormant user account ---------------- GET /accounts?status=dormant
* View a list of all bank accounts ------------- GET /accounts
* View accounts owned by a specific user ------- GET /user/:user-email-address/accounts
* View a specific user account ----------------- GET /accounts/:account-number


* Sign up for an account ----------------------- POST /auth/signup
* Sign into created account -------------------- POST /auth/signin
* Create a bank account ------------------------ POST /accounts
* Credit a user account ------------------------ POST /transactions/:account-number/credit
* Debit a user account ------------------------- POST /transactions/:account-number/debit
* Create a staff account ----------------------- POST /user
* Create an admin account ---------------------- POST /user  


* Activate a user account ---------------------- PATCH /accounts/:account-number
* Deactivate a user account -------------------- PATCH /accounts/:account-number


* Delete a specific user account --------------- DELETE /accounts/:account-number

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

## Licensing

"The code in this project is licensed under ADC Licence."

