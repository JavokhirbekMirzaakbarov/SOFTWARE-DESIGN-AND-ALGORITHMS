import { constant, flow, matcher, pipe, prop } from '../../src/fp/utils';
import { none, some } from '../../src/fp/maybe';

describe('utils', () => {
  it('constant returns lifted value to function', () => {
    const num10 = constant(10);

    expect(num10()).toBe(10);
  });

  it('pipe pass the first parameter to function composition', () => {
    expect(
      pipe(
        'hello,',
        (x) => x.repeat(2), // 'hello,hello,'
        (x) => x.split(','), // ['hello', 'hello', '']
        (x) => x.map(a => a.length), // [5, 5, 0]
        (x) => x.reduce((sum, a) => sum + a, 0), // 10
      )
    ).toBe(10);
  });

  it('flow composes functions', () => {
    const f = flow(
      (x: string) => x.repeat(2), // 'word,word,'
      (x) => x.split(','), // ['word', 'word', '']
      (x) => x.map(a => a.length), // [4, 4, 0]
      (x) => x.reduce((sum, a) => sum + a, 0), // 8
    );

    expect(f('word,')).toBe(8);
  });

  it('matcher performs pattern matching', () => {
    type Member = { name: string; role: string }
    const greetCaptain = (m: Member) => `Welcome aboard captain ${m.name}!`;
    const greetAdmiral = (m: Member) => `Good day admiral ${m.name}! Glad to see you here!`;
    const greetSailor = (m: Member) => `Hurry up and start working, ${m.name}!`;

    const is = (role: string) => (member: Member) => member.role === role;
    const greetMember = matcher(
      [is('captain'), greetCaptain],
      [is('admiral'), greetAdmiral],
      [is('sailor'), greetSailor],
      [constant(true), (m) => `Who are you? ${m.name}? You should not be here`]
    );

    expect(greetMember({ name: 'Raul', role: 'captain' })).toBe('Welcome aboard captain Raul!');
    expect(greetMember({ name: 'Raul', role: 'admiral' })).toBe('Good day admiral Raul! Glad to see you here!');
    expect(greetMember({ name: 'Raul', role: 'sailor' })).toBe('Hurry up and start working, Raul!');
    expect(greetMember({ name: 'Raul', role: 'peasant' })).toBe('Who are you? Raul? You should not be here');
  });

  it('prop returns the property by the passed key', () => {
    const getAge = prop('age');

    expect(getAge({ age: 10 })).toStrictEqual(some(10));
    expect(getAge({ name: 'hello' })).toStrictEqual(none);
  });
});
