/* eslint-disable no-undef */
import jasmine from "jasmine";
import request from "request";
import router from "../../routes/index";
import app from "../../app";

describe("Sign in test", () => {
  const endpoint = "http://localhost:8080/api/v1/auth/signin";
  it("expect response code to equal 200", (done) => {
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

  it("should be able to login", (done) => {
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
  it("should not be able to login with wrong credentials", (done) => {
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
  it("should not be able to login with wrong credentials", (done) => {
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
  it("should not able to generate token", (done) => {
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
