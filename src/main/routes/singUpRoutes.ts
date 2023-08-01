import { type Router } from 'express'
import { makeSignUpController } from '../factories/sign-up/signUpFactory'
import { adapterRoute } from '../adapters/express/expressRouteAdapter'

export default function (router: Router): void {
  router.post('/signup', adapterRoute(makeSignUpController()))
}
