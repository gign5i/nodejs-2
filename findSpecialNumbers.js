function findSpecialNumbers(array) {
  const results = array.filter((element) => element % 3 === 0);
  return results.length;
};

module.exports = { findSpecialNumbers };