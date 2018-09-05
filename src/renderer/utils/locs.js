/**
 * localStorage
 */
const TOKEN_KEY = 'SCREEN_TOKEN'

const base = {
    get(name) {
        let value = localStorage.getItem(name)
        if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
        return value
    },
    set(name, value) {
        if (typeof value === typeof {}) value = JSON.stringify(value)
        return localStorage.setItem(name, value)
    },
    remove(name) {
        return localStorage.removeItem(name)
    }
}

export const tokenLoc = {
    get() {
        return base.get(TOKEN_KEY)
    },
    set(value) {
        return base.set(TOKEN_KEY, value)
    },
    clear() {
        return base.remove(TOKEN_KEY)
    }
}
