function ArrayById(o) {
    return Object.keys(o).map(k => o[k]);
}

function ArrayToObject(a) {
    return a.reduce((acc, n) => {
        return { ...acc, [n.id]: n };
    }, {});
}

export { ArrayById, ArrayToObject };