# @renderorange/class-types

Runtime type checking base class for JavaScript.

## Installation

```bash
npm install @renderorange/class-types
```

## Usage

Extend `ClassTypes` and define methods that use the built-in type checks:

```javascript
const ClassTypes = require("@renderorange/class-types");

class User extends ClassTypes {
    constructor(name, email, age) {
        super();
        this.name = this.validate("name", name, "isaString");
        this.email = this.validate("email", email, "isaEmailAddress");
        this.age = this.validate("age", age, "isaPositiveInt");
    }
}

const user = new User("John", "john@example.com", 25);
```

### Using maybe for optional fields

The `maybe` method allows values to be null or undefined, but validates the type if a value is provided:

```javascript
class User extends ClassTypes {
    constructor(name, email, age) {
        super();
        this.name = this.validate("name", name, "isaString");
        this.email = this.validate("email", email, "isaEmailAddress");
        this.age = this.validate("age", age, "isaPositiveInt");
        this.nickname = this.maybe("isaString", nickname);  // optional
    }
}

const user1 = new User("John", "john@example.com", 25);  // nickname is undefined
const user2 = new User("John", "john@example.com", 25, "Johnny");  // nickname is "Johnny"
new User("John", "john@example.com", 25, 123);  // throws TypeError
```

### Using combinators

Combinators let you combine multiple type checks:

```javascript
class User extends ClassTypes {
    constructor(name, email, age, phone) {
        super();
        this.name = this.validate("name", name, "isaString");
        this.email = this.validate("email", email, "isaEmailAddress");
        this.age = this.validate("age", age, "isaPositiveInt");
        
        // isaAnyOf: value must match at least one type
        // phone can be a string or number
        this.phone = this.isaAnyOf(["isaString", "isaNumber"], phone);
        
        // Use custom methods for more complex validation
        this.username = this.validateUsername(username);
    }
    
    validateUsername (value) {
        if (this.isaAllOf(["isaString", "isaValidUsername"], value)) {
            return value;
        }
    }
    
    isaValidUsername (value) {
        return this.#check(
            "isaValidUsername",
            (v) => typeof v === "string" && v.length >= 3 && v.length <= 20,
            value,
        );
    }
}
```

You can also use combinators through `validate()` by passing the type methods array as an extra argument:

```javascript
class User extends ClassTypes {
    constructor(name, identifier) {
        super();
        this.name = this.validate("name", name, "isaString");
        
        // identifier can be string or number using validate with extra args
        this.identifier = this.validate("identifier", identifier, "isaAnyOf", ["isaString", "isaNumber"]);
        
        // data must not be a string or number
        this.data = this.validate("data", data, "isaNoneOf", ["isaString", "isaNumber"]);
    }
}

const user1 = new User("John", "abc123");  // identifier is string
const user2 = new User("Jane", 456);       // identifier is number
new User("Bob", []);  // throws TypeError - array doesn't match any type
```

## API

### Type Checks

All type checks return the value if it passes, or throw a `TypeError` if it fails.

- `isaPositiveInt(value)` - Positive integers only
- `isaString(value)` - Strings
- `isaNumber(value)` - Numbers (including negative and floats)
- `isaBoolean(value)` - Booleans
- `isaDateObj(value)` - Valid Date objects
- `isaDateFormat(format, value)` - Date strings with specific format ("YYYY-MM-DD", "MM/DD/YYYY", "MM-DD-YYYY", "DD-MM-YYYY", "YYYY-MM-DD HH:mm:ss", "YYYY-MM-DDTHH:mm:ss")
- `isaURL(value)` - Valid HTTP/HTTPS URLs
- `isaArray(value)` - Arrays
- `isaObject(value)` - Plain objects
- `isaEmailAddress(value)` - Valid email addresses

### Combinators

- `isaAnyOf([methodNames], value)` - Returns value if any type check passes, throws otherwise
- `isaAllOf([methodNames], value)` - Returns value if all type checks pass, throws otherwise
- `isaNoneOf([methodNames], value)` - Returns value if no type check passes, throws otherwise

### Utilities

- `validate(name, value, methodName, ...extraArgs)` - Validates using the specified method and returns the value. Pass extra arguments for combinators.
- `maybe(methodName, value)` - Returns value if null/undefined, otherwise validates and returns the value

## License

MIT
