import supertest from 'supertest'
import { app } from '../config/app'

describe('SignUp Routes', () => {
  it('should return an account on success', async () => {
    const result = await supertest(app)
      .post('/api/signup')
      .send({
        name: 'Jhon Does',
        email: 'jhonDoe@email.com',
        password: '123456',
        passwordConfirmation: '123456'
      })

    expect(result.status).toBe(200)
  })
})
