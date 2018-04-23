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
      
    })
  })
})
