
// 1>

let number = [1,2,3,4,5,6,7,8,9,];

let result = number.filter(x=>x%2==0)
                    .reduce((sum, x) => sum + x * x, 0);

console.log(" sum of the square of the even numbers :->",result)

// 2>

const arr = [
    1,
    [2, 3],
    [4, [5, 6]],
    [7, [8, [9, 10]]]
];

console.log(arr);

function flattenArray(arr) {
    const result = [];

    for (const item of arr) {
        if (Array.isArray(item)) {
            result.push(...flattenArray(item));
        } else {
            result.push(item);
        }
    }

    return result;
}

console.log("Without the flat unction")
console.log(flattenArray(arr));

console.log("Using the flat function")
console.log(arr.flat(Infinity));

// 3>

let ar1=[1,2,3,4,5,6,7,8,9];
let ar2=[9,5,5,1,3,6,2,8,3];


const results = ar1.filter(x => ar2.includes(x));

console.log(" Intersection of two arrays ",results);


// 4>

const transactions = [
    { amount: 1000, type: "credit" },
    { amount: 200, type: "debit" },
    { amount: 500, type: "credit" },
    { amount: 100, type: "debit" }
];

const balances = transactions.reduce((balance, transaction) => {
    if (transaction.type === "credit") {
        return balance + transaction.amount;
    }

    return balance - transaction.amount;
}, 0);

console.log("Current Balance In The Account",balances);

// 5>

const users = [
    { name: "Tejes", age: 25, city: "Pune" },
    { name: "Rahul", age: 28, city: "Mumbai" },
    { name: "Amit", age: 24, city: "Pune" },
    { name: "Sneha", age: 27, city: "Mumbai" },
    { name: "Priya", age: 26, city: "Delhi" }
];

const groupedUsers = users.reduce((result, user) => {

    if (!result[user.city]) {
        result[user.city] = [];
    }

    result[user.city].push(user);

    return result;

}, {});

console.log(groupedUsers);

