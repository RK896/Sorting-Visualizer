export const mergeSort = (arr, animations = []) => {
    if (arr.length <= 1) return arr;
    
    const middleIndex = Math.floor(arr.length / 2)
    const left = mergeSort(arr.slice(0,middleIndex))
    const right = mergeSort(arr.slice(middleIndex))

    return merge(left,right)
};

const merge = (left, right, animations) => {
    if (left.length === 0) return right;
    if (right.length === 0) return left;

    if (left[0] < right[0]) {
        return [left[0], ...mergeSort(left.slice(1), right)]
        
    } else {
        return [right[0], ...mergeSort(left, right.slice(1))]
    }
};