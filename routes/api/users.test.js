const request = require('supertest');

// Contains all the test for the user API
describe('The User API', () => {
  // Specific test
  it('Returns a list of all users', async () => {
    // Connect to the server and get a response
    // Expect that the response is 200 and to contain JSON
    const res = await request('http://localhost:3000')
      .get('/api/users/list')
      .expect(200)
      .expect('Content-Type', /json/);

    // Expect to get an array
    expect(Array.isArray(res.body)).toBe(true);
    // Expect the array to contain some data
    expect(res.body.length).toBeGreaterThan(0);
    // Expect the first user to be the admin
    expect(res.body[0].username).toBe('administrator');
  });

  // Could add another test here
});
