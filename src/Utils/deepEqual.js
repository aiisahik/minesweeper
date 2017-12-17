const deepEqualKeys = (a, b, keys) =>{
    const numKeysEqual = keys.filter((key) => {
        return a[key] === b[key];
    }).length;
    return numKeysEqual === keys.length;
}
export default deepEqualKeys;