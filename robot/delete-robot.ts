import * as request from 'request';
import {RequestResponse} from "request";

export class DeleteRobot {

    public static execute(params: WinkAPI.IRobotIdRequestParameters): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            request.delete({
                url: params.host +
                '/robots' +
                '/' + params.robot_id,
                json: {},
                headers: {
                    Authorization: 'Bearer ' + params.access_token
                }
            }, (error: any, response: RequestResponse, body: any) => {
                if(error) {
                    return reject({
                        statusCode: response.statusCode,
                        message: error.message || error.stack || error
                    });
                }

                if(response.statusCode !== 204) {
                    return reject({
                        statusCode: response.statusCode,
                        message: body && body.errors ? body.errors[0] : 'response code = ' + response.statusCode
                    });
                }

                resolve(body);
            });
        });
    }
}