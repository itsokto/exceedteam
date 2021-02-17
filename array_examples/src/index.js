function sliceExample() {
  const array = [100, 101, 102, 200, 201, 202, 300, 301, 302];
  const newArray = array.slice(3, 6);
  console.log(newArray);
}

function spliceExample() {
  const array = [100, 101, 102, 200, 201, 202, 300, 301, 302];
  const newArray = array.splice(0, 3);
  console.log(newArray);
}

function mapExample() {
  const array = [100, 101, 102, 200, 201, 202, 300, 301, 302];
  const newArray = array.map((value) => {
    return value + 100;
  });
  console.log(newArray);
}

function forExample() {
  const array = [100, 101, 102, 200, 201, 202, 300, 301, 302];
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 === 0) console.log(array[i]);
  }
}

function forEachExample() {
  const array = [
    "vs code",
    "rider",
    "webstorm",
    "visual studio",
    "lion",
    "pycharm",
  ];
  array.forEach((value) => console.log(value));
}

function filterExample() {
  const array = ["rare", "common", "uncommon", "immortal", "common"];
  const result = array.filter((value) => value === "common");
  console.log(result);
}

function reduceExample() {
  const array = [1, 2, 3, 4, 5];
  const result = array.reduce((acc, current) => acc + current);
  console.log(result);
}

function sortExample() {
  const array = [7, 5, 4, 2, 8];
  array.sort();
  console.log(array);
}

function someExample() {
  const array = [7, 5, 4, 2, 8];
  const result = array.some((value) => value > 5);
  console.log(result);
}

function everyExample() {
  const array = [2, 4, 6, 8, 11];
  const result = array.every((value) => value % 2 === 0);
  console.log(result);
}

sliceExample();
spliceExample();
mapExample();
forExample();
forEachExample();
filterExample();
reduceExample();
sortExample();
someExample();
everyExample();
