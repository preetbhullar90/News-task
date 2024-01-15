const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

afterAll(() => db.end());
beforeEach(() => seed(data));

describe("GET /api/topics", () => {
  test("Get:200 return  all topics ",() => {
      return request(app).get("/api/topics").expect(200);
  });
    
    test("GET: 200 responds with topics data in array", () => {
      return request(app)
        .get("/api/topics")
        .then(({ body }) => {
            const { topic } = body;
          expect(Array.isArray(topic)).toBe(true);
        });
    });



      test("GET:200 return a length of topic array", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            const { topic } = body;
            expect(topic.length).toBe(3);
          });
      });
    
    test("GET:200 sends an array of topics to the client", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
          .then(({ body }) => {
            const {topic} = body
          topic.forEach((topic) => {
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
            
          });
        });
    });
});
