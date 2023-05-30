const request = require ('supertest');
const app = require ('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre =  require('../models/Genre');
require('../models');


let moviesId

test('POST / movies', async () => {
    const movie  = {
        name: "Encanto",
        image:  "http://mi-image.jpg",
        synopsis: "Una joven colombiana puede ser la última esperanza para su familia, cuando descubre que la magia que rodea a Encanto, un lugar encantado que bendice a los niños con dones únicos, se encuentra en serio peligro.",
        releaseYear:"2021",
    } 
    const res = await request(app).post('/movies').send(movie)
    moviesId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();

});

test('POST /movies/:id/actors should set the movies actors', async () => {
    const actor = await Actor.create({ 
        firstName: "Stephanie ",
        lastName:"Alvizuri",
        nationality:"Argentina",
        image: "http://mi-image.jpg",
        birthday:"1981-02-10",
    })
    const res = await request(app)
        .post(`/movies/${moviesId}/actors`)
        .send([actor.id])
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test(' POST /movies/:id/directors should set the movies directors', async() => {
    const director = await Director.create({
        firstName: "Byron",
        lastName:"Howard",
        nationality:"Estadounidense",
        image: "http://mi-image.jpg",
        birthday:"1968-12-26",
    })
    const res = await request(app)
        .post(`/movies/${moviesId}/directors`)
        .send([director.id])
    await director.destroy();
    expect (res.status).toBe(200);
    expect (res.body).toHaveLength(1);
});

test('POST /movies/:id/genres should set the movie genres', async () => {
    const genre = await Genre.create({ 
        name: "Animacion" 
    })
    const res = await request(app)
        .post(`/movies/${moviesId}/genres`)
        .send([genre.id])
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('GET / movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].actors).toBeDefined();
    expect(res.body[0].directors).toBeDefined();
    expect(res.body[0].genres).toBeDefined();
});

test('PUT /movies/:id', async () => {
    const movieUpdated = {
        name: "Encanto updated"
    }
    const res = await request(app)
        .put(`/movies/${moviesId}`)
        .send(movieUpdated);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movieUpdated.name);

});


test('DELETE /movies/:id', async () => {
    const res = await request(app).delete(`/movies/${moviesId}`);
    expect(res.status).toBe(204);
});
