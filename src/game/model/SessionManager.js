const SESSION_STATE_KEY = 'cat-adventurer';

export class SessionManager {
    static saveState(gameState) {

        localStorage.setItem(SESSION_STATE_KEY, gameState);
    }

    static getState() {
        return localStorage.getItem(SESSION_STATE_KEY);
    }

}