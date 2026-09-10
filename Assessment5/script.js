
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function searchAPI(value) {
  console.log("API call:", value);
}

const searchInput = document.getElementById("search");

const debouncedSearch = debounce(searchAPI, 500);

searchInput.addEventListener("input", (event) => {
  debouncedSearch(event.target.value);
});


function throttle(fn, delay) {
  let waiting = false;

  return function (...args) {
    if (waiting) return;

    fn(...args);

    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, delay);
  };
}


function logScroll() {
  console.log("Scroll position:", window.scrollY);
}

const throttledScroll = throttle(logScroll, 200);
window.addEventListener("scroll", throttledScroll);