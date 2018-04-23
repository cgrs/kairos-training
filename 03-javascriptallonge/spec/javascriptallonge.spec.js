describe('Javascript Allongé', () => {
  describe('prelude: values and expressions', () => {
    describe('values and identity', () => {
      it('=== operator for identical values', () => {
        expect(2 === 2).toBe(true)
      })
      it('!== operator for distinct values', () => {
        expect('hello' !== 'goodbye').toBe(true)
      })
      it('test two values with distinct types', () => {
        expect(2 === '2').toBe(false)
        expect(true !== 'true').toBe(true)
      })
      it('test two values with distinct values', () => {
        expect(true === false).toBe(false)
        expect(2 !== 5).toBe(true)
        expect('two' === 'five').toBe(false)
      })
    })
    describe('value types', () => {
      it('test expression evaluations', () => {
        expect(2 + 2 === 4).toBe(true)
        expect((2 + 2 === 4) === (2 !== 5)).toBe(true)
      })
    })
    describe('reference types', () => {
      describe('array expressions', () => {
        it('compare array with expressions', () => {
          expect([2 - 1, 2, 2 + 1] === [1, 2, 3]).toBe(false)
          expect([1,2,3] === [1, 2, 3]).toBe(false)
          expect([1, 2, 3] === [1, 2, 3]).toBe(false)
        })
        it('array circular reference', () => {
          let ouroboros = [];
          ouroboros[0] = ouroboros;
          expect(ouroboros === ouroboros[0]).toBe(true)
          expect(ouroboros[0] === ouroboros[0][0]).toBe(true)
        })
      })
    })
  })
  describe('1: basic functions', () => {
    it('function as a value', () => {
      expect((() => {})).toEqual(jasmine.any(Function))
    })
    it('functions and identities', () => {
      expect((() => {}) === (() => {})).toBe(false)
    })
    it('applying functions', () => {
      expect((() => {})()).toBe(undefined)
    })
    it('undefined values', () => {
      expect(undefined === undefined).toBe(true)
      expect((() => {})() === (() => {})()).toBe(true)
      expect((() => {})() === undefined).toBe(true)
    })
    describe('functions with no arguments and their bodies', () => {
      describe('to get a function return a value when applied', () => {
        it('we use `return` keyword', () => {
          expect((() => 0)()).toBe(0)
          expect((() => 1)()).toBe(1)
          expect((() => 'Hello ' + 'World')()).toBe('Hello World')
        })
      })
    })
    describe('functions that evaluate to functions', () => {
      it('a function that returns a function which doesn\'t return anything', () => {
        expect(
          (() => () => {})()).toEqual(jasmine.any(Function))
      })
      it('a function that gives a function that gives true', () => {
        expect(
          (() => () => true)()()
        ).toBe(true)
      })
    })
    describe('functions with arguments', () => {
      it('calculate the circumference of a circle given the diameter', () => {
        expect(
          ((diameter) => diameter * 3.14159265)(2)
        ).toBe(6.2831853)
      })
      it('function with two arguments', () => {
        expect(
          ((room, board) => room + board)(800, 150)
        ).toBe(950)
      })
      it('call by value', () => {
        expect(
          ((diameter) => diameter * 3.14159265)(1 + 1)
        ).toBe(6.2831853)
      })
    })
    describe('variables and bindings', () => {
      it('compare a value against itself', () => {
        const f = (value) => ((copy) => copy === value)(value)
        expect(f(NaN)).toBe(false)
        expect(f(false)).toBe(true)
      })
      it('currying functions', () => {
        const f1 = (x) => (y) => (z) => x + y + z
        const f2 = (x, y, z) => x + y + z
        expect(f1(1)(2)(3)).toEqual(f2(1,2,3))
      })
    })
    describe('shadow variables', () => {
      it('function environment', () => {
        const f = (x) => (x, y) => x + y
        const x = 5
        expect(f(1)(2,3)).toBe(5)
        expect(f(x)(1,2)).toBe(3)
        expect(f(1)(x,1)).toBe(6)
      })
    })
    describe('IIFE: immediately invoked function expressions', () => {
      it('circumference length', () => {
        expect(
          ((Pi) => (diameter) => diameter * Pi)(3.14159265)(2)
        ).toBe(6.2831853)
        expect(
          ((diameter, Pi) => diameter * Pi)(2,3.14159265)
        ).toBe(6.2831853)
        expect(
          ((d) => {
            let calc = (diameter) => {
              let Pi = 3.14159265
              return diameter * Pi
            }
            return `The circumference is ${calc(d)}`
          })(2)
        ).toBe('The circumference is 6.2831853')
        expect(
          ((d) => {
            let Pi = 3.14159265,
                calc = (diameter) => diameter * Pi
            return `The circumference is ${calc(d)}`
          })(2)
        ).toBe('The circumference is 6.2831853')
      })
    })
    describe('naming functions', () => {
      it('function names', () => {
        const bindingName = function actualName() {}
        expect(bindingName).toEqual(jasmine.any(Function))
        expect(bindingName.name).toBe('actualName')
        expect(() => actualName).toThrow(new ReferenceError('actualName is not defined'))
      })
      it('function name internal binding', () => {
        const fn = function even(n) {
          return (n === 0) ? true : !even(n - 1)
        }
        expect(fn(5)).toBe(false)
        expect(fn(2)).toBe(true)
      })
    })
    describe('combinators and function decorators', () => {
      it('higher-order functions', () => {
        spyOn(console, 'log')
        const repeat = (n, f) => {
          let i,value
          for (i = 0; i < n; i++)
            value = f(i)
          return value
        }
        repeat(3,() => console.log('Hello'))
        expect(console.log).toHaveBeenCalledTimes(3)
      })
      it('combinator', () => {
        const   compose = (a, b) => (c) => a(b(c)),
                 addOne = (n) => n + 1,
               doubleOf = (n) => n * 2,
         doubleOfAddOne = (n) => doubleOf(addOne(n)),
        doubleOfAddOne2 = compose(doubleOf, addOne)
        expect(doubleOfAddOne(3)).toBe(doubleOfAddOne2(3))
      })
      it('decorators', () => {
        const not = (fn) => (arg) => !fn(arg),
        something = (x) => x != null,
          nothing = (x) => !something(x),
         nothing2 = not(something)
        expect(nothing(3)).toBe(nothing2(3))
      })
      it('composition', () => {
        const compose = (a, b) => (c) => a(b(c)),
                 cook = (food) => `cooked ${food}`,
                  eat = (food) => `eating ${food}`,
           cookAndEat = (food) => eat(cook(food)),
          cookAndEat2 = compose(eat, cook)
          expect(cookAndEat('rice')).toBe(cookAndEat2('rice'))
      })
      it('partial application', () => {
        const map = (array, fn) => array.map(fn),
          mapWith = (fn) => (array) => map(array, fn),
           square = (array) => map(array, (n) => n * n),
        squareAll = mapWith((n) => n * n)
        expect(map([1, 2, 3], (n) => n * n)).toEqual(square([1, 2, 3]))
        expect(square([1, 2, 3])).toEqual(squareAll([1, 2, 3]))
      })
    })
    describe('function arguments', () => {
      it('arguments context', () => {
        function plus (a, b) { return arguments[0] + arguments[1] }
        expect(plus(2,3)).toBe(5)
      })
      it('arguments object', () => {
        function args() { return arguments }
        expect(args(2, 3)).toEqual(jasmine.objectContaining({
          '0': 2,
          '1': 3
        }))
      })
      it('argument count', () => {
        function howMany() { return arguments.length }
        expect(howMany()).toBe(0)
        expect(howMany('hello')).toBe(1)
        expect(howMany('sharks', 'are', 'apex', 'predators')).toBe(4)
      })
    })
  })
})
