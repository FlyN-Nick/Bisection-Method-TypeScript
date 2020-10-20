// Calculus Bisection Class Project 
// Author: Nicholas Assaderaghi (FlyN Nick)
// Why did I write this in TypeScript: I felt like it :) 

/** Returns the value of an expressios given x. */
function convert(f: ((x: number) => number) | string, x: number): number
{
  if (typeof f == 'string') { return eval(f); }
  else { return f(x); }
}

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
 * @param {(x: number) => any} f - function you want to find the root of. 
 * @param {number} min - min of given range.
 * @param {number} max - max of given range.
 * @param {bool} annoyingConsoleLogs - (optional) really annoying console log ever iteration. 
 * @param {number} maxIter - (optional) max number of iterations 
 */
export function bisection(f: ((x: number) => number) | string, min: number, max: number, maxIter=100, annoyingConsoleLogs=false): number | [number, number] | 'ERROR'
{  
  console.log("---------------------------------------------------------------");

  if (min > max) 
  {
    console.log("You seem to have mixed the min and max...");
    return 'ERROR'; 
  }
  else if (min == max && convert(f, min) == 0)
  {
    console.log("Wow, the given min and max were the same and were the root. Kinda seems like this was on purpose...");
    return min; 
  }
  else if (min == max)
  {
    console.log("Wow, the given min and max were the same but were not the root. Kinda seems like this was on purpose...");
    return 'ERROR';
  }
  else if (convert(f, min) == 0)
  {
    console.log("Wow, the lower bound of the given range was the root. Kinda seems like this was on purpose...");
    return min;
  }
  else if (convert(f, max) == 0)
  {
    console.log("Wow, the upper bound of the given range was the root. Kinda seems like this was on purpose...");
    return max;
  }

  let posSlope = true; 
  if (convert(f, min) > convert(f, (min+max/2))) { posSlope = false; }

  let iter = 0; 
  while (iter != maxIter) 
  {
    iter++; 
  	let guess = (min+max)/2;

    if ((convert(f, guess) < 0 && posSlope) || (convert(f, guess) > 0 && !posSlope)) 
    {
      if (guess == min)
      { 
        console.log(`Stopped at iteration #${iter}.`);
        console.log(`Root not found.\nRange: (${min}, ${max}).`); 
        return [min, max]; 
      }
      min = guess; 
    }
    else if ((convert(f, guess) > 0 && posSlope) || (convert(f, guess) < 0 && !posSlope)) 
    { 
      if (guess == max) 
      { 
        console.log(`Stopped at iteration #${iter}.`);
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

  console.log(`Remember, this algorithm will only work if:\n\t#1: The root is within the range.\n\t#2: The function changes sign once within the interval.`);

  return [min, max];
}

/** 
 * Just testing if everything generally works.
 * This is not an in-depth test (does not test all error scenarios). 
 */
export function testBisectionFunction() 
{
  console.log(`TESTING BISECTION FUNCTION!\n`);
  
  /** Test linear function: (2x -19). */
  const linFunc = (x: number) => { return 2*x-19; }

  /** Test linear function in string format. */
  const linFuncString = '2*x-19';

  /** Test polynomial function: (x^2 + x - 5). */
  const polyFunc = (x: number) => { return x**2+x-5; } 

  /** First test trigonometric function: sin(1/x). */
  const trigFuncOne = (x: number) => { return Math.sin(1/x); }

  /** Second test trigonometric function: sin(x)/x. */
  const trigFuncTwo = (x: number) => { return Math.sin(x)/x; }

  const returnedVals: (number | [number, number] | 'ERROR')[] = 
  [
    bisection(linFunc, 9.5, 9.5), // root is both given min and max
    bisection(linFunc, 5, 5), // given min and max are the same, but not the root
    bisection(linFunc, 9.5, 10), // root is the given min 
    bisection(linFunc, 9, 9.5), // root is the given max
    bisection(linFunc, -100, 0), // root not within range 
    bisection(linFunc, 100, -100), // upper and lower switched 
    bisection(linFuncString, -100, 100),
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
        toPrint = `\t${returnedVal}`;
        break;
      case 'number': 
        toPrint = `\t${returnedVal}`;
        break;
      default:
        toPrint = `\t[${returnedVal[0]}, ${returnedVal[1]}]`;
    }
    if (i != len) { toPrint += ','; }
    else { toPrint += `\n]`; }
    console.log(toPrint);
  }
}

//testBisectionFunction();