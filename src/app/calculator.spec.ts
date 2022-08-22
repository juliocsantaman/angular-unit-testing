import { Calculator } from "./calculator";

describe('Test for Calculator', () => {

  describe('Tests for multiply', () => {
    it('#multiply should return a nine.', () => {
      // AAA.
      // Arrange.
      const calculator = new Calculator();
      // Act.
      const response = calculator.multiply(3, 3);
      // Assert.
      expect(response).toEqual(9);

    });

    it('#multiply should return a four.', () => {
      // AAA.
      // Arrange.
      const calculator = new Calculator();
      // Act.
      const response = calculator.multiply(1, 4);
      // Assert.
      expect(response).toEqual(4);

    });
  });

  describe('Tests for divide', () => {
    it('#divide should return a some numbers.', () => {
      // AAA.
      // Arrange.
      const calculator = new Calculator();

      expect(calculator.divide(6, 3)).toEqual(2);
      expect(calculator.divide(5, 2)).toEqual(2.5);

    });

    it('#divide should return null.', () => {
      const calculator = new Calculator();

      expect(calculator.divide(6, 0)).toEqual(null);
      expect(calculator.divide(10, 0)).toBeNull();

    });

  });

  describe('Tests for matchers', () => {
    it('#test matchers', () => {
      const name = 'Julio';
      let name2;
      expect(name).toBeDefined();
      expect(name2).toBeUndefined();

      expect(1 + 3 === 4).toBeTruthy(); // 4
      expect(1 + 1 === 3).toBeFalsy();

      expect(5).toBeLessThan(10); // true
      expect(20).toBeGreaterThan(10); // true

      expect('123456').toMatch(/123/);
      expect(['apples', 'oranges', 'pears']).toContain('oranges'); // true
    });
  });

});


