import { type Router } from 'express'
import { makeSignUpController } from '../factories/sign-up/signUpFactory'
import { adapterRoute } from '../adapters/express/expressRouteAdapter'
import { makeSignInController } from '../factories/sign-in/signInFactory'

export default function (router: Router): void {
  router.post('/signup', adapterRoute(makeSignUpController()))
  router.post('/signin', adapterRoute(makeSignInController()))
}
