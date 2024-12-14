const puzzle = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;


const lines = puzzle.split('\n');
lines.shift()
lines.pop()
const emptyLineIndex = lines.indexOf('');
let correctOrderedUpdates = 0

const { rules, pagesUpdate } = {
    rules: lines.slice(0, emptyLineIndex),
    pagesUpdate: lines.slice(emptyLineIndex + 1)
}

for (let pageIndex = 0; pageIndex < pagesUpdate.length; pageIndex++) {
    const page = pagesUpdate[pageIndex].split(',')

    if (pageRulesChecker(page)) {
        correctOrderedUpdates += middlePageNumber(page)
    }

}

function pageRulesChecker(page) {
    for (let delta = 0; delta < page.length; delta++) {
        for (let yindex = delta + 1; yindex < page.length; yindex++) {
            if(!rules.includes(`${page[delta]}|${page[yindex]}`)){
                console.log('A FIX ICI ', rules.includes(`${page[yindex]}|${page[delta]}`));
                
                return false
            }
        }
    }
    return true
}

function middlePageNumber(page) {
    return parseInt(page[(page.length - 1) / 2])
}

console.log('correctOrderedUpdates = ' + correctOrderedUpdates);
