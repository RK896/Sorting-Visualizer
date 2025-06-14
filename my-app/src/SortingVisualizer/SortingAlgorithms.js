export function getSortAnimations(array, sortAlgorithm) {
  const animations = [];
  if (array.length <= 1) return animations;
  const arrayCopy = array.slice();
  sortAlgorithm(arrayCopy, animations);
  return animations;
}

export function bubbleSort(arr, animations) {
  if (arr.length <= 1) return;
  const auxArray = arr.slice();
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push(["compare", j, j + 1]);

      if (auxArray[j] > auxArray[j + 1]) {
        let temp = auxArray[j + 1];
        auxArray[j + 1] = auxArray[j];
        auxArray[j] = temp;
      }

      animations.push(["overwrite", j, null, auxArray[j]]);
      animations.push(["overwrite", j + 1, null, auxArray[j + 1]]);
    }
  }

  return animations;
}

export function selectionSort(arr, animations) {
  if (arr.length <= 1) return;
  let n = arr.length;
  const auxArray = arr.slice();

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      animations.push(["compare", j, minIndex]);

      if (auxArray[j] < auxArray[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex != i) {
      let temp = auxArray[i];
      auxArray[i] = auxArray[minIndex];
      auxArray[minIndex] = temp;
    }

    animations.push(["overwrite", i, null, auxArray[i]]);
    animations.push(["overwrite", minIndex, null, auxArray[minIndex]]);
  }
}

export function quickSort(arr, animations) {}

export function heapSort(arr, animations) {}

export function mergeSort(arr, animations) {
  if (arr.length <= 1) return;

  const auxArray = arr.slice();
  mergeSortHelper(arr, 0, arr.length - 1, auxArray, animations);
}

function mergeSortHelper(
  mainArray,
  startIndex,
  endIndex,
  auxArray,
  animations
) {
  if (startIndex === endIndex) return;
  const middle = Math.floor((startIndex + endIndex) / 2);
  mergeSortHelper(auxArray, startIndex, middle, mainArray, animations);
  mergeSortHelper(auxArray, middle + 1, endIndex, mainArray, animations);
  merge(mainArray, startIndex, middle, endIndex, auxArray, animations);
}

function merge(
  mainArray,
  startIndex,
  middleIndex,
  endIndex,
  auxArray,
  animations
) {
  let k = startIndex;
  let i = startIndex;
  let j = middleIndex + 1;

  while (i <= middleIndex && j <= endIndex) {
    animations.push(["compare", i, j]);

    if (auxArray[i] <= auxArray[j]) {
      animations.push(["overwrite", k, null, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    } else {
      animations.push(["overwrite", k, null, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    }
  }

  while (i <= middleIndex) {
    animations.push(["overwrite", k, null, auxArray[i]]);
    mainArray[k++] = auxArray[i++];
  }

  while (j <= endIndex) {
    animations.push(["overwrite", k, null, auxArray[j]]);
    mainArray[k++] = auxArray[j++];
  }
}
