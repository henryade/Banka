"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var db = {
  USERS: {
    ADMIN: [],
    STAFF: [],
    USER: [{
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXI1QGdtYWlsLmNvbSIsImlkIjoyMDAwMDIsImZpcnN0TmFtZSI6ImtzbmRma2QiLCJsYXN0TmFtZSI6ImRmamRmbGZuIiwidHlwZSI6ImNsaWVudCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1NTUyMzM3MjcsImV4cCI6MTU1NTIzNzU4NSwianRpIjoiYjA5NTM2MTMtMTkwMy00N2M3LWJjMTMtZTYzOGNiYzgyNGJkIn0.2FHaotY9jKFFXHpHlu42lpx-HIGWMVAnZOzn-WUDA",
      id: 100001,
      email: "user1@gmail.com",
      firstName: "First",
      lastName: "User",
      password: "$2y$10$a0MwiU52OXxY2heoXj/WUOZ0tIdpL1i180SHna6jjGlsVrHdAUjn2",
      type: "client",
      isAdmin: false
    }, {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI1QGdtYWlsLmNvbSIsImlkIjoyMDAwMDIsImZpcnN0TmFtZSI6ImFkZSIsImxhc3ROYW1lIjoiYWRlIiwidHlwZSI6ImNsaWVudCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1NTUyNDYzNzEsImV4cCI6MTU1NTI0OTk3MX0.jeQR87wJFw4zaAwT9-G1CaH_7k1Kanrj8I84N9DFq5A",
      email: "user5@gmail.com",
      id: 200002,
      firstName: "ade",
      lastName: "ade",
      password: "$2y$10$a0MwiU52OXxY2heoXj/WUOZ0tIdpL1i180SHna6jjGlsVrHdAUjn2",
      type: "client",
      isAdmin: false
    }, {
      token: "token002",
      id: 200001,
      email: "user4@gmail.com",
      firstName: "First",
      lastName: "User",
      password: "$2y$10$a0MwiU52OXxY2heoXj/WUOZ0tIdpL1i180SHna6jjGlsVrHdAUjn2",
      type: "client",
      isAdmin: false
    }]
  },
  ACCOUNTS: [{
    id: 345346,
    accountNumber: 9000134322,
    createdOn: "2019-04-05 19:11",
    owner: 100002,
    status: "active",
    firstName: "Second",
    lastName: "Nme",
    email: "user2@gmail.com",
    type: "Savings",
    balance: 400000.34,
    phoneNumber: "08064372423",
    dob: "1991-05-12",
    address: "11 Banka str., Andela, Lagos, Nigeria"
  }, {
    id: 285346,
    accountNumber: 9000134354,
    createdOn: "2019-04-05 19:11",
    owner: 100002,
    status: "dormant",
    firstName: "Third",
    lastName: "Nme",
    email: "user5@gmail.com",
    type: "Current",
    balance: 400000.34,
    phoneNumber: "08064372423",
    dob: "1991-05-12",
    address: "11 Banka str., Andela, Lagos, Nigeria"
  }],
  TRANSACTIONS: [{
    id: 349046,
    createdOn: "2019-04-06 19:11",
    type: "credit",
    accountNumber: 9000134322,
    cashier: 200002,
    amount: 37000.34,
    OldBalance: 400000.34,
    newBalance: 363000.34,
    Depositor: "self",
    phoneNumber: "080245724321"
  }, {
    id: 349066,
    createdOn: "2019-04-06 19:11",
    type: "debit",
    accountNumber: 9000134354,
    cashier: 200002,
    amount: 37000.34,
    OldBalance: 400000.34,
    newBalance: 363000.34,
    Depositor: "self",
    phoneNumber: "080205724321"
  }]
};

exports.default = JSON.parse(JSON.stringify(db));