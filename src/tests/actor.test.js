const request = require ('supertest');
const app = require ('../app');
require('../models');

let actorsId;

test('POST / actors', async () => {
    const actors  = {
        firstName: "Stephanie ",
        lastName:"Alvizuri",
        nationality:"Argentina",
        image: "http://mi-image.jpg",
        birthday:"1981-02-10",
    } 
    const res = await request(app)
        .post('/actors')
        .send(actors);
    actorsId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();

});

test('GET /actors', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /actors/:id', async () => {
    const actorUpdated = {
        firstName: "Stephanie Beatriz",
    }
    const res = await request(app)
        .put(`/actors/${actorsId}`)
        .send(actorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actorUpdated.name);

});

test('DELETE /actors/:id', async () => {
    const res = await request(app).delete(`/actors/${actorsId}`)
    expect(res.status).toBe(204);
});
