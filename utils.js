const readline = require('readline');

const endProcess = (err) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(
    () => rl.question(
      err ? 'Press ENTER to close window.' : '',
      () => process.exit(1)
    )
  );
}

const closeWindow = async () => {
  let count = 10;
  setInterval(() => {
    if (count === 10) {
      process.stdout.write('Press ENTER to close window.\n');
      process.stdout.write(`This window will close in ${count - 1} seconds...`);
    } else {
      process.stdout.moveCursor(0, -1);
      process.stdout.clearScreenDown();
      process.stdout.cursorTo(0);
      process.stdout.write('Press ENTER to close window.\n');
      process.stdout.write(`This window will close in ${count - 1} seconds...`);
    }
    count--;
    if (count <= 0) process.exit(0);
  }, 1000);

  await endProcess();
}

const error = async (err) => {
  console.log('ERROR: ', err);
  await endProcess(err);
}

module.exports = { closeWindow, error };
