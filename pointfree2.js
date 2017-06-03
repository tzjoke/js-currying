const R = require('ramda')

const profile = {
    id: '1234',
    name: 'Amy'
}

const genStudentNo = (id) => `00{id}`
const updateProfile = (profile) => {
    const studentNo = genStudentNo(profile.id)
    return R.assoc('number', studentNo, profile)
}

const result = updateProfile(profile)
console.log(result)


// s1
const updateProfile = (profile) => {
    const studentNo = genStudentNo(R.propOr('0000', 'id')(profile))
    return R.assoc('number', studentNo, profile)
}

// s2
const updateProfile = (profile) => {
    const studentNo = R.compose(genStudentNo, R.propOr('0000', 'id'))(profile)
    return R.assoc('number', studentNo, profile)
}

// s3
const getStudentNoFromProfile = R.compose(genStudentNo, R.propOr('0000', 'id'))
const updateProfile = (profile) => {
    const studentNo = getStudentNoFromProfile(profile)
    return R.assoc('number', studentNo, profile)
}

// s4
const getStudentNoFromProfile = R.compose(genStudentNo, R.propOr('0000', 'id'))
const updateProfile = (profile) => R.assoc('number', getStudentNoFromProfile(profile), profile)

// s5
const getStudentNoFromProfile = R.compose(genStudentNo, R.propOr('0000', 'id'))
const updateProfile = R.converge(R.assoc('number'), [getStudentNoFromProfile, R.identity])



// -------------------------
// R.assoc
R.assoc('c', 3, {a: 1, b: 2})  //=> {a: 1, b: 2, c: 3}

// R.propOr
const alice = {
    name: 'ALICE',
    age: 101
}
const favorite = R.prop('favoriteLibrary')
const favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary')

favorite(alice)  //=> undefined
favoriteWithDefault(alice)  //=> 'Ramda'
