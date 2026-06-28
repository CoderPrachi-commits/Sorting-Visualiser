// Merge Sort
// Divides the array into halves recursively until each part has
// one element, then merges the parts back together in sorted order.

async function mergeSort(array, bars, left = 0, right = array.length - 1) {
  if (left >= right) return;

  let mid = Math.floor((left + right) / 2);

  await mergeSort(array, bars, left, mid);
  await mergeSort(array, bars, mid + 1, right);
  await merge(array, bars, left, mid, right);
}

async function merge(array, bars, left, mid, right) {
  let leftPart = array.slice(left, mid + 1);
  let rightPart = array.slice(mid + 1, right + 1);

  let i = 0; // index for leftPart
  let j = 0; // index for rightPart
  let k = left; // index for main array

  while (i < leftPart.length && j < rightPart.length) {
    bars[k].classList.add('comparing');
    await sleep();

    if (leftPart[i] <= rightPart[j]) {
      array[k] = leftPart[i];
      i++;
    } else {
      array[k] = rightPart[j];
      j++;
    }

    updateBarHeight(bars[k], array[k]);
    bars[k].classList.remove('comparing');
    k++;
  }

  // copy any remaining elements from leftPart
  while (i < leftPart.length) {
    array[k] = leftPart[i];
    updateBarHeight(bars[k], array[k]);

    bars[k].classList.add('comparing');
    await sleep();
    bars[k].classList.remove('comparing');

    i++;
    k++;
  }

  // copy any remaining elements from rightPart
  while (j < rightPart.length) {
    array[k] = rightPart[j];
    updateBarHeight(bars[k], array[k]);

    bars[k].classList.add('comparing');
    await sleep();
    bars[k].classList.remove('comparing');

    j++;
    k++;
  }
}