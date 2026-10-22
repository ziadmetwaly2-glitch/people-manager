const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'data10.json');
const maxPeople = 10;

const loadInfo = () => {
  try {
    const dataJson = fs.readFileSync(dataFile, 'utf8');
    const people = JSON.parse(dataJson);
    return Array.isArray(people) ? people : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    console.log('Could not read data10.json:', error.message);
    return [];
  }
};

const saveAllData = (people) => {
  fs.writeFileSync(dataFile, JSON.stringify(people, null, 2));
};

const addPerson = (id, fname, lname, age, city) => {
  const allData = loadInfo();

  if (allData.some((person) => String(person.id) === String(id))) {
    return console.log('ERROR: This ID already exists.');
  }
  if (allData.length >= maxPeople) {
    return console.log(`ERROR: You can add a maximum of ${maxPeople} people.`);
  }
  if (!Number.isInteger(age) || age < 0) {
    return console.log('ERROR: Age must be a non-negative whole number.');
  }

  allData.push({ id, fname, lname, age, city });
  saveAllData(allData);
  console.log(`Person ${fname} ${lname} was added successfully.`);
};

const readData = (id) => {
  const person = loadInfo().find((item) => String(item.id) === String(id));
  if (!person) return console.log('ID NOT FOUND.');
  console.log(person);
};

const listData = () => {
  const allData = loadInfo();
  if (allData.length === 0) return console.log('There are no people to display.');
  allData.forEach((person) => console.log(person));
};

const deleteData = (id) => {
  const allData = loadInfo();
  const remainingPeople = allData.filter((person) => String(person.id) !== String(id));
  if (remainingPeople.length === allData.length) return console.log('ID NOT FOUND.');
  saveAllData(remainingPeople);
  console.log(`Person with ID ${id} was deleted.`);
};

const deleteAll = () => {
  saveAllData([]);
  console.log('All people were deleted.');
};

const listNamesAndCities = () => {
  const allData = loadInfo();
  if (allData.length === 0) return console.log('There are no people to display.');
  allData.forEach((person) => console.log(`${person.fname} ${person.lname} - ${person.city}`));
};

module.exports = { addPerson, readData, listData, deleteData, deleteAll, listNamesAndCities };
