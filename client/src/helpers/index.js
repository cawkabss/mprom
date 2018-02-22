export function arrToMap(arr) {
    return arr.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
    }, {});
}

export function mapToArr(obj) {
    const arr = [];
    for(let key in obj) {
        arr.push(obj[key]);
    }
    return arr;
}

export const removeProperty = (obj, property) => {
    return  Object.keys(obj).reduce((acc, key) => {
        if (key !== property) {
            return {...acc, [key]: obj[key]}
        }
        return acc;
    }, {})
};