//uncurrying

:: obj.func(arg1, arg2)
// uncurried into
:: func(obj, arg1, arg2)

// a common implement of uncurrying
var uncurrying= function (fn) {
    return function () {
        return fn.apply(arguments[0],[].slice.call(arguments,1));
    }
};

// another implement
var uncurrying= function () {
    var _this = this;
    return function () {
        return Function.prototype.call.apply(_this ,arguments);
    }
};

// also uncurrying
var uncurrying=Function.prototype.bind.bind(Function.prototype.call);


// borrow built-ins
var toUpperCase = uncurrying(String.prototype.toUpperCase);
toUpperCase('abc')
// replace a callback method with a static func
['a', 'b'].map(toUpperCase)

// objects(array-like) can 'call' Array.prototype.x
var push = uncurrying(Array.prototype.push);
var a = {};
push(a, 10)
// -> 1
a
// -> Object {0: 10, length: 1}
var slice = uncurrying(Array.prototype.slice);
slice(a, 0, 1)
// -> [10]

var pop = uncurrying(Array.prototype.pop)
pop(a)
// -> 10
a
// -> Object {length: 0}
