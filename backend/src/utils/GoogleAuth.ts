import { GoogleApis } from "googleapis";
import { env } from './configs'
import { User, Session } from "../types";
import { default as bd_sheets } from "../modules/bd_sheets"

class Google extends GoogleApis {
    private authData: any;
    private client: any;
    private spreadsheetId: any;
    private metaData: any;

    private usersRows: any;
    private usersCols: any;
    private usersSessions: any;

    constructor(keyFile: string, scopes: string, spreadsheetsId: string) {
        super();
        this.authData = new this.auth.GoogleAuth({
            keyFile,
            scopes
        })
        this.spreadsheetId = spreadsheetsId;
        this.instanceMetaData();
        this.instanceUserData();
    }

    private async instanceMetaData() {
        this.client = await this.authData.getClient();
        const googleSheet = await this.sheets({ version: 'v4', auth: this.client })

        this.metaData = await googleSheet.spreadsheets.get({
            auth: this.authData,
            spreadsheetId: this.spreadsheetId,
        });
    }

    private async instanceUserData() {
        const googleSheet = await this.sheets({ version: 'v4', auth: this.client })

        this.usersRows = await googleSheet.spreadsheets.values.get({
            auth: this.authData,
            spreadsheetId: this.spreadsheetId,
            range: "Users!A1:J1"
        });

        this.usersCols = await googleSheet.spreadsheets.values.get({
            auth: this.authData,
            spreadsheetId: this.spreadsheetId,
            range: "Users!A:J"
        });

        this.usersSessions = await googleSheet.spreadsheets.values.get({
            auth: this.authData,
            spreadsheetId: this.spreadsheetId,
            range: "Sessions!A:C"
        });
    }

    private reedTables(data: any): any[] {
        const result: any[] = [];
        for (let d = 1; d < data.length; d++) {
            const instanceData: any = {};
            for (let j = 0; j < data[d].length; j++) {
                instanceData[data[0][j]] = data[d][j]
            }
            result.push(instanceData);
        }
        return result;
    }

    private async updateSessions(): Promise<void> {
        const googleSheet = await this.sheets({ version: 'v4', auth: this.client })

        this.usersSessions = await googleSheet.spreadsheets.values.get({
            auth: this.authData,
            spreadsheetId: this.spreadsheetId,
            range: "Sessions!A:C"
        });
    }

    public async createUser(userData: User): Promise<any> {
        this.instanceUserData()
        const { id, login, password, fullName, dateCreated, sessionExpiresAt, age, mojo, todoListId, role } = userData;
        const googleSheet = await this.sheets({ version: 'v4', auth: this.client })

        const response = await googleSheet.spreadsheets.values.append({
            auth: this.authData,
            spreadsheetId: this.spreadsheetId,
            range: bd_sheets.users_data,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [
                    [id, login, password, fullName, dateCreated, sessionExpiresAt, age, mojo, todoListId, role]
                ]
            }
        })
        return Promise.resolve(response)
    }

    public async createSession(newSession: Session): Promise<any> {
        const googleSheet = await this.sheets({ version: 'v4', auth: this.client })
        const { user_id, access_token, expires_at } = newSession;

        await googleSheet.spreadsheets.values.append({
            auth: this.authData,
            spreadsheetId: this.spreadsheetId,
            range: bd_sheets.sessions,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [
                    [user_id, access_token, expires_at]
                ]
            }
        })

        this.updateSessions()
    }

    public async updateSession(newSession: Session): Promise<any> {
        const googleSheet = await this.sheets({ version: 'v4', auth: this.client })
        const { user_id, access_token, expires_at } = newSession;
        let index: number = 1;

        this.sessions.some((el: Session) => {
            index++;
            return el.user_id === newSession.user_id;
        })

        const range = `Sessions!A${index}:C${index}`
        try {
            await googleSheet.spreadsheets.values.update({
                auth: this.authData,
                spreadsheetId: this.spreadsheetId,
                range: range,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [
                        [user_id, access_token, expires_at]
                    ]
                }
            })
        } catch (error) {
            console.log(error);

        }


        this.updateSessions()
    }

    get usersHead(): Array<string> {
        return this.usersRows?.data.values[0];
    }

    get usersData(): Array<User> {
        return this.reedTables(this.usersCols?.data.values) as Array<User>;
    }

    get sessions(): Array<Session> {
        const sessions: Array<Session> = [];
        const sessionsData: Array<Session> = this.reedTables(this.usersSessions?.data.values);
        sessionsData.forEach((el: Session) => {
            el.expires_at = new Date(el.expires_at);
            sessions.push(el);
        });
        return sessions;
    }

    get metadata(): any {
        return this.metaData;
    }
}

export default new Google('./credentials.json', 'https://www.googleapis.com/auth/spreadsheets', env.GOOGLE_SHEET as string)