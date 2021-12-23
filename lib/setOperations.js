function union(sets) {
    if (sets.length === 0) return new Set();
    // Start with first set
    let _union = new Set(sets[0]);
    // Iterate over remaining sets
    for (let set of sets.slice(1)) {
        // add each element to the union
        for (let elem of set) {
            _union.add(elem);
        }
    }
    console.log("UNION: ", _union)
    return _union;
}

function intersection(sets) {
    if (sets.length === 0) return new Set();

    if (sets.length === 1) return new Set(sets[0]);

    // If we are given two sets, return the intersection
    if (sets.length === 2) {
        // Start with empty set
        let _intersection = new Set();
        // Iterate over elements of the second set
        for (let elem of sets[1]) {
            // If the element is in both sets, add it to the intersection
            if (sets[0].has(elem)) _intersection.add(elem);
        }
        return _intersection;
    }

    // Otherwise, calculate intersection of first two sets and then intersect result with remaining sets
    return intersection([ intersection(sets.slice(0, 2)), intersection(sets.slice(2)) ]);
}

function difference(sets) {
    if (sets.length === 0) return new Set();

    // Start with the first set
    let _difference = new Set(sets[0]);
    // Iterate over remaining sets
    for (let set of sets.slice(1)) {
        // Remove each element from the difference
        for (let elem of set) {
            _difference.delete(elem);
        }
    }

    return _difference;
}

function symmetricDifference(sets) {
    if (sets.length === 0) return new Set();

    if (sets.length === 1) return new Set(sets[0]);

    // If we are given two sets, return the symmetric difference
    if (sets.length === 2) {
        // Start with the first set
        let _difference = new Set(sets[0]);
        // Iterate over elements of the second set
        for (let elem of sets[1]) {
            // If the element is in both sets, remove it from the symmetric difference
            if (sets[0].has(elem)) _difference.delete(elem);
            // Otherwise, add it
            else _difference.add(elem);
        }
        return _difference;
    }

    // Otherwise, calculate the symmetric difference of the first two sets and then calculate symmetric difference of results and remaining sets
    return symmetricDifference([ symmetricDifference(sets.slice(0, 2)), symmetricDifference(sets.slice(2)) ]);
}

export { union, intersection, difference, symmetricDifference };