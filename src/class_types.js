const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/.+/;

class ClassTypes {
    #check (methodName, predicate, value) {
        if (!predicate(value)) {
            const actualType = value === null ? "null" : typeof value;
            const actualValue = value === undefined ? "undefined" : `"${String(value)
                .slice(0, 50)}"`;
            throw new TypeError(
                `${methodName} failed: expected ${this.#getExpectedType(methodName)}, got ${actualType} ${actualValue}`,
            );
        }
        return value;
    }

    #getExpectedType (methodName) {
        const types = {
            "isaPositiveInt": "positive integer",
            "isaEmailAddress": "email address",
            "isaString": "string",
            "isaNumber": "number",
            "isaBoolean": "boolean",
            "isaDateObj": "date object",
            "isaDateFormat": "date string",
            "isaURL": "URL",
            "isaArray": "array",
            "isaObject": "object",
            "isaAnyOf": "any of",
            "isaAllOf": "all of",
            "isaNoneOf": "none of",
            "maybe": "optional",
        };
        return types[methodName] || "unknown type";
    }

    validate (name, value, methodName, ...extraArgs) {
        const method = this[methodName];
        if (typeof method !== "function") {
            throw new TypeError(`Unknown method: ${methodName}`);
        }
        return method.call(this, ...extraArgs, value);
    }

    isaPositiveInt (value) {
        return this.#check(
            "isaPositiveInt",
            (v) => Number.isInteger(v) && v >= 1,
            value,
        );
    }

    isaEmailAddress (value) {
        return this.#check(
            "isaEmailAddress",
            (v) => typeof v === "string" && EMAIL_REGEX.test(v),
            value,
        );
    }

    isaString (value) {
        return this.#check(
            "isaString",
            (v) => typeof v === "string",
            value,
        );
    }

    isaNumber (value) {
        return this.#check(
            "isaNumber",
            (v) => typeof v === "number" && !isNaN(v),
            value,
        );
    }

    isaBoolean (value) {
        return this.#check(
            "isaBoolean",
            (v) => typeof v === "boolean",
            value,
        );
    }

    isaDateObj (value) {
        return this.#check(
            "isaDateObj",
            (v) => v instanceof Date && !isNaN(v.getTime()),
            value,
        );
    }

    isaDateFormat (format, value) {
        return this.#check(
            "isaDateFormat",
            (v) => {
                if (typeof v !== "string") return false;
                const formats = {
                    "YYYY-MM-DD": {
                        regex: /^\d{4}-\d{2}-\d{2}$/,
                        validate: (str) => {
                            const [year, month, day] = str.split("-")
                                .map(Number);
                            const date = new Date(year, month - 1, day);
                            return date.getFullYear() === year
                                && date.getMonth() === month - 1
                                && date.getDate() === day;
                        },
                    },
                    "YYYY-MM-DD HH:mm:ss": {
                        regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
                        validate: (str) => {
                            const date = new Date(str.replace(" ", "T"));
                            return !isNaN(date.getTime());
                        },
                    },
                    "YYYY-MM-DDTHH:mm:ss": {
                        regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
                        validate: (str) => {
                            const date = new Date(str);
                            return !isNaN(date.getTime());
                        },
                    },
                    "MM/DD/YYYY": {
                        regex: /^\d{2}\/\d{2}\/\d{4}$/,
                        validate: (str) => {
                            const [month, day, year] = str.split("/")
                                .map(Number);
                            const date = new Date(year, month - 1, day);
                            return date.getFullYear() === year
                                && date.getMonth() === month - 1
                                && date.getDate() === day;
                        },
                    },
                    "MM-DD-YYYY": {
                        regex: /^\d{2}-\d{2}-\d{4}$/,
                        validate: (str) => {
                            const [month, day, year] = str.split("-")
                                .map(Number);
                            const date = new Date(year, month - 1, day);
                            return date.getFullYear() === year
                                && date.getMonth() === month - 1
                                && date.getDate() === day;
                        },
                    },
                    "DD-MM-YYYY": {
                        regex: /^\d{2}-\d{2}-\d{4}$/,
                        validate: (str) => {
                            const [day, month, year] = str.split("-")
                                .map(Number);
                            const date = new Date(year, month - 1, day);
                            return date.getFullYear() === year
                                && date.getMonth() === month - 1
                                && date.getDate() === day;
                        },
                    },
                };
                const formatDef = formats[format];
                if (!formatDef) {
                    throw new TypeError(`Unknown date format: ${format}`);
                }
                if (!formatDef.regex.test(v)) return false;
                return formatDef.validate(v);
            },
            value,
        );
    }

    isaURL (value) {
        return this.#check(
            "isaURL",
            (v) => {
                if (typeof v !== "string") return false;
                try {
                    new URL(v);
                    return URL_REGEX.test(v);
                } catch {
                    return false;
                }
            },
            value,
        );
    }

    isaArray (value) {
        return this.#check(
            "isaArray",
            (v) => Array.isArray(v),
            value,
        );
    }

    isaObject (value) {
        return this.#check(
            "isaObject",
            (v) => typeof v === "object" && v !== null && !Array.isArray(v),
            value,
        );
    }

    isaAnyOf (typeMethods, value) {
        return this.#check(
            "isaAnyOf",
            (v) => {
                for (const method of typeMethods) {
                    try {
                        this[method](v);
                        return true;
                    } catch (e) {
                        if (!(e instanceof TypeError)) {
                            throw e;
                        }
                    }
                }
                return false;
            },
            value,
        );
    }

    isaAllOf (typeMethods, value) {
        return this.#check(
            "isaAllOf",
            (v) => {
                for (const method of typeMethods) {
                    try {
                        this[method](v);
                    } catch (e) {
                        if (!(e instanceof TypeError)) {
                            throw e;
                        }
                        return false;
                    }
                }
                return true;
            },
            value,
        );
    }

    isaNoneOf (typeMethods, value) {
        return this.#check(
            "isaNoneOf",
            (v) => {
                for (const method of typeMethods) {
                    try {
                        this[method](v);
                        return false;
                    } catch (e) {
                        if (!(e instanceof TypeError)) {
                            throw e;
                        }
                    }
                }
                return true;
            },
            value,
        );
    }

    maybe (methodName, value) {
        if (value === null || value === undefined) {
            return value;
        }
        const method = this[methodName];
        if (typeof method !== "function") {
            throw new TypeError(`Unknown method: ${methodName}`);
        }
        return method.call(this, value);
    }
}

module.exports = ClassTypes;
