// // 1)  Implement a sleep(ms) function using Promises.

// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// async function test() {
//   console.log("Start");

//   await sleep(2000);

//   console.log("After 2 seconds");
// }

// test();

// // 2) Implement a retry(fn, attempts) that retries an async function on failure.

// async function retry(fn, attempts) {
//   let lastError;

//   for (let i = 1; i <= attempts; i++) {
//     try {
//       return await fn();
//     } catch (error) {
//       lastError = error;
//       console.log(`Attempt ${i} failed`);
//     }
//   }

//   throw lastError;
// }

// let count = 0;

// async function test() {
//   count++;

//   if (count < 3) {
//     throw new Error("Failed");
//   }

//   return "Success";
// }

// retry(test, 3)  Implement Promise.all from scratch.
//   .then(result => console.log(result))
//   .catch(error => console.log(error));

//   //3) promise.all

//   function myPromiseAll(promises) {

//   return new Promise((resolve, reject) => {

//     const results = [];
//     let completed = 0;

//     if (promises.length === 0) {
//       resolve([]);
//       return;
//     }

//     promises.forEach((promise, index) => {

//       Promise.resolve(promise)
//         .then((value) => {

//           results[index] = value;
//           completed++;

//           if (completed === promises.length) {
//             resolve(results);
//           }

//         })
//         .catch((error) => {
//           reject(error);
//         });

//     });
//   });
// }

// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Promise 1 completed");
//   }, 3000);
// });

// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Promise 2 completed");
//   }, 1000);
// });

// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Promise 3 completed");
//   }, 2000);
// });

// myPromiseAll([promise1, promise2, promise3])
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//4   Fetch data from https://jsonplaceholder.typicode.com/users, then for each user fetch their posts (/users/:id/posts). Do this in parallel using Promise.all and log a { user, posts } object for each.

async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    const users = await response.json();

    const usersWithPosts = await Promise.all(
      users.map(async (user) => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${user.id}/posts`,
        );

        const posts = await response.json();

        return {
          user,
          posts,
        };
      }),
    );

    console.log(usersWithPosts);
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}

fetchData();
