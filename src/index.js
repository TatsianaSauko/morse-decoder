const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};
const digitOfMorse = {
    '10': '.',
    '11': '-',
    '**********': ' '
}

function deleteZero (lst) {
    for (let item of lst) {
        let ind = item.indexOf('1')
        item.splice(0, ind)
    }
    return lst
}

function splitNumbers (arrayNumbers) {
    let arraySplit = []
    let result = []
    let itemOfResult = []
    for (let item of arrayNumbers) {
        for (let i = 0; i < item.length; i++) {
            if (item[i] !== '*' && itemOfResult.length < 2) {
                itemOfResult.push(item[i])
            }
            if (itemOfResult.length === 2) {
                result.push(itemOfResult.join(''))
                itemOfResult = []
            }
            if (item[i] === '*') {
                result.push("**********")
                i = item.length - 1
            }
            if (i === item.length - 1) {
                arraySplit.push([result])
                result = []
            }
        }
    }
    return arraySplit.flat()
}


function translateSymbol (lst) {
    let res2 = []
    let res = []
    for (let item of lst) {
        for (let i = 0; i < item.length; i++) {
             res.push(digitOfMorse[item[i]])
        }
        if (res.length === item.length) {
            res2.push(res.join(''))
            res = []
        }
    }
    return res2
}

function decode(expr) {
    let exprNew = []
    let itemOfExprNew = []
    for (let item of expr) {
        itemOfExprNew.push(item)
        if (itemOfExprNew.length === 10) {
            exprNew.push(itemOfExprNew)
            itemOfExprNew = []
        }
    }
    let exprNewWithoutZero = deleteZero(exprNew)
    let arrayNumbers = splitNumbers(exprNewWithoutZero)
    let arrayMorse = translateSymbol (arrayNumbers)
    let result = []
    for (let item of arrayMorse) {
        if (item === ' ') {
            result.push(' ')
        }
        result.push(MORSE_TABLE[item])
    }
    return result.join('')
}

module.exports = {
    decode
}
