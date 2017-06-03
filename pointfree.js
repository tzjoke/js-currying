const R = require('ramda')

const data1 = [10, 1, 6, 3] 
const data2 = [3, 7, 2] 

// s1
const isFirstMax = arr => arr[0] == arr.sort((a, b)=> b - a)[0]

console.log(isFirstMax(data1))
console.log(isFirstMax(data2))

// s2
const isFirstMax = R.converge(
    R.equals, [
        arr => arr[0],
        arr => arr.sort((a, b)=> b - a)[0]
    ]) 

// s3
const isFirstMax = R.converge(
    R.equals, [
        R.head,
        arr => R.head(arr.sort((a, b)=> b - a))
    ]) 

// s4
const isFirstMax = R.converge(
    R.equals, [
        R.head,
        arr => R.head(R.sort(R.descend(R.identity))(arr))
    ]) 

// s5
const isFirstMax = R.converge(
    equals, [
        R.head,
        R.compose(R.head, (R.sort(R.descend(R.identity))))
    ]) 

// s6
const maxData = R.compose(R.head, (R.sort(R.descend(R.identity)))) 

const isFirstMax = R.converge(
    R.equals, [
        R.head,
        maxData
    ])


// ------------
// R.converge

const average = R.converge(R.divide, [R.sum, R.length])
average([1, 2, 3, 4, 5, 6, 7]) //=> 4

const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
strangeConcat("Yodel") //=> "YODELyodel"

// R.sort
const diff = (a, b) => a - b 
R.sort(diff, [4,2,7,5])  //=> [2, 4, 5, 7]

// R.compose (sequence is opposite to R.pipe)
const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
const yellGreeting = R.compose(R.toUpper, classyGreeting) 
yellGreeting('James', 'Bond')  //=> "THE NAME'S BOND, JAMES BOND"

R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7

// R.identity
R.identity(1)  //=> 1

const obj = {} 
R.identity(obj) === obj  //=> true