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

export function quickSort(arr, animations) {
  if (arr.length <= 1) return animations;

  const auxArray = arr.slice();
  quickSortHelper(auxArray, 0, auxArray.length - 1, animations);
  return animations;
}

function quickSortHelper(arr, low, high, animations) {
  if (low < high) {
    const p = partition(arr, low, high, animations);

    quickSortHelper(arr, low, p - 1, animations);
    quickSortHelper(arr, p + 1, high, animations);
  }
}

function partition(arr, low, high, animations) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    animations.push(["compare", j, high]);
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];

      animations.push(["overwrite", i, null, arr[i]]);
      animations.push(["overwrite", j, null, arr[j]]);
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  animations.push(["overwrite", i + 1, null, arr[i + 1]]);
  animations.push(["overwrite", high, null, arr[high]]);

  return i + 1;
}

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
