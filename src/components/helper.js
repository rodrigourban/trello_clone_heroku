export default sortList = (property) => {
  let sortOrder = 1;
  if (property[0] === '-') {
    //Reverse
    sortOrder = -1
    property = property.substr(1)
  }
  return function (a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property])
    } else {
      return a[property].localeCompare(b[property])
    }
  }
}
//To use should be called MyArray.sort(sortList("property"))
//Ex: lists.sort(sortList("id")) menor a mayor
//Ex: lists.sort(sortList("-id")) mayor a menor