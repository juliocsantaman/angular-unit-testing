import { Person } from "./person.model";

describe('Tests for Person', () => {
	let person: Person;
	beforeEach(() => {
		person = new Person('Julio', 'Santaman', 22, 40, 1.65);
	});

	it('Attributes', () => {
		expect(person.name).toEqual('Julio');
		expect(person.lastName).toEqual('Santaman');
		expect(person.age).toEqual(22);
		expect(person.weight).toEqual(40);
		expect(person.height).toEqual(1.65);
	});

	describe('Tests for calcIMC method', () => {
		it('should return a string: down', () => {
			// Arrange.
			person.weight = 40;
			person.height = 1.65;
			
			// Act.
			const result = person.calcIMC();

			// Assert.
			expect(result).toEqual('down');

		});
	});

});