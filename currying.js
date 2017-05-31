//multi-param func `foo`
//curried into single-param func `bar`
function foo(x, y){
    return x*y;
}

function bar(x){
    return function(y){
        return x*y;
    }
}

foo(1,3) === bar(1)(3)


//partial application `foo3`
var foo3 = bar(3);
foo3(2) + foo3(3) === 15

//not same as currying
//usually use keyword `bind`
//to a func of which len(arguments) > 2
function baz(x, y, z){
    return x + y + z;
}

var baz1 = baz.bind(null, 1);
baz1(1, 2)
// 4

baz1(1)
// NaN
// === baz1(1, undefined)

baz1(1)(2)
//Uncaught TypeError: baz1(...) is not a function


// a common implement of currying
//es5 version
function currying(fn) {
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat(slice.call(arguments))
        );
    }
}

//es6 version
const currying = (fn, ...args) => (...fargs) => fn(...[...args, ...fargs]);


//use `baz` function above
var curriedBaz = currying(baz);
curriedBaz(1, 2, 3)
//6

var curriedBaz1 = currying(baz, 1);
curriedBaz1(2, 3)
//6

var curriedBaz123 = currying(baz, 1, 2, 3);
curriedBaz123()
//6


//another implement
//will not return result until len(arguments) >= fn.length
//es5 version
function commonCurrying(fn) {
    var len = fn.length;

    return function curried () {
        var _args = [];
        return [].push.apply(_args, [].slice.call(arguments)) >= len ? fn.apply(this, _args.slice(0, len)) : curried;
    };
}

//es6 version
const commonCurrying = fn => {
    const len = fn.length;
    const _args = [];
    const curried = (...args) => _args.push(...args) >= len ? fn(..._args.slice(0, len)) : curried;

    return curried;
}

//still use `baz` function above
var commonCurriedBaz = commonCurrying(baz);

commonCurriedBaz(1, 2, 3)
// or
commonCurriedBaz(1, 2)(3)
// or
commonCurriedBaz(1)(2)(3)


//last implement
//will not calculate until len(arguments) === 0
//es5 version
function powerCurrying(fn) {
    var ap = Array.prototype;
    var _args = [];
    return function curried() {
        if (arguments.length === 0) {
            return fn.apply(this, _args);
        }
        ap.push.apply(_args, ap.slice.call(arguments));
        return curried;
    }
}

//es6 version
const powerCurrying = fn => {
    const _args = [];
    const curried = (...args) => {
        if(args.length === 0)
            return fn(..._args);
        _args.push(...args);
        return curried;
    }

    return curried;
}

//for example
var sum = function(){
    return Array.prototype.slice.call(arguments).reduce(function(acc, value){
        return acc + value;
    },0)
}

var curriedSum = powerCurrying(sum);

curriedSum(1);
curriedSum(1,2);
curriedSum(1,2)(1);
curriedSum();// calculate here
// 8