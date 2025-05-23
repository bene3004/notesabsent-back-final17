const LOGGING_ENABLED_KEY = 'logging_enabled';

export const Logger = {
    isEnabled: () => {
        return localStorage.getItem(LOGGING_ENABLED_KEY) === 'true';
    },

    enable: () => {
        localStorage.setItem(LOGGING_ENABLED_KEY, 'true');
        console.log('[Logger] Logging activated.');
    },

    disable: () => {
        localStorage.setItem(LOGGING_ENABLED_KEY, 'false');
        console.log('[Logger] Logging deactivated.');
    },

    log: (...args) => {
        if (Logger.isEnabled()) {
            console.log('[LOG]:', ...args);
        }
    },
};