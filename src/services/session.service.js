const ID_SESSION_KEY = 'id_session';

export const SessionService = {
  getSession() {
    return window.localStorage.getItem(ID_SESSION_KEY);
  },

  saveSession(session) {
    window.localStorage.setItem(ID_SESSION_KEY, session);
  },

  destroySession() {
    window.localStorage.removeItem(ID_SESSION_KEY);
  }
};
