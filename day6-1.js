const puzzle = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`

const labSplit = puzzle.split("\n").filter(line => line.trim() !== "");
const guardPosition = { 
    x: 0,
    y: 0,
    next: 'top'
}
const nextDirections = {
    top: 'right',
    right: 'bottom',
    bottom: 'left',
    left: 'top'
}

//console.log(labSplit);

// Start find guard
labSplit.forEach((line, index) => {
    if (line.includes('^')) {          
        guardPosition.x = index
        guardPosition.y = line.indexOf('^')
        return
    }
});

function move(way) {
    if (way === 'top' || way === 'bottom') {
        const nextXPos = guardPosition.x + (way === 'top' ? -1 : 1)
        if (nextXPos === -1 || nextXPos >= labSplit.length) {
            guardPosition.next = 'stop'
            labSplit[guardPosition.x] = labSplit[guardPosition.x].substring(0, guardPosition.y) 
            + 'X' 
            + labSplit[guardPosition.x].substring(guardPosition.y + 1);
            return
        }

        if (['.', 'X'].includes(labSplit[nextXPos][guardPosition.y])) {
            // Actualisation par un X l'ancien spot
            labSplit[guardPosition.x] = labSplit[guardPosition.x].substring(0, guardPosition.y) 
            + 'X' 
            + labSplit[guardPosition.x].substring(guardPosition.y + 1);

            // Actualisation par un ^ le nouveau spot
            labSplit[nextXPos] = labSplit[nextXPos].substring(0, guardPosition.y) 
            + '^'
            + labSplit[nextXPos].substring(guardPosition.y + 1);

            // Changement de la position du garde
            guardPosition.x = nextXPos
        } else {
            guardPosition.next = nextDirections[way]
        }
    } else if (way === 'right' || way === 'left') {
        const nextYPos = guardPosition.y + (way === 'left' ? -1 : 1)
        if (nextYPos === -1 || nextYPos >= labSplit[guardPosition.y].length) {
            guardPosition.next = 'stop'
            return
        }

        if (['.', 'X'].includes(labSplit[guardPosition.x][nextYPos])) {
            // Actualisation par un X l'ancien spot
            labSplit[guardPosition.x] = labSplit[guardPosition.x].substring(0, guardPosition.y) 
            + 'X' 
            + labSplit[guardPosition.x].substring(guardPosition.y + 1);

            // Actualisation par un ^ le nouveau spot
            labSplit[guardPosition.x] = labSplit[guardPosition.x].substring(0, nextYPos) 
            + '^'
            + labSplit[guardPosition.x].substring(nextYPos + 1);

            // Changement de la position du garde
            guardPosition.y = nextYPos
        } else {
            guardPosition.next = nextDirections[way]
        }
    }
}

while(guardPosition.next !== 'stop') {
    move(guardPosition.next)
    // console.log('Move', guardPosition.x, guardPosition.y, guardPosition.next);
    // console.log(labSplit.join('\n'));
}

console.log('Distinct Positions = ' + (labSplit.join('').split('X').length - 1));


