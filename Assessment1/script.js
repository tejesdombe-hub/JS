// 1. Write a createCounter() function that returns an object with increment, decrement, and getValue methods. The count must not be accessible from outside.

function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
    },

    decrement() {
      count--;
    },

    getValue() {
      return count;
    },
  };
}

const counter = createCounter();

counter.increment();
counter.increment();

console.log(counter.getValue());

counter.decrement();

console.log(counter.getValue());

console.log(counter.count);

// 2. Write a once(fn) function that ensures fn is called only the first time.

function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }

    return result;
  };
}

function greet(name) {
  console.log("Hello", name);
  return `Hello ${name}`;
}

const greetOnce = once(greet);

console.log(greetOnce("Tejes"));
console.log(greetOnce("Rahul"));
console.log(greetOnce("Amit"));

// 3> Write a memoize(fn) that caches results based on arguments.

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);

    cache.set(key, result);

    return result;
  };
}

function add(a, b) {
  console.log("Calculating...");
  return a + b;
}

const memoizedAdd = memoize(add);

console.log(memoizedAdd(10, 20));
console.log(memoizedAdd(10, 20));
console.log(memoizedAdd(10, 20));

// 4> Given the classic for loop closure trap with var, fix it in three different ways (let, IIFE, setTimeout with third arg).

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  })(i);
}

for (var i = 0; i < 3; i++) {
  setTimeout(
    function (value) {
      console.log(value);
    },
    1000,
    i,
  );
}
