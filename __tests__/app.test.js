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
    
    test("responds with topics data in array", () => {
      return request(app)
        .get("/api/topics")
        .then(({ body }) => {
            const { topic } = body;
          expect(topic).toBeInstanceOf(Array);
        });
    });



      test(" return a length of topic array", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            const { topic } = body;
            expect(topic.length).toBe(3);
          });
      });
    
    test("Return objects should have slug and description properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
          .then(({ body }) => {
            const {topic} = body
          topic.forEach((topic) => {
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
            
          });
        });
    });
  
    
    test('GET:404 return appropriate message if there is no database', () => {
      return request(app).get("/api/topics")
      .then(({body}) => {
        if (body.length === 0) {
          
          expect(404)
        expect(body.msg).toBe("topics do not exist");
        }
      
    })
  })
  test("GET:400 return appropriate message if there is invalid path", () => {
    return request(app)
      .get("/api/not-a-topics")
      .then(({body}) => {
        expect(400);
        expect(body.msg).toBe("This path does not exist");
      });
  });


});
