// Selection Sort
// In every pass, find the smallest element in the unsorted part
// of the array and swap it with the first unsorted position.

async function selectionSort(array, bars) {
  let n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    bars[minIndex].classList.add('min-candidate');

    for (let j = i + 1; j < n; j++) {
      bars[j].classList.add('comparing');
      await sleep();

      if (array[j] < array[minIndex]) {
        // the previous min candidate is no longer the min
        bars[minIndex].classList.remove('min-candidate');
        minIndex = j;
        bars[minIndex].classList.add('min-candidate');
      }

      bars[j].classList.remove('comparing');
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      updateBarHeight(bars[i], array[i]);
      updateBarHeight(bars[minIndex], array[minIndex]);
      await sleep();
    }

    bars[minIndex].classList.remove('min-candidate');
    bars[i].classList.add('sorted');
  }

  bars[n - 1].classList.add('sorted');
}