// Calculus Bisection Class Project 
// Author: Nicholas Assaderaghi (FlyN Nick)
// Why did I write this in TypeScript: I felt like it :) 

/**
 * Bisection function. 
 * Finds the root of a function within given range.
 * 
 * Things that may cause this to be unsuccessfull/error:
 * #1: Root is not within given range. 
 * #2: Function changes signs more than once within given range.
 * #3: The given minimum is greater than the given maximum. 
 * #4: There are x within given range where f(x) is undefined. 
 * 
 * @param {(x: number) => any} func - function you want to find the root of. 
 * @param {number} givenMin - min of given range.
 * @param {number} givenMax - max of given range.
 * @param {bool} annoyingConsoleLogs - (optional) really annoying console log ever iteration. 
 * @param {number} maxIter - (optional) max number of iterations 
 */
function bisection(func: (x: number) => number, givenMin: number, givenMax: number, maxIter=100, annoyingConsoleLogs=false): number | [number, number] | "ERROR"
{
  let posSlope = true; 
  let min = givenMin;
  let max = givenMax;
  let iter = 0; 
  
  console.log("---------------------------------------------------------------");

  if (givenMin > givenMax) 
  {
    console.log("You seem to have mixed the min and max...");
    return "ERROR"; 
  }
  else if (givenMin == givenMax)
  {
    console.log("The min and max given were the same...");
    return "ERROR"; 
  }

  if (func(min) > func(min+max/2)) { posSlope = false; }

  while (iter != maxIter) 
  {
    iter++; 
  	let guess = (min+max)/2;

    if ((func(guess) < 0 && posSlope) || (func(guess) > 0 && !posSlope)) 
    {
      if (guess == min)
      { 
        console.log(`Stopped at iteration #${iter}`);
        console.log(`Root not found.\nRange: (${min}, ${max}).`); 
        return [min, max]; 
      }
      min = guess; 
    }
    else if ((func(guess) > 0 && posSlope) || (func(guess) < 0 && !posSlope)) 
    { 
      if (guess == max) 
      { 
        console.log(`Stopped at iteration #${iter}`);
        console.log(`Root not found.\nRange: (${min}, ${max}).`); 
        return [min, max]; 
      }
      max = guess; 
    }
    else 
    {
    	console.log(`Root: ${guess}.\nIterations it took: ${iter}.`);
      return guess;
    }
    if (annoyingConsoleLogs) 
    { 
      console.log(`Iteration #${iter}:\n\tCurrent range: (${min}, ${max})`); 
    }
  }
  
  console.log(`Root not found (maximum iterations reached).\nRange: (${min}, ${max}).`);

  console.log("Remember, this algorithm will only work if:\n\t#1: The root is within the range.\n\t#2: The function changes sign once within the interval.");

  return [min, max];
}

/** 
 * Just testing if everything generally works.
 * This is not an in-depth test (does not test all error scenarios). 
 */
function testBisectionFunction() 
{
  console.log("TESTING BISECTION FUNCTION!");
  /** Test linear function: (2x -19). */
  const linFunc = (x: number) => { return 2*x-19; }

  /** Test polynomial function: (x^2 + x - 5). */
  const polyFunc = (x: number) => { return x**2+x-5; } 

  /** First test trigonometric function: sin(1/x). */
  const trigFuncOne = (x: number) => { return Math.sin(1/x); }

  /** Second test trigonometric function: sin(x)/x. */
  const trigFuncTwo = (x: number) => { return Math.sin(x)/x; }

  const returnedVals: (number | [number, number] | "ERROR")[] = 
  [
    bisection(linFunc, 100, -100),
    bisection(linFunc, -100, 100),
    bisection(polyFunc, 0, 21),
    bisection(trigFuncOne, 0.212, 0.637, 100000),
    bisection(trigFuncTwo, 0.1, 4.25, 1000/*, true*/) // those console logs really are annoying... 
  ]

  console.log("---------------------------------------------------------------");
  console.log(`\nReturned values from bisection function:\n[`);

  // should I have just used a regular for loop: yes. 
  let len = returnedVals.length; 
  let i = 0;
  for (const returnedVal of returnedVals)
  {
    i++;
    let toPrint;
    switch (typeof returnedVal)
    {
      case 'string':
        toPrint = `\t"${returnedVal}"`;
        break;
      case 'number': 
        toPrint = `\t${returnedVal}`;
        break;
      default:
        toPrint = `\t[${returnedVal[0]}, ${returnedVal[1]}]`;
    }
    if (i != len) { toPrint += ','; }
    console.log(toPrint);
  }

  console.log(`]`);
}

testBisectionFunction();