/* eslint-disable no-undef */
import jasmine from "jasmine";
import request from "request";
import router from "../../routes/index";
import app from "../../app";

describe("Sign in test", () => {
  const endpoint = "http://localhost:8080/api/v1/auth/signin";
  it("should not login a user when there are no parameters", (done) => {
    request.post(endpoint, { json: true, body: {} }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it("should not login a user when the email is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        password: "password",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("email is required");
      done();
    });
  });


  it("should not login a user when the password is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        email: "user1@gmail.com",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("password is required");
      done();
    });
  });

  it("'should login a user when all the parameters are given", (done) => {
    const pageload = {
      json: true,
      body: {
        email: "user1@gmail.com",
        password: "password",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(body.data).toBeDefined();
      done();
    });
  });
  it("should not login a user with wrong credentials-email", (done) => {
    const pageload = {
      json: true,
      body: {
        email: "use@gmail.com",
        password: "password",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(401);
      expect(body.error).toEqual("Auth failed");
      done();
    });
  });
  it("should not be able to login with wrong credentials-password", (done) => {
    const pageload = {
      json: true,
      body: {
        email: "user1@gmail.com",
        password: "pasword",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(401);
      expect(body.error).toEqual("Auth failed");
      done();
    });
  });
  it("should generate token", (done) => {
    const pageload = {
      json: true,
      body: {
        email: "user1@gmail.com",
        password: "password",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(body.data.token).toBeDefined();
      done();
    });
  });
});


describe("Sign up test", () => {
  const endpoint = "http://localhost:3000/api/v1/auth/signup";
  it("should not signup a user when there are no parameters", (done) => {
    request.post(endpoint, { json: true, body: {} }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it("should not register a user when the email is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Name",
        password: "password",
        confirmPassword: "password",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("email is required");
      done();
    });
  });

  it("should not register a user when the email already exist", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        password: "password",
        confirmPassword: "password",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("email already exist");
      done();
    });
  });

  it("should not register a user when the password is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "BAse",
        email: "user2@gmail.com",
        confirmPassword: "password",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("password is required");
      done();
    });
  });

  it("should not register a user when the first name is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        lastName: "Gone",
        email: "user2@gmail.com",
        password: "password",
        confirmPassword: "password",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("first name is required");
      done();
    });
  });

  it("should not register a user when the last name is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "SThird",
        email: "sdf@gmail.com",
        password: "password",
        confirmPassword: "password",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("last name is required");
      done();
    });
  });

  it("should not register a user when the the passwords dont match", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Game",
        email: "user2@gmail.com",
        password: "password",
        confirmPassword: "pasword",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(401);
      expect(body.error).toEqual("passwords do not match");
      done();
    });
  });

  it("should not register a user when the confirm password is not given", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Fourth",
        lastName: "wskjf",
        email: "user3@gmail.com",
        password: "password",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(401);
      expect(body.error).toEqual("passwords do not match");
      done();
    });
  });

  it("'should register a new user when all the parameters are given", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Forth",
        lastName: "Desth",
        email: "user3@gmail.com",
        password: "password",
        confirmPassword: "password",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toBe(201);
      expect(body.data.token).toBeDefined();
      done();
    });
  });
});
