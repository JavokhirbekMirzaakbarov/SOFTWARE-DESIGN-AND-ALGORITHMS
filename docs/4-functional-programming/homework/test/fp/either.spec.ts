import { ap, Either, flatten, fold, fromPromise, getOrElse, left, map, right } from '../../src/fp/either';
import { pipe } from '../../src/fp/utils';

describe('Either algebraic type', () => {
  type Person = { name: string }

  describe('map', () => {
    it('maps the right value from A to B', () => {
      const user = right({ name: 'Gregor' });
      const toName = map((person: Person) => person.name);

      expect(
        toName(user)
      ).toStrictEqual(right('Gregor'));
    });
  });

  describe('getOrElse', () => {
    const showContent = getOrElse((redirectURL) => `Sorry, but content was moved to ${redirectURL}`);

    it('returns content of the right in case of right', () => {
      const content = right('Some fancy content');
      expect(showContent(content)).toBe('Some fancy content');
    });

    it('returns content of onLeft in case of left', () => {
      const content = left('https://example.com/moved-content');
      expect(showContent(content)).toBe('Sorry, but content was moved to https://example.com/moved-content');
    });
  });

  describe('fold', () => {
    type Error<E> = { error: E, code: number }
    type Data<A> = { data: A, pages: number, page: number }

    type User = { name: string, level: number }
    type Response = Either<Error<string>, Data<Array<User>>>

    const codeToMessage = {
      [404]: 'No users yet',
      [503]: 'You have no rights to see this list'
    };

    const getListOfUsers = fold(
      ({ error, code }: Error<string>) => `${error}: ${codeToMessage[code]}`,
      ({ data, pages, page }: Data<Array<User>>) => `Page ${page} of ${pages}
${data.map((user, i) => `[${i}] ${user.name} | LEVEL: ${user.level}`).join('\n')}
`
    );

    it('returns content of onRight in case of right', () => {
      const response: Response = right({
        data: [{ name: 'George', level: 10 }, { name: 'Paul', level: 2 }],
        pages: 10,
        page: 1,
      });

      expect(getListOfUsers(response)).toBe(`Page 1 of 10
[0] George | LEVEL: 10
[1] Paul | LEVEL: 2
`);
    });

    it('returns content of onLeft in case of left', () => {
      const response404: Response = left({ error: 'not found', code: 404 });
      const response503: Response = left({ error: 'forbidden', code: 503 });

      expect(getListOfUsers(response404)).toBe('not found: No users yet');
      expect(getListOfUsers(response503)).toBe('forbidden: You have no rights to see this list');
    });
  });

  describe('ap', () => {
    const concat = (list: Array<number>) => (list2: Array<number>) => list.concat(list2);

    it('apply parameters to the 2-ary function', () => {
      expect(
        pipe(
          right(concat),
          ap(right([1, 2, 3])),
          ap(right([4, 5, 6])),
        )
      ).toStrictEqual(right([1, 2, 3, 4, 5, 6]));
    });

    it('returns left value of the first parameter', () => {
      expect(
        pipe(
          right(concat),
          ap(left('the first parameter is not an array')),
          ap(right([4, 5, 6])),
        )
      ).toStrictEqual(left('the first parameter is not an array'));
    });

    it('returns left value of the second parameter', () => {
      expect(
        pipe(
          right(concat),
          ap(right([1, 2, 3])),
          ap(left('the second parameter is not an array')),
        )
      ).toStrictEqual(left('the second parameter is not an array'));
    });
  });

  describe('flatten', () => {
    type User = {
      name: string,
      role: string
    }
    type List = Array<{ payload: string }>
    const getList = (user: User): Either<string, List> => user.role === 'admin'
      ? right([{ payload: 'secret info 1' }, { payload: 'secret info 2' }])
      : left('This information is only for admins');

    const adminMock: User = {
      name: 'admin',
      role: 'admin',
    };
    const userMock: User = {
      name: 'George',
      role: 'user',
    };
    const fetchUserAdmin = (): Either<string, User> => right(adminMock);
    const fetchUser = (): Either<string, User> => right(userMock);
    const fetchUserError = (): Either<string, User> => left('cannot fetch user');

    it('flatten the value', () => {
      const admin = fetchUserAdmin();
      const user = fetchUser();

      expect(pipe(admin, map(getList), flatten))
        .toStrictEqual(right([{ payload: 'secret info 1' }, { payload: 'secret info 2' }]));

      expect(pipe(user, map(getList), flatten))
        .toStrictEqual(left('This information is only for admins'));

      expect(pipe(fetchUserError(), map(getList), flatten))
        .toStrictEqual(left('cannot fetch user'));
    });
  });

  describe('fromPromise', () => {
    it('returns right or left instance based on promise result', () => {
      const resolved = Promise.resolve(10);
      const rejected = Promise.reject(10);

      return Promise.all([fromPromise(resolved), fromPromise(rejected)])
        .then(([resolved, rejected]) => {
          expect(resolved).toStrictEqual(right(10));
          expect(rejected).toStrictEqual(left(10));
        });
    });
  });
});
