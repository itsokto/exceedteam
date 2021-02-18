function printStringSymbol() {
  const str = "Я изучаю JavaScript";

  console.log(str[2]);
  console.log(str[0]);
  console.log(str[str.length - 1]);
}

function replaceStringSymbols() {
  const str = "Я изучаю JavaScript";
  const replaceSymblol = str.replace("ю", "л");
  const replaceWord = str.replace("JavaScript", "Frontend");

  console.log(replaceSymblol);
  console.log(replaceWord);
}

function indexOfElement() {
  const animals = ["cat", "dog", "parrot", "horse"];
  console.log("indexOf: " + animals.indexOf("parrot"));

  for (let i = 0; i < animals.length; i++) {
    if (animals[i] === "parrot") {
      console.log("for: " + i);
      break;
    }
  }
}

function removeElementsOfArray() {
  const animals = ["cat", "dog", "parrot", "horse", "fish", "chicken", "lion"];

  animals.splice(animals.indexOf("fish"), 1);

  animals.splice(animals.indexOf("cat"), 1); // или animals.shift();, т.к. элемент в начале массива

  animals.splice(animals.length - 2);

  console.log(animals);
}

function filterArray() {
  const array = [31, 10, "chicken", 9, "fish", 10];

  const arrayOfStrings = array.filter((value) => typeof value === "string");
  const arrayOfTen = array.filter((value) => value === 10);

  console.log(arrayOfStrings);
  console.log(arrayOfTen);
}

//#region Вывод свойств и значений объекта

//#region helpers
function printObjectKeysAndValues(obj) {
  const keysAndValues = Object.keys(obj).map((key) => key + ": " + obj[key]);
  keysAndValues.forEach((element) => console.log(element));
}

function renameObjectKey(obj, oldKey, newKey) {
  if (obj.hasOwnProperty(oldKey)) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
}

function renameObjectKeys(obj, keysMap) {
  Object.keys(keysMap).forEach((key) =>
    renameObjectKey(obj, key, keysMap[key])
  );
}
//#endregion

function printObjectKeysAndValues1() {
  const person = {
    firstName: "Jack",
    lastName: "Sparrow",
    age: 25,
    location: "Caribbean sea",
  };

  printObjectKeysAndValues(person);
}

function printObjectKeysAndValues2() {
  const keysMap = {
    firstName: "First name",
    lastName: "Last name",
    age: "Age",
    location: "Where to find",
  };

  const person = {
    firstName: "Jack",
    lastName: "Sparrow",
    age: 25,
    location: "Caribbean sea",
  };

  renameObjectKeys(person, keysMap);

  printObjectKeysAndValues(person);
}

//#endregion

function compareObject(obj1, obj2) {
  for (let prop in obj1) {
    if (obj2.hasOwnProperty(prop) && obj1[prop] === obj2[prop]) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

function compareObjects() {
  const person = { name: "alex", lastName: "test", age: 20 };
  const person1 = { name: "alex", lastName: "test", age: 20 };

  const parrot = { name: "kesha", age: 1 };

  console.log("Compare person with person1: " + compareObject(person, person1));
  console.log("Compare person with parrot: " + compareObject(person, parrot));
}

printStringSymbol();
replaceStringSymbols();
indexOfElement();
removeElementsOfArray();
filterArray();
printObjectKeysAndValues1();
printObjectKeysAndValues2();
compareObjects();
