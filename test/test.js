const ClassTypes = require("../src/class_types.js");

class TestChild extends ClassTypes {
    testPositiveInt (value) {
        return this.isaPositiveInt(value);
    }

    testEmailAddress (value) {
        return this.isaEmailAddress(value);
    }

    testString (value) {
        return this.isaString(value);
    }

    testNumber (value) {
        return this.isaNumber(value);
    }

    testBoolean (value) {
        return this.isaBoolean(value);
    }

    testDateObj (value) {
        return this.isaDateObj(value);
    }

    testDateFormat (format, value) {
        return this.isaDateFormat(format, value);
    }

    testURL (value) {
        return this.isaURL(value);
    }

    testArray (value) {
        return this.isaArray(value);
    }

    testObject (value) {
        return this.isaObject(value);
    }

    testAnyOf (typeMethods, value) {
        return this.isaAnyOf(typeMethods, value);
    }

    testAllOf (typeMethods, value) {
        return this.isaAllOf(typeMethods, value);
    }

    testNoneOf (typeMethods, value) {
        return this.isaNoneOf(typeMethods, value);
    }
}

describe("ClassTypes", () => {
    let instance;

    beforeEach(() => {
        instance = new TestChild();
    });

    describe("isaPositiveInt", () => {
        test("returns value for positive integers", () => {
            expect(instance.testPositiveInt(1))
                .toBe(1);
            expect(instance.testPositiveInt(42))
                .toBe(42);
            expect(instance.testPositiveInt(999999))
                .toBe(999999);
        });

        test("throws TypeError for zero", () => {
            expect(() => instance.testPositiveInt(0))
                .toThrow(TypeError);
        });

        test("throws TypeError for negative integers", () => {
            expect(() => instance.testPositiveInt(-1))
                .toThrow(TypeError);
        });

        test("throws TypeError for floats", () => {
            expect(() => instance.testPositiveInt(1.5))
                .toThrow(TypeError);
        });

        test("throws TypeError for string numbers", () => {
            expect(() => instance.testPositiveInt("1"))
                .toThrow(TypeError);
        });

        test("throws TypeError for null", () => {
            expect(() => instance.testPositiveInt(null))
                .toThrow(TypeError);
        });

        test("throws TypeError for undefined", () => {
            expect(() => instance.testPositiveInt(undefined))
                .toThrow(TypeError);
        });

        test("throws TypeError for objects", () => {
            expect(() => instance.testPositiveInt({}))
                .toThrow(TypeError);
        });

        test("error message contains expected type", () => {
            try {
                instance.testPositiveInt("abc");
            } catch (e) {
                expect(e.message)
                    .toContain("positive integer");
            }
        });
    });

    describe("isaEmailAddress", () => {
        test("returns value for valid email addresses", () => {
            expect(instance.testEmailAddress("test@example.com"))
                .toBe("test@example.com");
            expect(instance.testEmailAddress("user.name@domain.org"))
                .toBe("user.name@domain.org");
            expect(instance.testEmailAddress("user+tag@example.co.uk"))
                .toBe("user+tag@example.co.uk");
        });

        test("throws TypeError for strings without @", () => {
            expect(() => instance.testEmailAddress("example.com"))
                .toThrow(TypeError);
        });

        test("throws TypeError for strings without domain", () => {
            expect(() => instance.testEmailAddress("user@"))
                .toThrow(TypeError);
        });

        test("throws TypeError for empty string", () => {
            expect(() => instance.testEmailAddress(""))
                .toThrow(TypeError);
        });

        test("throws TypeError for numbers", () => {
            expect(() => instance.testEmailAddress(123))
                .toThrow(TypeError);
        });

        test("throws TypeError for null", () => {
            expect(() => instance.testEmailAddress(null))
                .toThrow(TypeError);
        });

        test("throws TypeError for undefined", () => {
            expect(() => instance.testEmailAddress(undefined))
                .toThrow(TypeError);
        });

        test("throws TypeError for objects", () => {
            expect(() => instance.testEmailAddress({}))
                .toThrow(TypeError);
        });

        test("error message contains expected type", () => {
            try {
                instance.testEmailAddress("invalid");
            } catch (e) {
                expect(e.message)
                    .toContain("email address");
            }
        });
    });

    describe("isaString", () => {
        test("returns value for strings", () => {
            expect(instance.testString("hello"))
                .toBe("hello");
            expect(instance.testString(""))
                .toBe("");
            expect(instance.testString("123"))
                .toBe("123");
        });

        test("throws TypeError for numbers", () => {
            expect(() => instance.testString(123))
                .toThrow(TypeError);
        });

        test("throws TypeError for null", () => {
            expect(() => instance.testString(null))
                .toThrow(TypeError);
        });

        test("throws TypeError for undefined", () => {
            expect(() => instance.testString(undefined))
                .toThrow(TypeError);
        });

        test("throws TypeError for objects", () => {
            expect(() => instance.testString({}))
                .toThrow(TypeError);
        });

        test("throws TypeError for arrays", () => {
            expect(() => instance.testString([]))
                .toThrow(TypeError);
        });

        test("error message contains expected type", () => {
            try {
                instance.testString(123);
            } catch (e) {
                expect(e.message)
                    .toContain("string");
            }
        });
    });

    describe("isaNumber", () => {
        test("returns value for numbers", () => {
            expect(instance.testNumber(0))
                .toBe(0);
            expect(instance.testNumber(-42))
                .toBe(-42);
            expect(instance.testNumber(3.14))
                .toBe(3.14);
        });

        test("throws TypeError for strings", () => {
            expect(() => instance.testNumber("123"))
                .toThrow(TypeError);
        });

        test("throws TypeError for NaN", () => {
            expect(() => instance.testNumber(NaN))
                .toThrow(TypeError);
        });

        test("throws TypeError for null", () => {
            expect(() => instance.testNumber(null))
                .toThrow(TypeError);
        });

        test("throws TypeError for undefined", () => {
            expect(() => instance.testNumber(undefined))
                .toThrow(TypeError);
        });

        test("throws TypeError for objects", () => {
            expect(() => instance.testNumber({}))
                .toThrow(TypeError);
        });
    });

    describe("isaBoolean", () => {
        test("returns value for booleans", () => {
            expect(instance.testBoolean(true))
                .toBe(true);
            expect(instance.testBoolean(false))
                .toBe(false);
        });

        test("throws TypeError for numbers", () => {
            expect(() => instance.testBoolean(1))
                .toThrow(TypeError);
        });

        test("throws TypeError for strings", () => {
            expect(() => instance.testBoolean("true"))
                .toThrow(TypeError);
        });

        test("throws TypeError for null", () => {
            expect(() => instance.testBoolean(null))
                .toThrow(TypeError);
        });

        test("throws TypeError for undefined", () => {
            expect(() => instance.testBoolean(undefined))
                .toThrow(TypeError);
        });
    });

    describe("isaDateObj", () => {
        const validDate = new Date();
        const anotherDate = new Date("2024-01-01");

        test("returns value for valid dates", () => {
            expect(instance.testDateObj(validDate))
                .toBe(validDate);
            expect(instance.testDateObj(anotherDate))
                .toBe(anotherDate);
        });

        test("throws TypeError for invalid dates", () => {
            expect(() => instance.testDateObj(new Date("invalid")))
                .toThrow(TypeError);
        });

        test("throws TypeError for strings", () => {
            expect(() => instance.testDateObj("2024-01-01"))
                .toThrow(TypeError);
        });

        test("throws TypeError for numbers", () => {
            expect(() => instance.testDateObj(1234567890))
                .toThrow(TypeError);
        });

        test("throws TypeError for null", () => {
            expect(() => instance.testDateObj(null))
                .toThrow(TypeError);
        });

        test("throws TypeError for undefined", () => {
            expect(() => instance.testDateObj(undefined))
                .toThrow(TypeError);
        });
    });

    describe("isaDateFormat", () => {
        test("returns value for valid YYYY-MM-DD format", () => {
            expect(instance.testDateFormat("YYYY-MM-DD", "2026-03-05"))
                .toBe("2026-03-05");
        });

        test("returns value for valid MM/DD/YYYY format", () => {
            expect(instance.testDateFormat("MM/DD/YYYY", "03/05/2026"))
                .toBe("03/05/2026");
        });

        test("returns value for valid MM-DD-YYYY format", () => {
            expect(instance.testDateFormat("MM-DD-YYYY", "03-05-2026"))
                .toBe("03-05-2026");
        });

        test("returns value for valid DD-MM-YYYY format", () => {
            expect(instance.testDateFormat("DD-MM-YYYY", "05-03-2026"))
                .toBe("05-03-2026");
        });

        test("returns value for valid YYYY-MM-DD HH:mm:ss format", () => {
            expect(instance.testDateFormat("YYYY-MM-DD HH:mm:ss", "2026-03-05 14:30:00"))
                .toBe("2026-03-05 14:30:00");
        });

        test("returns value for valid YYYY-MM-DDTHH:mm:ss format", () => {
            expect(instance.testDateFormat("YYYY-MM-DDTHH:mm:ss", "2026-03-05T14:30:00"))
                .toBe("2026-03-05T14:30:00");
        });

        test("throws TypeError for invalid format name", () => {
            expect(() => instance.testDateFormat("INVALID", "2026-03-05"))
                .toThrow(TypeError);
        });

        test("throws TypeError for wrong pattern", () => {
            expect(() => instance.testDateFormat("YYYY-MM-DD", "03-05-2026"))
                .toThrow(TypeError);
        });

        test("throws TypeError for invalid date", () => {
            expect(() => instance.testDateFormat("YYYY-MM-DD", "2024-02-30"))
                .toThrow(TypeError);
        });

        test("throws TypeError for numbers", () => {
            expect(() => instance.testDateFormat("YYYY-MM-DD", 20260305))
                .toThrow(TypeError);
        });

        test("throws TypeError for null", () => {
            expect(() => instance.testDateFormat("YYYY-MM-DD", null))
                .toThrow(TypeError);
        });

        test("throws TypeError for undefined", () => {
            expect(() => instance.testDateFormat("YYYY-MM-DD", undefined))
                .toThrow(TypeError);
        });
    });

    describe("isaURL", () => {
        test("returns value for valid URLs", () => {
            expect(instance.testURL("http://example.com"))
                .toBe("http://example.com");
            expect(instance.testURL("https://example.com"))
                .toBe("https://example.com");
            expect(instance.testURL("https://example.com/path?query=1"))
                .toBe("https://example.com/path?query=1");
        });

        test("throws TypeError for invalid URLs", () => {
            expect(() => instance.testURL("not-a-url"))
                .toThrow(TypeError);
        });

        test("throws TypeError for protocol-relative URLs", () => {
            expect(() => instance.testURL("//example.com"))
                .toThrow(TypeError);
        });

        test("throws TypeError for strings", () => {
            expect(() => instance.testURL(123))
                .toThrow(TypeError);
        });

        test("throws TypeError for null", () => {
            expect(() => instance.testURL(null))
                .toThrow(TypeError);
        });

        test("throws TypeError for undefined", () => {
            expect(() => instance.testURL(undefined))
                .toThrow(TypeError);
        });
    });

    describe("isaArray", () => {
        test("returns value for arrays", () => {
            expect(instance.testArray([]))
                .toEqual([]);
            expect(instance.testArray([1, 2, 3]))
                .toEqual([1, 2, 3]);
        });

        test("throws TypeError for objects", () => {
            expect(() => instance.testArray({}))
                .toThrow(TypeError);
        });

        test("throws TypeError for strings", () => {
            expect(() => instance.testArray("[]"))
                .toThrow(TypeError);
        });

        test("throws TypeError for null", () => {
            expect(() => instance.testArray(null))
                .toThrow(TypeError);
        });

        test("throws TypeError for undefined", () => {
            expect(() => instance.testArray(undefined))
                .toThrow(TypeError);
        });
    });

    describe("isaObject", () => {
        test("returns value for plain objects", () => {
            expect(instance.testObject({}))
                .toEqual({});
            expect(instance.testObject({ key: "value" }))
                .toEqual({ key: "value" });
        });

        test("throws TypeError for arrays", () => {
            expect(() => instance.testObject([]))
                .toThrow(TypeError);
        });

        test("throws TypeError for null", () => {
            expect(() => instance.testObject(null))
                .toThrow(TypeError);
        });

        test("throws TypeError for strings", () => {
            expect(() => instance.testObject("{}"))
                .toThrow(TypeError);
        });

        test("throws TypeError for numbers", () => {
            expect(() => instance.testObject(123))
                .toThrow(TypeError);
        });

        test("throws TypeError for functions", () => {
            expect(() => instance.testObject(() => {}))
                .toThrow(TypeError);
        });
    });

    describe("isaAnyOf", () => {
        test("returns value if any type matches", () => {
            expect(instance.testAnyOf(["isaString", "isaNumber"], "hello"))
                .toBe("hello");
            expect(instance.testAnyOf(["isaString", "isaNumber"], 123))
                .toBe(123);
        });

        test("throws TypeError if no type matches", () => {
            expect(() => instance.testAnyOf(["isaString", "isaNumber"], []))
                .toThrow(TypeError);
        });

        test("throws for empty array of methods", () => {
            expect(() => instance.testAnyOf([], "hello"))
                .toThrow(TypeError);
        });

        test("can be used directly in constructor", () => {
            class TestUser extends ClassTypes {
                constructor (identifier) {
                    super();
                    this.identifier = this.isaAnyOf(["isaString", "isaNumber"], identifier);
                }
            }
            const user1 = new TestUser("abc123");
            expect(user1.identifier)
                .toBe("abc123");
            const user2 = new TestUser(12345);
            expect(user2.identifier)
                .toBe(12345);
            expect(() => new TestUser([]))
                .toThrow(TypeError);
        });

        test("works with three or more types", () => {
            expect(instance.testAnyOf(["isaString", "isaNumber", "isaBoolean"], true))
                .toBe(true);
            expect(instance.testAnyOf(["isaString", "isaNumber", "isaArray"], [1, 2]))
                .toEqual([1, 2]);
            expect(() => instance.testAnyOf(["isaString", "isaNumber", "isaBoolean"], {}))
                .toThrow(TypeError);
        });
    });

    describe("isaAllOf", () => {
        test("returns value if all types match", () => {
            expect(instance.testAllOf(["isaString"], "hello"))
                .toBe("hello");
        });

        test("throws TypeError if any type fails", () => {
            expect(() => instance.testAllOf(["isaString", "isaNumber"], "hello"))
                .toThrow(TypeError);
        });

        test("can be used with isaString for length validation pattern", () => {
            class TestUser extends ClassTypes {
                validatePhone (phone) {
                    return this.isaAllOf(["isaString"], phone);
                }
            }
            const user = new TestUser();
            expect(user.validatePhone("555-1234"))
                .toBe("555-1234");
            expect(() => user.validatePhone(123))
                .toThrow(TypeError);
        });

        test("works with multiple same-type checks", () => {
            expect(instance.isaAllOf(["isaString", "isaString"], "hello"))
                .toBe("hello");
            expect(instance.isaAllOf(["isaNumber", "isaNumber"], 42))
                .toBe(42);
        });
    });

    describe("isaNoneOf", () => {
        test("returns value if no type matches", () => {
            expect(instance.testNoneOf(["isaString", "isaNumber"], []))
                .toEqual([]);
            expect(instance.testNoneOf(["isaString", "isaNumber"], {}))
                .toEqual({});
        });

        test("returns value for null when not in types", () => {
            expect(instance.testNoneOf(["isaString", "isaNumber"], null))
                .toBe(null);
        });

        test("throws TypeError if any type matches", () => {
            expect(() => instance.testNoneOf(["isaString", "isaNumber"], "hello"))
                .toThrow(TypeError);
        });
    });

    describe("validate", () => {
        test("returns validated value", () => {
            expect(instance.validate("testString", "hello", "isaString"))
                .toBe("hello");
            expect(instance.validate("testPositiveInt", 5, "isaPositiveInt"))
                .toBe(5);
            expect(instance.validate("testEmailAddress", "a@b.com", "isaEmailAddress"))
                .toBe("a@b.com");
        });

        test("throws for invalid values", () => {
            expect(() => instance.validate("testString", 123, "isaString"))
                .toThrow(TypeError);
            expect(() => instance.validate("testPositiveInt", -1, "isaPositiveInt"))
                .toThrow(TypeError);
        });

        test("throws for unknown method", () => {
            expect(() => instance.validate("test", "value", "nonexistent"))
                .toThrow(TypeError);
        });

        test("can call combinators directly through wrapper methods", () => {
            expect(instance.testAnyOf(["isaString", "isaNumber"], "123-456"))
                .toBe("123-456");
            expect(instance.testAllOf(["isaString"], "test"))
                .toBe("test");
            expect(instance.testNoneOf(["isaString", "isaNumber"], []))
                .toEqual([]);
        });

        test("works with combinators through validate", () => {
            // isaAnyOf - phone can be string or number
            expect(instance.validate("phone", "555-1234", "isaAnyOf", ["isaString", "isaNumber"]))
                .toBe("555-1234");
            expect(instance.validate("phone", 12345, "isaAnyOf", ["isaString", "isaNumber"]))
                .toBe(12345);

            // isaAllOf - must be string (single type)
            expect(instance.validate("name", "John", "isaAllOf", ["isaString"]))
                .toBe("John");

            // isaNoneOf - must not be string or number
            expect(instance.validate("data", [], "isaNoneOf", ["isaString", "isaNumber"]))
                .toEqual([]);
            expect(instance.validate("data", {}, "isaNoneOf", ["isaString", "isaNumber"]))
                .toEqual({});
        });

        test("combinators through validate throw on invalid values", () => {
            // isaAnyOf throws when no type matches
            expect(() => instance.validate("phone", [], "isaAnyOf", ["isaString", "isaNumber"]))
                .toThrow(TypeError);

            // isaAllOf throws when any type fails
            expect(() => instance.validate("value", "hello", "isaAllOf", ["isaString", "isaNumber"]))
                .toThrow(TypeError);

            // isaNoneOf throws when any type matches
            expect(() => instance.validate("data", "hello", "isaNoneOf", ["isaString", "isaNumber"]))
                .toThrow(TypeError);
        });

        test("can use combinators in constructor via validate", () => {
            class TestUser extends ClassTypes {
                constructor (name, identifier) {
                    super();
                    this.name = this.validate("name", name, "isaString");
                    // identifier can be string or number
                    this.identifier = this.validate("identifier", identifier, "isaAnyOf", ["isaString", "isaNumber"]);
                }
            }

            const user1 = new TestUser("John", "abc123");
            expect(user1.name)
                .toBe("John");
            expect(user1.identifier)
                .toBe("abc123");

            const user2 = new TestUser("Jane", 456);
            expect(user2.identifier)
                .toBe(456);

            expect(() => new TestUser("Bob", []))
                .toThrow(TypeError);
        });

        test("can be used in class constructor patterns", () => {
            class TestUser extends ClassTypes {
                constructor (name, age) {
                    super();
                    this.name = this.validate("name", name, "isaString");
                    this.age = this.validate("age", age, "isaPositiveInt");
                }
            }
            const user = new TestUser("John", 25);
            expect(user.name)
                .toBe("John");
            expect(user.age)
                .toBe(25);
            expect(() => new TestUser(123, 25))
                .toThrow(TypeError);
            expect(() => new TestUser("John", -1))
                .toThrow(TypeError);
        });
    });

    describe("maybe", () => {
        test("returns value when type check passes", () => {
            expect(instance.maybe("isaString", "hello"))
                .toBe("hello");
            expect(instance.maybe("isaPositiveInt", 5))
                .toBe(5);
            expect(instance.maybe("isaEmailAddress", "a@b.com"))
                .toBe("a@b.com");
            expect(instance.maybe("isaArray", [1, 2, 3]))
                .toEqual([1, 2, 3]);
            expect(instance.maybe("isaObject", { key: "value" }))
                .toEqual({ key: "value" });
        });

        test("returns null/undefined without checking type", () => {
            expect(instance.maybe("isaString", null))
                .toBe(null);
            expect(instance.maybe("isaString", undefined))
                .toBe(undefined);
            expect(instance.maybe("isaPositiveInt", null))
                .toBe(null);
            expect(instance.maybe("isaPositiveInt", undefined))
                .toBe(undefined);
            expect(instance.maybe("isaBoolean", null))
                .toBe(null);
            expect(instance.maybe("isaBoolean", undefined))
                .toBe(undefined);
        });

        test("throws when type check fails", () => {
            expect(() => instance.maybe("isaString", 123))
                .toThrow(TypeError);
            expect(() => instance.maybe("isaPositiveInt", -1))
                .toThrow(TypeError);
            expect(() => instance.maybe("isaString", []))
                .toThrow(TypeError);
        });

        test("throws for unknown method name", () => {
            expect(() => instance.maybe("nonexistent", "value"))
                .toThrow(TypeError);
        });

        test("can be used in class constructor for optional fields", () => {
            class TestUser extends ClassTypes {
                constructor (name, nickname) {
                    super();
                    this.name = this.validate("name", name, "isaString");
                    this.nickname = this.maybe("isaString", nickname);
                }
            }
            const user1 = new TestUser("John", undefined);
            expect(user1.name)
                .toBe("John");
            expect(user1.nickname)
                .toBe(undefined);
            const user2 = new TestUser("John", "Johnny");
            expect(user2.nickname)
                .toBe("Johnny");
            expect(() => new TestUser("John", 123))
                .toThrow(TypeError);
        });

        test("works with all type check methods", () => {
            expect(instance.maybe("isaNumber", 42))
                .toBe(42);
            expect(instance.maybe("isaBoolean", true))
                .toBe(true);
            expect(instance.maybe("isaDateObj", new Date()))
                .toBeInstanceOf(Date);
            expect(instance.maybe("isaURL", "https://example.com"))
                .toBe("https://example.com");
        });
    });

    describe("error messages", () => {
        test("include method name in error", () => {
            try {
                instance.testPositiveInt("bad");
            } catch (e) {
                expect(e.message)
                    .toContain("isaPositiveInt");
            }
        });

        test("include actual type received", () => {
            try {
                instance.testPositiveInt(42.5);
            } catch (e) {
                expect(e.message)
                    .toContain("number");
            }
        });

        test("include value preview", () => {
            try {
                instance.testString(123);
            } catch (e) {
                expect(e.message)
                    .toContain("123");
            }
        });

        test("truncates long values in error message", () => {
            const longString = "a".repeat(100);
            try {
                instance.testPositiveInt(longString);
            } catch (e) {
                expect(e.message.length)
                    .toBeLessThan(150);
            }
        });
    });
});
