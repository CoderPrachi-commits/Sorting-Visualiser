// ---------- Global State ----------
let array = []; // the data being sorted
let bars = []; // the DOM bar elements, in sync with "array"
let isSorting = false;
let animationDelay = 255; // current delay in ms; sleep() always reads this live

// ---------- DOM References ----------
const container = document.getElementById('array-container');
const generateBtn = document.getElementById('generateBtn');
const startBtn = document.getElementById('startBtn');
const sizeSlider = document.getElementById('sizeSlider');
const speedSlider = document.getElementById('speedSlider');
const sizeValue = document.getElementById('sizeValue');
const speedValue = document.getElementById('speedValue');
const algoSelect = document.getElementById('algoSelect');

// ---------- Helper Functions ----------

// Pauses execution for the CURRENT animation delay. Every sorting
// algorithm calls this between steps. Because it reads the global
// "animationDelay" each time (instead of a value passed in once),
// moving the speed slider mid-sort speeds up/slows down immediately.
function sleep() {
  return new Promise(resolve => setTimeout(resolve, animationDelay));
}

// Converts the speed slider (1-100) into a delay in milliseconds.
// Higher slider value = faster sorting = smaller delay.
function getDelay() {
  return 510 - speedSlider.value * 5;
}

// Updates a single bar's visual height to match its data value.
function updateBarHeight(bar, value) {
  bar.style.height = value + 'px';
}

// Creates a brand new random array and renders it as bars.
function generateArray() {
  if (isSorting) return;

  let size = parseInt(sizeSlider.value);
  array = [];

  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 350) + 20);
  }

  renderBars();
}

// Clears the container and draws one bar per array value.
function renderBars() {
  container.innerHTML = '';
  bars = [];

  let barWidth = Math.max(100 / array.length - 0.5, 2); // % width

  array.forEach(value => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = value + 'px';
    bar.style.width = barWidth + '%';
    container.appendChild(bar);
    bars.push(bar);
  });
}

// Removes any leftover color classes before a new sort starts.
function resetColors() {
  bars.forEach(bar => {
    bar.classList.remove('comparing', 'sorted', 'min-candidate');
  });
}

// Marks every bar green once sorting is fully complete.
function markAllSorted() {
  bars.forEach(bar => {
    bar.classList.remove('comparing', 'min-candidate');
    bar.classList.add('sorted');
  });
}

// Enables/disables controls while sorting is in progress, so the
// user can't change the array or start another sort mid-animation.
// The speed slider is deliberately NOT disabled — it stays live so
// speed can be adjusted while the sort is running.
function toggleControls(disabled) {
  generateBtn.disabled = disabled;
  sizeSlider.disabled = disabled;
  algoSelect.disabled = disabled;
  startBtn.disabled = disabled;
}

// ---------- Main Sorting Trigger ----------

async function startSorting() {
  if (isSorting) return;

  isSorting = true;
  toggleControls(true);
  resetColors();

  let algorithm = algoSelect.value;

  if (algorithm === 'bubble') {
    await bubbleSort(array, bars);
  } else if (algorithm === 'selection') {
    await selectionSort(array, bars);
  } else if (algorithm === 'insertion') {
    await insertionSort(array, bars);
  } else if (algorithm === 'merge') {
    await mergeSort(array, bars);
  } else if (algorithm === 'quick') {
    await quickSort(array, bars);
  }

  markAllSorted();
  toggleControls(false);
  isSorting = false;
}

// ---------- Event Listeners ----------

generateBtn.addEventListener('click', generateArray);
startBtn.addEventListener('click', startSorting);

sizeSlider.addEventListener('input', () => {
  sizeValue.textContent = sizeSlider.value;
  generateArray();
});

speedSlider.addEventListener('input', () => {
  speedValue.textContent = speedSlider.value;
  animationDelay = getDelay(); // takes effect immediately, even mid-sort
});

// ---------- Initialize ----------
animationDelay = getDelay();
generateArray();