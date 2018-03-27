const yargs = require('yargs');

const title = {
  describe: 'Title of the note',
  demand: true,
  alias: 't'
}

const body = {
  describe: 'Body of the note',
  demand: true,
  alias: 'b'
}

const yargsCfg = {
  add: {
    name: 'add',
    description: 'Add a note.',
    args: {
      title,
      body
    }
  },
  list: {
    name: 'list',
    description: 'List all notes'
  },
  read: {
    name: 'read',
    description: 'Read a single note',
    args: {
      title
    }
  },
  remove: {
    name: 'remove',
    description: 'Remove a note',
    args: {
      title
    }
  }
}

module.exports = yargs
  .strict()
  .command(yargsCfg.add.name, yargsCfg.add.description, yargsCfg.add.args)
  .command(yargsCfg.list.name, yargsCfg.list.description)
  .command(yargsCfg.read.name, yargsCfg.read.description, yargsCfg.read.args)
  .command(yargsCfg.remove.name, yargsCfg.remove.description, yargsCfg.remove.args)
  .help()
  .argv;