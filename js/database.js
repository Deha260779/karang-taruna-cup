// ===============================
// DATABASE KARTAR CUP MANAGER
// ===============================

const DB = {

    get(key, defaultValue = null) {

        const data = localStorage.getItem(key);

        if (data === null) return defaultValue;

        return JSON.parse(data);

    },

    set(key, value) {

        localStorage.setItem(key, JSON.stringify(value));

    },

    remove(key) {

        localStorage.removeItem(key);

    },

    clear() {

        localStorage.clear();

    }

};