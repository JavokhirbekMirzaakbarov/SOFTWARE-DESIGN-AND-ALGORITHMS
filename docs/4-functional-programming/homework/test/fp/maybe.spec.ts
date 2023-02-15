import { fold, fromNullable, getOrElse, none, Some, some } from '../../src/fp/maybe';

describe('Maybe algebraic type', () => {

  describe('fromNullable', () => {
    it('returns some of A if value is not null', () => {
      expect(fromNullable(10)).toStrictEqual(some(10));
    });

    it('returns none if value is null', () => {
      expect(fromNullable(null)).toStrictEqual(none);
    });
  });

  describe('getOrElse', () => {
    const orGoodbye = getOrElse(() => 'goodbye');

    it('returns content of some in case of some', () => {
      const value = some('hello');
      expect(orGoodbye(value)).toBe('hello');
    });

    it('returns result of onNone in case of none', () => {
      expect(orGoodbye(none)).toBe('goodbye');
    });
  });

  describe('fold', () => {
    type Guest = {
      name: string;
      from: string;
    }

    const greet = fold<Guest, string>(
      () => 'Guest is not here :(',
      (guest) => `Greeting in our town, ${guest.name}! How the weather in ${guest.from}`
    );

    it('returns the result of onSome in case of some', () => {
      const guest: Some<Guest> = some({
        name: 'Gregor',
        from: 'New York',
      });
      expect(greet(guest)).toBe('Greeting in our town, Gregor! How the weather in New York');
    });

    it('returns the result of onNone in case of none', () => {
      expect(greet(none)).toBe('Guest is not here :(');
    });
  });
});
