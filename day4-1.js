const puzzle = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

const xmasPuzzle = puzzle.split("\n").filter(line => line.trim() !== "");
let xmasCount = 0;

function checkSequence(lineIndex, xIndex, deltaLine, deltaX) {
    return (
        xmasPuzzle[lineIndex + deltaLine]?.[xIndex + deltaX] === 'M' &&
        xmasPuzzle[lineIndex + 2 * deltaLine]?.[xIndex + 2 * deltaX] === 'A' &&
        xmasPuzzle[lineIndex + 3 * deltaLine]?.[xIndex + 3 * deltaX] === 'S'
    );
}

function checkAllDirections(lineIndex, xIndex) {
    const directions = [
        { deltaLine: -1, deltaX: 0 },  // Vertical up
        { deltaLine: 1, deltaX: 0 },   // Vertical down
        { deltaLine: -1, deltaX: 1 },  // Diagonal up right
        { deltaLine: 1, deltaX: 1 },   // Diagonal down right
        { deltaLine: 1, deltaX: -1 },  // Diagonal down left
        { deltaLine: -1, deltaX: -1 }  // Diagonal up left
    ];

    for (const { deltaLine, deltaX } of directions) {
        if (checkSequence(lineIndex, xIndex, deltaLine, deltaX)) {
            xmasCount++;
        }
    }
}

xmasPuzzle.forEach((line, lineIndex) => {
    // Horizontal, Backward
    const horizontal = [
        ...line.matchAll(/XMAS/g), 
        ...line.matchAll(/SAMX/g)
    ];
    xmasCount += horizontal.length;

    // Vertical, Diagonal
    const xPositions = [...line.matchAll(/X/g)];
    xPositions.forEach(element => {
        checkAllDirections(lineIndex, element.index);
    });
});

console.log('XMAS Found = ' + xmasCount);
