import cors from 'cors'
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser'
import { userCreate } from "./modules/createUser"
import { authorizations } from "./modules/authorizations"
import { createUserError, authorizationsError } from "./responseData"
import { DataResponse } from './types';
import GoogleAuth from './utils/GoogleAuth'

require('dotenv').config();

const app: Express = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

const port = 3000
const api_url = "/api"

app.post(api_url + "/user/create", (req: Request, res: Response) => {
    try {
        userCreate(req.body).then((result: DataResponse) => {
            return res.status(result.code).send({ ...result })
        }).catch(err => {
            return res.status(err.code).send({ ...err })
        })
    } catch (error) {
        return res.status(500).send({
            ...createUserError,
            dataError: error
        })
    }
})

app.get(api_url + "/user", (_: Request, res: Response) => {
    return res.status(500).send('oops! apparently the address is a little wrong')
})

app.get(api_url + "/dishes", (_: Request, res: Response) => {
    return res.status(200).send(JSON.stringify([
        {
            id: "1",
            title: "Бутерброды",
            showRecept: false,
            weight: 10,
            quantity: 1,
            recept: "отрезать кусочек 2мл колбасы и хлеба. колбасу положить с верху",
            products: [
                {
                    productId: "1",
                    weight: 5,
                    quantity: 1,
                },
                {
                    productId: "2",
                    weight: 22,
                    quantity: 1,
                }
            ]
        }
    ]))
})

app.post(api_url + "/user/login", (req: Request, res: Response) => {
    try {
        authorizations(req.body).then((result: DataResponse) => {
            return res.status(result.code).send({ ...result })
        }).catch(err => {
            return res.status(err.code).send({ ...err })
        })
    } catch (error) {
        return res.status(500).send({
            ...authorizationsError,
            dataError: error
        })
    }
})

app.get(api_url + "/test", async (_: Request, res: Response) => {
    // return res.status(200).send(getAccessToken())
    return res.status(200).send(GoogleAuth.usersBody)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})