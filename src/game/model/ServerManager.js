import {BusinessDO} from "../GameModel";

const ENDPOINT = 'http://localhost:3001';
const INIT = 'init';

export class ServerManager {
    static sendInitRequest() {
        return new Promise((resolve, reject) => {
            fetch(`${ENDPOINT}/${INIT}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const businesses = data.businesses.map(data => new BusinessDO(data));
                    const user = data.user;
                    resolve({businesses, user});
                }).catch(() => {
                reject('Game Server is not available');
            });
        });
    }
}