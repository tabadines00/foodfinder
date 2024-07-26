import { Hono } from 'hono'
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from 'hono/cookie'

import { authCheck } from "../model/model"

export const auth = async (c, next) => {
//	const sessionCookie = getCookie(c, 'session')
//	if (sessionCookie) {
//		await next()
//	} else {
//			
//	}
	//setCookie(c, 'session', 'macha')
	//deleteCookie(c, 'session')
	const authHeader = c.req.header('Authorization')
	
	if (!authHeader) {
		return c.json({ error: 'Unauthorized', ok: false }, 401)	
	} else {
		await next()
	}
}
