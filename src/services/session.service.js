const ID_SESSION_KEY = 'id_session';

export const SessionService = {
  getSession() {
    return JSON.parse(window.localStorage.getItem(ID_SESSION_KEY) || '{}');
  },

  saveSession(session) {
    window.localStorage.setItem(ID_SESSION_KEY, JSON.stringify(session));
  },

  destroySession() {
    window.localStorage.removeItem(ID_SESSION_KEY);
  }
};
