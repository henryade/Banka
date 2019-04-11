/* eslint-disable no-undef */
import request from "request";

describe("Create Account test", () => {
  const endpoint = "http://localhost:3000/api/v1/accounts";
  it("should not create account if there are no parameters", (done) => {
    request.post(endpoint, { json: true, body: {} }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it("should not create a user account if the email is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("email is required");
      done();
    });
  });


  it("should not create a user account if the phone number is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("phone number is required");
      done();
    });
  });

  it("should not create a user account if the first name is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("first name is required");
      done();
    });
  });

  it("should not create a user account if the last name is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("last name is required");
      done();
    });
  });
  it("should not create a user account if the date of birth is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("date of birth is required");
      done();
    });
  });

  it("should not create a user account if the address is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        type: "Savings",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("address is required");
      done();
    });
  });

  it("should not create a user account if the account type is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("Account type is required");
      done();
    });
  });

  it("should not create a user account if the opening balance is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("opening balance is required");
      done();
    });
  });
  it("should create a user account if all credentials are given", (done) => {
    const pageload1 = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        balance: 400040.34,
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
      },
    };

    request.post(endpoint, pageload1, (error, response, body) => {
      const {
        accountNumber, owner, id, createdOn, status, ...acc
      } = body.data;
      expect(response.statusCode).toEqual(201);
      expect(accountNumber).toBeDefined();
      expect(owner).toBeDefined();
      expect(id).toBeDefined();
      expect(status).toBeDefined();
      expect(createdOn).toBeDefined();
      expect(acc).toEqual(pageload1.body);
      done();
    });
  });
});

const testAccountNumber1 = 9000134322;
const testAccountNumber2 = 9000134354;

describe("Activate account test", () => {
  it("should be able to activate account if the body is empty", (done) => {
    request.put(`http://localhost:3000/api/v1/accounts/${testAccountNumber2}/activate`, { json: true, body: {} }, (error, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it("should not do nothing if user account is active", (done) => {

    request.put(`http://localhost:3000/api/v1/accounts/${testAccountNumber1}/activate`, { json: true }, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toBe("Account is active")
      done();
    });
  });

  it("should activate a user account if account is dormant", (done) => {

    request.put(`http://localhost:3000/api/v1/accounts/${testAccountNumber2}/activate`, { json: true }, (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(body.data.status).toBe("active");
      done();
    });
  });

  it("should not activate if account number is invalid", (done) => {
    request.put(`http://localhost:3000/api/v1/accounts/8000134322/activate`, { json: true }, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toBe("Invalid account number");
      done();
    });
  });
});

describe("Deactivate account test", () => {
  
  it("should be able to deactivate account if there are no parameters", (done) => {
    request.put(`http://localhost:3000/api/v1/accounts/${testAccountNumber1}/deactivate`, { json: true, body: {} }, (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it("should not do nothing if user account is dormant", (done) => {
    request.put(`http://localhost:3000/api/v1/accounts/${testAccountNumber2}/deactivate`, { json: true }, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toBe("Account is dormant");
      done();
    });
  });

  
  it("should deactivate a user account if account is active", (done) => {
    request.put(`http://localhost:3000/api/v1/accounts/${testAccountNumber1}/deactivate`, { json: true}, (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(body.data.status).toBe("dormant");
      done();
    });
  });

  it("should not deactivate if account number is invalid", (done) => {
    request.put(`http://localhost:3000/api/v1/accounts/8000134354/deactivate`, { json: true}, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toBe("Invalid account number");
      done();
    });
  });
});

describe("Delete account test", () => {
  it("should do nothing if user account is not found", (done) => {
    request.delete("http://localhost:3000/api/v1/account/8000134354", { json: true }, (error, response, body) => {
      expect(response.statusCode).toEqual(404);
      expect(body.message).toBe("Account Not Found");
      done();
    });
  });

  it("should delete a user account if account is found", (done) => {
    request.delete("http://localhost:3000/api/v1/account/9000134322", { json: true }, (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(body.message).toBe("Account Successfully Delete");
      done();
    });
  });
});
