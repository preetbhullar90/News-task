const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const endpoints = require('../endpoints.json')

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
  
  
describe("Topic error handler", () => {
  test("GET:404 return appropriate message if there is no database", () => {
    return request(app)
      .get("/api/topics")
      .then(({ body }) => {
        if (body.length === 0) {
          expect(404);
          expect(body.msg).toBe("topics do not exist");
        }
      });
  });
  test("GET:400 return appropriate message if there is invalid path", () => {
    return request(app)
      .get("/api/not-a-topics")
      .then(({ body }) => {
        expect(400);
        expect(body.msg).toBe("This path does not exist");
      });
  });
});

});


describe("Endpoints", () => {
  describe("GET /api", () => {
    test('return endpoints in json format', () => {
      return request(app)
        .get('/api')
        .then(({body}) => {
          expect(200);
          expect(body).toBeInstanceOf(Object);
        })
    })

    
    test("should return a list of json endpoints", () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          const { endpoints } = body;
          expect(endpoints).toBeInstanceOf(Object)
          expect(endpoints).toEqual(endpoints);
      })
     
  });
  })
})



describe("GET /api/articles/:article_id", () => {
  test("should return a specific article by id with correct types", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(typeof article.article_id).toBe("number");
        expect(typeof article.title).toBe("string");
        expect(typeof article.topic).toBe("string");
        expect(typeof article.author).toBe("string");
        expect(typeof article.body).toBe("string");
        expect(typeof article.created_at).toBe("string");
        expect(typeof article.votes).toBe("number");
        expect(typeof article.article_img_url).toBe("string");
      });
  });
  test("should return a specific article by id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          article: {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          },
        });
      });
  });

  describe('Article error handler', () => {

      test("GET:404 return appropriate message if there is no id", () => {
        return request(app)
          .get("/api/articles/999")
          .then(({ body }) => {
            
              expect(404);
              expect(body.msg).toBe("This article id does not exist");
            
          });
      });
      test("GET:400 return appropriate message if there is invalid article id", () => {
        return request(app)
          .get("/api/articles/apple")
          .then(({ body }) => {
            expect(400);
            expect(body.msg).toBe("Invalid article id");
          });
      });
   })
});







