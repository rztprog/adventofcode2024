const fs = require('fs');
let results = 0;

fs.readFile('data-day3.txt', 'utf8', (err, text) => {
    if (err) throw err;
    puzzleResult(text)

    console.log('Results = ' + results);
});

function puzzleResult(text) {
    let singleLineText = text.replace(/\n/g, " ");
    const instructions = [...singleLineText.matchAll(/mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g)];
    let enabled = true;

    instructions.forEach(instruction => {
        // console.log(instruction[0]);
        
        if (instruction[0] === "don't()") {
            enabled = false;
        } else if (instruction[0] === "do()") {
            enabled = true;
        } else if (instruction[1] && instruction[2] && enabled) {
            results += parseInt(instruction[1]) * parseInt(instruction[2]);
        }
    });
}