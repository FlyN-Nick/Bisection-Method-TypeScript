"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testBisectionFunction = exports.bisection = void 0;
function convert(f, x) {
    if (typeof f == 'string') {
        return eval(f);
    }
    else {
        return f(x);
    }
}
function bisection(f, min, max, maxIter = 100, annoyingConsoleLogs = false, epsilon = 0) {
    console.log("---------------------------------------------------------------");
    if (min > max) {
        let tmp = max;
        max = min;
        min = tmp;
    }
    if (min == max && convert(f, min) == 0) {
        console.log("Min=max=root.");
        return min;
    }
    else if (min == max) {
        console.log("Min=max≠root.");
        return 'ERROR';
    }
    else if (convert(f, min) == 0) {
        console.log("Min=root.");
        return min;
    }
    else if (convert(f, max) == 0) {
        console.log("Max=root.");
        return max;
    }
    let posSlope = true;
    if (convert(f, min) > convert(f, (min + max / 2))) {
        posSlope = false;
    }
    let iter = 0;
    while (iter != maxIter) {
        iter++;
        let guess = (min + max) / 2;
        if ((convert(f, guess) < 0 && posSlope) || (convert(f, guess) > 0 && !posSlope)) {
            if (guess == min) {
                console.log(`Stopped at iteration #${iter}.`);
                console.log(`Root not found.\nRange: (${min}, ${max}).`);
                return [min, max];
            }
            min = guess;
        }
        else if ((convert(f, guess) > 0 && posSlope) || (convert(f, guess) < 0 && !posSlope)) {
            if (guess == max) {
                console.log(`Stopped at iteration #${iter}.`);
                console.log(`Root not found.\nRange: (${min}, ${max}).`);
                return [min, max];
            }
            max = guess;
        }
        else if (Math.abs(convert(f, guess) - 0) <= epsilon) {
            console.log(`Root: ${guess}.\nIterations it took: ${iter}.`);
            return guess;
        }
        if (annoyingConsoleLogs) {
            console.log(`Iteration #${iter}:\n\tCurrent range: (${min}, ${max})`);
        }
    }
    console.log(`Root not found (maximum iterations reached).\nRange: (${min}, ${max}).`);
    console.log(`Remember, this algorithm will only work if:\n\t#1: The root is within the range.\n\t#2: The function changes sign once within the interval.`);
    return [min, max];
}
exports.bisection = bisection;
function testBisectionFunction() {
    console.log(`TESTING BISECTION FUNCTION!\n`);
    const linFunc = (x) => { return 2 * x - 19; };
    const linFuncString = '2*x-19';
    const polyFunc = (x) => { return Math.pow(x, 2) + x - 5; };
    const trigFuncOne = (x) => { return Math.sin(1 / x); };
    const trigFuncTwo = (x) => { return Math.sin(x) / x; };
    const returnedVals = [
        bisection(linFunc, 9.5, 9.5),
        bisection(linFunc, 5, 5),
        bisection(linFunc, 9.5, 10),
        bisection(linFunc, 9, 9.5),
        bisection(linFunc, -100, 0),
        bisection(linFunc, 100, -100),
        bisection(linFuncString, -100, 100),
        bisection(polyFunc, 0, 21),
        bisection(trigFuncOne, 0.212, 0.637, 100000),
        bisection(trigFuncTwo, 0.1, 4.25, 1000)
    ];
    console.log("---------------------------------------------------------------");
    console.log(`\nReturned values from bisection function:\n[`);
    let len = returnedVals.length;
    let i = 0;
    for (const returnedVal of returnedVals) {
        i++;
        let toPrint;
        switch (typeof returnedVal) {
            case 'string':
                toPrint = `\t${returnedVal}`;
                break;
            case 'number':
                toPrint = `\t${returnedVal}`;
                break;
            default:
                toPrint = `\t[${returnedVal[0]}, ${returnedVal[1]}]`;
        }
        if (i != len) {
            toPrint += ',';
        }
        else {
            toPrint += `\n]`;
        }
        console.log(toPrint);
    }
}
exports.testBisectionFunction = testBisectionFunction;
//# sourceMappingURL=bisection.js.map