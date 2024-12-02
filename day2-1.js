const puzzle = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`

let safeReports = 0;

puzzle.split("\n").forEach((line) => {
    if (line.trim() === "") return; // Guard clause

    const splittedLine = line.split(' ').map(Number)
    const levels = splittedLine[0] > splittedLine[1] ? 'decrease' : 'increase'

    // IsNotSequential
    if (isNotSequential(splittedLine, levels)){
        return
    }

    // IsNotSafe
    for (let index = 0; index < splittedLine.length - 1; index++) {
        if (isNotSafe(splittedLine[index], splittedLine[index + 1], levels)){
            return
        }
    }

    // console.log(splittedLine + " is Safe");
    safeReports += 1
})

function isNotSafe(actual, next, levels) {
    const diff = (levels === 'decrease' ? actual - next : next - actual)

    return ![1, 2, 3].includes(
        Math.abs(diff)
    )
}

function isNotSequential(array, levels) {
    for (let index = 0; index < array.length - 1; index++) {
        if (levels === 'decrease') {
            if (!(array[index] > array[index + 1])) {
                return true
            }
        } else {
            if (!(array[index] < array[index + 1])){
                return true
            }
        }
    }
}

console.log('SafeReport = ' + safeReports);

