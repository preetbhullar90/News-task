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
          expect(body.status).toBe(404);
          expect(body.msg).toBe("topics do not exist");
        }
      });
  });
  test("GET:400 return appropriate message if there is invalid path", () => {
    return request(app)
      .get("/api/not-a-topics")
      .then(({ body }) => {
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
          expect(endpoints).toEqual(endpoints);
      })
     
  });
  })
})



describe("GET /api/articles/:article_id", () => {
  test("responds with topics data in object", () => {
    return request(app)
      .get("/api/articles/1")
      .then(({ body }) => {
        const { article } = body;

        expect(article).toBeInstanceOf(Object);
      });
  });

  test("should get article by ID with comment count", () => {
    return request(app)
      .get(`/api/articles?sort_by=article_id`)
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toBeSortedBy("article_id", { descending: true });
      });
  });

  test("should get all articles with default sorting", () => {
    return request(app)
      .get(`/api/articles/`)
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
      });
  });

  test("should get all articles sorted by title in ascending order", () => {
    return request(app)
      .get(`/api/articles?sort_by=title&order=asc`)
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toBeSortedBy("title", { ascending: true });
      });
  });

    test("should get all articles sorted by title in descending order", () => {
      return request(app)
        .get(`/api/articles?sort_by=title&order=desc`)
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(article).toBeSortedBy("title", { descending: true });
        });
    });

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
        const { article } = body;

        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });

  describe("Article error handler", () => {
    test("GET:404 return appropriate message if there is no id", () => {
      return request(app)
        .get("/api/articles/999")
        .then(({ body }) => {
          expect(body.status).toBe(404);
          expect(body.msg).toBe("This article id does not exist");
        });
    });
    test("GET:400 return appropriate message if there is invalid article id", () => {
      return request(app)
        .get("/api/articles/apple")
        .then(({ body }) => {
          expect(body.status).toBe(400);
          expect(body.msg).toBe("Invalid article id");
        });
    });
  });
});




describe("GET /api/articles", () => {
  test("Get:200 return  all articles ", () => {
    return request(app).get("/api/articles")
      .expect(200);
  });

    test("return data sorted by date descending", () => {
      return request(app)
        .get("/api/articles")
        .then(({ body }) => {
          const { article } = body;
          expect(article).toBeSorted({ descending: true });
        });
    });

  test("responds with article data in array", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        const { article } = body;
        expect(article).toBeInstanceOf(Array);
      });
  });



  test(" return a length of article array", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.length).toBe(13);
      });
  });

 test("should return all the articles with correct properties", () => {
   return request(app)
     .get("/api/articles")
     .expect(200)
     .then(({ body }) => {
       const { article } = body;
       article.forEach((article) => {
         expect(article).toHaveProperty("author");
         expect(article).toHaveProperty("title");
         expect(article).toHaveProperty("article_id");
         expect(article).toHaveProperty("topic");
         expect(article).toHaveProperty("created_at");
         expect(article).toHaveProperty("votes");
         expect(article).toHaveProperty("article_img_url");
         expect(article).toHaveProperty("comment_count");
         expect(article).not.toHaveProperty("body");
       });
     });
 });


  test("should return all the articles with correct types", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        article.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.body).not.toBe("string");
          expect(typeof article.comment_count).toBe("number");
        });
      });
  });

  describe("Articles error handler", () => {
    test("GET:404 return appropriate message if there is no database", () => {
      return request(app)
        .get("/api/articles")
        .then(({ body }) => {
          if (body.length === 0) {
            expect(body.status).toBe(404);
            expect(body.msg).toBe("article does not exist");
          }
        });
    });
    test("GET:400 return appropriate message if there is invalid path", () => {
      return request(app)
        .get("/api/not-a-article")
        .then(({ body }) => {
          expect(body.msg).toBe("This path does not exist");
        });
    });
  });
});


describe("GET /api/articles/:article_id/comments", () => {
test("return data sorted by date descending", () => {
  return request(app)
    .get("/api/articles/1/comments")
    .then(({ body }) => {
      const { comment } = body;
      expect(comment).toBeSorted({ descending: true });
    });
});

  test("should return a specific comments by id with correct types", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comment } = body;
        comment.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.article_id).toBe("number");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.votes).toBe("number");
        })

      });
  });
  test("should return all comments by article id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comment } = body;
        comment.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("article_id");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("body");
        })
      });
  });

  describe("Comments error handler", () => {
    test("GET:404 return appropriate message if there is no id", () => {
      return request(app)
        .get("/api/articles/999/comments")
        .then(({ body }) => {
          expect(body.status).toBe(404);
          expect(body.msg).toBe("This article id does not exist");
        });
    });
    test("GET:400 return appropriate message if there is invalid article id", () => {
      return request(app)
        .get("/api/articles/apple/comments")
        .then(({ body }) => {
          expect(body.status).toBe(400);
          expect(body.msg).toBe("Invalid article id");
        });
    });
  });
});




describe("POST /api/articles/1/comments", () => {


test("POST: 201, post with status code 201", () => {
  return request(app)
    .post("/api/articles/5/comments")
    .send({ username: "butter_bridge", body: "body body" })
    .expect(201)
});

test("POST: 201, should return  new posted comment for the given article_id", () => {
  return request(app)
    .post("/api/articles/5/comments")
    .send({ username: "butter_bridge", body: "Body Body" })
    .expect(201)
    .then(({ body }) => {
      const { comment } = body;
      
      expect(comment).toEqual({
        comment_id: 19,
        body: "Body Body",
        article_id: 5,
        author: "butter_bridge",
        votes: 0,
        created_at: expect.any(String),
      });
    });
});
    describe("Comments POST error handler", () => {
      test("GET:404 return appropriate message if there is no id", () => {
        return request(app)
          .post("/api/articles/999/comments")
          .then(({ body }) => {
            expect(body.status).toBe(404);
            expect(body.msg).toBe("username not found");
          });
      });
      test("GET:400 return appropriate message if there is invalid article id", () => {
        return request(app)
          .post("/api/articles/apple/comments")
          .then(({ body }) => {
            expect(body.status).toBe(400);
            expect(body.msg).toBe("Invalid article id");
          });
      });
    });
test("POST: 404, should respond with appropriate message when requesting to post a comment from a username not in users database", () => {
  return request(app)
    .post("/api/articles/5/comments")
    .send({ username: "ppp", body: "Body Body" })
    .then(({ body }) => {
      expect(body.status).toBe(404);
      expect(body.msg).toBe("username not found");
    });
});
});


//UPDATE Article Test

describe('PATCH request', () => { 
  describe("PATCH /api/articles/1", () => {
    test("UPDATE: 200, update with status code 200", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 100 })
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(article.votes).toBe(200)
          expect(article).toBeInstanceOf(Object);
          
        });
    })
         test("should update an article by article_id with a negative inc_votes value", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: -30 })
            .expect(200)
            .then(({ body }) => {
              const { article } = body;
              expect(article.votes).toBe(70) 
        });
         });

  
    
    describe("PATCH POST error handler", () => {
      test("GET:400 should return a 400 status if the inc_votes not a number", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 'no inc' })
          .then(({ body }) => {
           expect(body.status).toBe(400);
            expect(body.msg).toBe("Inc_vote should be a number");
          });
      });

        test("GET:400 return appropriate message if there is invalid article id", () => {
          return request(app)
            .patch("/api/articles/apple")
            .then(({ body }) => {
              expect(body.msg).toBe("Invalid article id");
            });
        });
    });
  });
})


//DELETE Comments
describe('DELETE request', () => {
  describe("DELETE /api/comments/:comment_id", () => {
    test("should delete a comment by comment_id",() => {
      return request(app)
        .delete('/api/comments/1')
        .then((result) => {
          expect(result.status).toBe(204);
       expect(result.body).toEqual({}); 
      })
    });
  
  
      describe("Comments DELETE error handler", () => {
        test("GET:400 should return a 400 status if the id not a number", () => {
          return request(app)
            .delete("/api/comments/apple")
            .then(({ body }) => {
              expect(body.status).toBe(400);
              expect(body.msg).toEqual("Invalid comment id");
            });
        });
 test("GET:404 return appropriate message if there is no id", () => {
   return request(app)
     .delete("/api/comments/999")
     .then((result) => {
     expect(result.status).toBe(404)
       expect(result.body.msg).toEqual("This comment id does not exist");
     });
 });
        
      });
    
  });
})



//GET Users

describe("GET /api/users", () => {
  test("GET 200 responds with users data in array", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { user } = body;
        expect(user).toBeInstanceOf(Array);
      });
  });

  test(" return a length of users array", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { user } = body;
        expect(user.length).toBe(4);
      });
  });

  test("Return objects should have all the properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { user } = body;
        user.forEach((user) => {
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("name");
          expect(user).toHaveProperty("avatar_url");
        });
      });
  });

  describe("Users error handler", () => {
    test("GET:404 return appropriate message if there is no database", () => {
      return request(app)
        .get("/api/users")
        .then(({ body }) => {
          if (body.length === 0) {
            expect(body.status).toBe(404);
            expect(body.msg).toBe("users do not exist");
          }
        });
    });
    test("GET:400 return appropriate message if there is invalid path", () => {
      return request(app)
        .get("/api/not-a-topics")
        .then(({ body }) => {
          expect(body.msg).toBe("This path does not exist");
        });
    });
   });
});



//GET Article By Topic

describe("GET /api/articles/topic", () => {
  test("GET 200 should get all articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.length).toBe(13);
      });
  });

  test(" return a length of topic array", () => {
    return request(app)
      .get(`/api/articles?topic=mitch`)
      .expect(200)
      .then(({body}) => {
        const { article } = body;
       expect(article.length).toBe(12);
      });
  });

  test("Return should filter articles by the topic value", () => {
    return request(app)
      .get(`/api/articles?topic=mitch`)
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        article.forEach((article) => {
          expect(article.topic).toBe("mitch");
          
        });
      });
  });

test("GET: 200, responds with an empty array if topic query in request has no articles associated to it", () => {
  return request(app)
    .get("/api/articles?topic=paper")
    .expect(200)
    .then(({ body }) => {
      const { article } = body;
      expect(article).toEqual([]);
    });
});
  
  test("GET: 200, client can sort articles by given sort_by query, only valid columns are accepted for sorting", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toBeSortedBy("article_id", { descending: true });
      });
  });

  describe("Users error handler", () => {
    test("GET:404 return appropriate message if there is no database", () => {
      return request(app)
        .get("/api/users")
        .then(({ body }) => {
          if (body.length === 0) {
            expect(body.status).toBe(404);
            expect(body.msg).toBe("users do not exist");
          }
        });
    });
    test("GET:400 return appropriate message if there is invalid path", () => {
      return request(app)
        .get("/api/articles?sort_by=not-a-topics")
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
   });
});
