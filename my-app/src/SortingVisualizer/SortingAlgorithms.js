export function mergeSort (arr, animations) {
    if (arr.length <= 1) return;
    
    const auxArray = arr.slice();
    mergeSortHelper(arr, 0, arr.length-1, auxArray, animations);
}

function mergeSortHelper(mainArray, startIndex, endIndex, auxArray, animations) {
    if (startIndex === endIndex) return;
    const middle = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(auxArray, startIndex, middle, mainArray, animations);
    mergeSortHelper(auxArray, middle+1, endIndex, mainArray, animations);
    merge(mainArray, startIndex, middle, endIndex, auxArray, animations);

}

export function getSortAnimations(array, sortAlgorithm) {
    const animations = [];
    if (array.length <= 1) return animations;
    const arrayCopy = array.slice();
    sortAlgorithm(arrayCopy, animations);
    return animations;
}


function merge (mainArray, startIndex, middleIndex, endIndex, auxArray, animations) {
    let k = startIndex;
    let i = startIndex;
    let j = middleIndex + 1

    while (i <= middleIndex && j <= endIndex) {
        animations.push(['compare', i, j]);
        
        if (auxArray[i] <= auxArray[j]) {
            animations.push(['overwrite', k, null, auxArray[i]]);
            mainArray[k++] = auxArray[i++];
        } else {
            animations.push(['overwrite', k , null, auxArray[j]]);
            mainArray[k++] = auxArray[j++];
        }
    }

    while (i <= middleIndex) {
        animations.push(['overwrite', k, null, auxArray[i]]);
        mainArray[k++] = auxArray[i++];
    }

    while (j <= endIndex) {
        animations.push(['overwrite', k, null, auxArray[j]]);
        mainArray[k++] = auxArray[j++];
    }

}

