const lists = `
3   4
4   3
2   5
1   3
3   9
3   3
`

const list1 = []
const list2 = []
let totalDistance = 0

lists.split("\n").forEach((line) => {
    if (!(line === "")) {
        const numberObj = line.match(/(\d+)\s+(\d+)/)
        list1.push(parseInt(numberObj[1]))
        list2.push(parseInt(numberObj[2]))
    }
})

list1.sort()
list2.sort()

for (let index = 0; index < list1.length; index++) {
    totalDistance += Math.abs(list1[index] - list2[index])
}

console.log(totalDistance);