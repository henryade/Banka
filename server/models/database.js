const db = {
  USERS: [
    {
      token: "token001",
      id: 100001,
      email: "user1@gmail.com",
      firstName: "First",
      lastName: "User",
      password: "$2y$10$a0MwiU52OXxY2heoXj/WUOZ0tIdpL1i180SHna6jjGlsVrHdAUjn2",
      type: "client",
      isAdmin: false,
    },
  ],
  ACCOUNTS:[
    {
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
      address: "11 Banka str., Andela, Lagos, Nigeria",
    },
    {
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
      address: "11 Banka str., Andela, Lagos, Nigeria",
    },
  ],
};

export default db;
