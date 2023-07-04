import { type Router } from 'express'

export default function (router: Router): void {
  router.post('/signup', (request, response) => {
    response.json({ ok: 'ok' })
  })
}
