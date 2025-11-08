function separateArray(array, parts) {
  if (array.length === 0) return [];
  let result = [];
  const div = Math.ceil(array.length / parts);


  for( let i = 0; i <= array.length; i+=div ) {
    result.push(array.slice(i, i + div));
  }
  
  return result;
}

module.exports = { separateArray };