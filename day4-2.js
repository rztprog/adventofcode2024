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

function checkMAS(lineIndex, aIndex) {
    const crossResult = [
        xmasPuzzle[lineIndex - 1]?.[aIndex - 1],
        xmasPuzzle[lineIndex + 1]?.[aIndex + 1],
        xmasPuzzle[lineIndex - 1]?.[aIndex + 1],
        xmasPuzzle[lineIndex + 1]?.[aIndex - 1],
    ]

    if (['MSMS', 'SMSM', 'MSSM', 'SMMS'].includes(crossResult.join('')) ) {
        return true
    }
}

xmasPuzzle.forEach((line, lineIndex) => {
    const aPositions = [...line.matchAll(/A/g)]

    aPositions.forEach(element => {
        if (checkMAS(lineIndex, element.index)) {
            xmasCount++
        }
    })
    
});

console.log('XMAS Found = ' + xmasCount);
