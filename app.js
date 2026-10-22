const yargs = require('yargs');
const peopleData = require('./data10');

yargs.command({
  command: 'add',
  describe: 'Add a person (up to 10 people)',
  builder: {
    id: { describe: 'Person ID', demandOption: true, type: 'string' },
    fname: { describe: 'First name', demandOption: true, type: 'string' },
    lname: { describe: 'Last name', demandOption: true, type: 'string' },
    age: { describe: 'Age', demandOption: true, type: 'number' },
    city: { describe: 'City', demandOption: true, type: 'string' }
  },
  handler: (args) => peopleData.addPerson(args.id, args.fname, args.lname, args.age, args.city)
});

yargs.command({
  command: 'read',
  describe: 'View one person by ID',
  builder: { id: { describe: 'Person ID', demandOption: true, type: 'string' } },
  handler: (args) => peopleData.readData(args.id)
});

yargs.command({ command: 'list', describe: 'View all people', handler: () => peopleData.listData() });

yargs.command({
  command: 'delete',
  describe: 'Delete one person by ID',
  builder: { id: { describe: 'Person ID', demandOption: true, type: 'string' } },
  handler: (args) => peopleData.deleteData(args.id)
});

yargs.command({ command: 'deleteAll', describe: 'Delete all people', handler: () => peopleData.deleteAll() });
yargs.command({ command: 'names', describe: 'View each person full name and city', handler: () => peopleData.listNamesAndCities() });

yargs.demandCommand(1, 'Choose a command. Run "node app.js --help" to see commands.');
yargs.help().parse();
