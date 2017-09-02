import * as request from 'request';

export class UnshareDevice {

    public static get(params: WinkAPI.IObjectIdRequestParameters, email: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            request.delete({
                url: params.host + '/' + params.object_type + 's/' + params.object_id + '/users/' + email,
                json: {},
                headers: {
                    Authorization: 'Bearer ' + params.access_token
                }
            }, (error, response, body) => {
                if(error) {
                    return reject(error.message || error.stack || error);
                }

                if(response.statusCode !== 204) {
                    return reject('non-204 status code received: ' + response.statusCode);
                }

                resolve(body);
            });
        });
    }
}