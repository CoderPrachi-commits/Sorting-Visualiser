
// Bubble Sort
// Repeatedly compares adjacent elements and swaps them if they
// are in the wrong order. The largest unsorted element "bubbles"
// to the end of the array after each pass.

async function bubbleSort(array, bars, delay) {
  let n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {

      // highlight the two bars being compared
      bars[j].classList.add('comparing');
      bars[j + 1].classList.add('comparing');
      await sleep(delay);

      if (array[j] > array[j + 1]) {
        // swap values in the data array
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        // update the bar heights to match new values
        updateBarHeight(bars[j], array[j]);
        updateBarHeight(bars[j + 1], array[j + 1]);
        await sleep(delay);
      }

      bars[j].classList.remove('comparing');
      bars[j + 1].classList.remove('comparing');
    }

    // after each pass, the last element of the unsorted part is sorted
    bars[n - i - 1].classList.add('sorted');
  }

  bars[0].classList.add('sorted');
}