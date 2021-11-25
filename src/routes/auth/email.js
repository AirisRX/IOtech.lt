import stringHash from 'string-hash'
import * as cookie from 'cookie'
import {v4 as uuidv4} from 'uuid'
import {Tedis} from "tedis"

const db = new Tedis({host: "127.0.0.1", port: 6379})

export async function post({body}) {
    if (!body.email) {
        return {
            status: 422,
            body: {
                message: "Missing e-mail"
            }
        }
    }

    const user = JSON.parse(await db.get(body.email))
    return {
        status: 200,
        body: {
            message: !!user
        }
    }
}

