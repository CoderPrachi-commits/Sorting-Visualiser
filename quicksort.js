// Quick Sort
// Picks a pivot (here, the last element of the range), partitions
// the array so smaller elements go left and bigger elements go
// right of the pivot, then recursively sorts both sides.

async function quickSort(array, bars, low = 0, high = array.length - 1) {
  if (low < high) {
    let pivotIndex = await partition(array, bars, low, high);
    await quickSort(array, bars, low, pivotIndex - 1);
    await quickSort(array, bars, pivotIndex + 1, high);
  }
}

async function partition(array, bars, low, high) {
  let pivot = array[high];
  bars[high].classList.add('min-candidate'); // highlight pivot in yellow

  let i = low - 1; // boundary of elements smaller than pivot

  for (let j = low; j < high; j++) {
    bars[j].classList.add('comparing');
    await sleep();

    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      updateBarHeight(bars[i], array[i]);
      updateBarHeight(bars[j], array[j]);
      await sleep();
    }

    bars[j].classList.remove('comparing');
  }

  // place the pivot in its correct sorted position
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  updateBarHeight(bars[i + 1], array[i + 1]);
  updateBarHeight(bars[high], array[high]);

  bars[high].classList.remove('min-candidate');
  bars[i + 1].classList.add('sorted');
  await sleep();

  return i + 1;
}