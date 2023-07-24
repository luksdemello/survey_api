import { type Router } from 'express'
import { makeSignUpController } from '../factories/sign-up/signUp'
import { adapterRoute } from '../adapters/expressRouteAdapter'

export default function (router: Router): void {
  router.post('/signup', adapterRoute(makeSignUpController()))
}
