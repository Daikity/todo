import cors from 'cors'
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser'
import { userCreate } from "./modules/createUser"
import { createUserError } from "./responseData"
import { DataResponse } from './types';
import { getAccessToken } from "./utils/makeAccessToken"

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
            return res.status(result.code).send({...result})
        }).catch(err => {
            return res.status(err.code).send({...err})
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

app.post(api_url + "/user/login", (_: Request, res: Response) => {
    return res.status(500).send('oops! apparently the address is a little wrong')
})

app.get(api_url + "/test", async (_: Request, res: Response) => {
    const accessToken = getAccessToken()
    return res.status(200).send(accessToken)
    // return res.status(200).send(['test'])
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})