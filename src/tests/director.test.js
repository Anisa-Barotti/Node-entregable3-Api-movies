const request = require ('supertest');
const app = require ('../app');
require('../models')

let directorsId;

test('POST / directors', async () => {
    const directors  = {
        firstName: "Byron",
        lastName:"Howard",
        nationality:"Estadounidense",
        image: "http://mi-image.jpg",
        birthday:"1968-12-26",
    } 
    const res = await request(app)
        .post('/directors')
        .send(directors);
    directorsId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();

});

test('GET /directors', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /directors/:id', async () => {
    const directorUpdated = {
        firstName: "Byron updated",
    }
    const res = await request(app)
        .put(`/directors/${directorsId}`)
        .send(directorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(directorUpdated.firstName);

});

test('DELETE /directors/:id', async () => {
    const res = await request(app).delete(`/directors/${directorsId}`)
    expect(res.status).toBe(204);
});
