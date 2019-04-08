import server from "../index";
import jasmine from "jasmine";

describe("Hello World Test", () => {
    it("expect 'Hello World'", () => {
        const text = "Hello World";
        expect(text).toBe("Hello World")
    })
})