# Calculus Bisection Class Project 
# Author: Nicholas Assaderaghi (FlyN Nick)
# Translated from TypeScript to python. 

import math 
#import sys

def convert(f, x: float) -> float:
  """Returns the value of an expression given x.""" 
  if type(f) is str:
    return eval(f)
  return f(x)

def bisection(f, min: float, max: float, maxIter=100, annoyingPrints=False):
  """Bisection function: finds the root of a function within given range.

  Things that may cause this to be unsuccessfull/error:
    #1: Root is not within given range. 
    #2: Function changes signs more than once within given range.
    #3: The given minimum is greater than the given maximum. 
    #4: There are x within given range where f(x) is undefined. 

  Parameters
  ----------
  f : str or function 
    Function that is being evaluated.
  min : float 
    The given lower bound of the possible range of the root
  max : float
    The given upper bound of the possible range of the root
  maxIter : int, optional 
    The maximum number of iterations (default 1000)
  annoyingPrints : bool, optional
    Enables an annoying print statement every iteration (default False)
  """
  
  print('---------------------------------------------------------------');

  if min > max:
    print('You seem to have mixed the min and max...')
    return 'ERROR'
  elif min is max and convert(f, min) == 0:
    print('Wow, the given min and max were the same and were the root. Kinda seems like this was on purpose...')
    return min
  elif min is max:
    print('Wow, the given min and max were the same but were not the root. Kinda seems like this was on purpose...')
    return 'ERROR'
  elif convert(f, min) == 0:
    print('Wow, the lower bound of the given range was the root. Kinda seems like this was on purpose...')
    return min
  elif convert(f, max) == 0:
    print('Wow, the upper bound of the given range was the root. Kinda seems like this was on purpose...')
    return max

  posSlope = True
  if convert(f, min) > convert(f, (min+max/2)):
    posSlope = False

  iter = 0
  while iter != maxIter:
    iter += 1 
    guess = (min+max)/2

    if (convert(f, guess) < 0 and posSlope) or (convert(f, guess) > 0 and not posSlope):
      if guess == min:
        print(f'Stopped at iteration #{iter}.')
        print(f'Root not found.\nRange: ({min}, {max}).')
        return [min, max]
      min = guess;
    elif (convert(f, guess) > 0 and posSlope) or (convert(f, guess) < 0 and not posSlope): 
      if guess == max: 
        print(f'Stopped at iteration #{iter}.')
        print(f'Root not found.\nRange: ({min}, {max}).')
        return [min, max]
      max = guess
    else: 
      print(f'Root: {guess}.\nIterations it took: {iter}.')
      return guess
    if annoyingPrints:
      print(f'Iteration #{iter}:\n\tCurrent range: ({min}, {max})')
  
  print(f'Root not found (maximum iterations reached).\nRange: ({min}, {max}).')

  print(f'Remember, this algorithm will only work if:\n\t#1: The root is within the range.\n\t#2: The function changes sign once within the interval.')

  return [min, max]

def testBisectionFunction():
  """Just testing if everything generally works. This is not an in-depth test (does not test all error scenarios)."""
  print('TESTING BISECTION FUNCTION!\n')
  
  def linFunc(x: float) -> float:
    return 2*x-19

  linFuncString = '2*x-19'
  polyFunc = 'x**2+x-5'  
  trigFuncOne = 'math.sin(1/x)'
  trigFuncTwo = 'math.sin(x)/x'

  returnedVals = [
    bisection(linFunc, 9.5, 9.5), # root is both given min and max
    bisection(linFunc, 5, 5), # given min and max are the same, but not the root
    bisection(linFunc, 9.5, 10), # root is the given min 
    bisection(linFunc, 9, 9.5), # root is the given max
    bisection(linFunc, -100, 0), # root not within range 
    bisection(linFunc, 100, -100), # upper and lower switched 
    bisection(linFuncString, -100, 100),
    bisection(polyFunc, 0, 21),
    bisection(trigFuncOne, 0.212, 0.637, 100000),
    bisection(trigFuncTwo, 0.1, 4.25, 1000)
  ]

  print('---------------------------------------------------------------')
  print(f'\nReturned values from bisection function:\n[');

  length = len(returnedVals)
  i = 0
  #print(returnedVals)
  for returnedVal in returnedVals:
    i += 1
    if i != length:
      print(f'\t{returnedVal},')
    else:
      print(f'\t{returnedVal}\n]')

testBisectionFunction()