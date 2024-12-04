const fs = require('fs');
let results = 0;

fs.readFile('data-day3.txt', 'utf8', (err, text) => {
    if (err) throw err;
    puzzleResult(text)

    console.log('Results = ' + results);
});

function puzzleResult(text) {
    const singleLineText = text.replace(/\n/g, " ");

    const instructions = [...singleLineText.matchAll(/mul\((\d+),(\d+)\)/g)]
    instructions.forEach(instruction => {
        results += instruction[1] * instruction[2]
    });
}