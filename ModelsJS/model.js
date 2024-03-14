const add=(a,b)=> a+b;
const sub=(a,b)=> a-b;

//+ Method 1st to export function

// module.exports={
// add,
// sub
// }


//+ Method 2nd to export function

exports.add=add;
exports.sub=sub;