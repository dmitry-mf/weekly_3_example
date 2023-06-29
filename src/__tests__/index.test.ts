import * as createUserModule from '../pages/createUser';
import { addToLocalStorage, createUserList } from '../pages/createUserList';

jest.mock('../pages/createUser', () => ({
    createUser: jest.fn(),
}));

const createUserMock = createUserModule.createUser as jest.Mock;

describe('src index tests', () => {
    it('first test example', () => {
        expect('hello world').toBe('hello world');
    });

    describe('additional test', () => {
        it.each([
            ['test1', 'test1 result'],
            ['test2', 'test2 result'],
        ])('each tests', (value, result) => {
            expect(`${value} result`).toBe(result);
        });

        it('expect methods', () => {
            expect({ name: '', age: 1 }).toStrictEqual({ name: '', age: 1 });

            expect({ name: '', age: 1, roles: { isAdmin: false, isUser: true } }).toStrictEqual(
                expect.objectContaining({ roles: { isAdmin: false, isUser: true } })
            );

            expect({}).toStrictEqual(expect.any(Object));

            const fn = () => null;
            expect(fn).toStrictEqual(expect.any(Function));
        });
    });

    describe('jest.fn() examples', () => {
        const fooMock = jest.fn();

        // app api
        const foo = () => ({ name: 'name', age: 10 });

        const fetchData = (callback: (data: { data: string }) => { name: string; age: number }) =>
            callback && callback({ data: 'name' });

        fetchData(foo);
        //

        // afterEach()
        // beforeEach()
        // afterAll()
        // beforeAll()

        afterEach(() => {
            // fooMock.mockClear();
            jest.clearAllMocks();
        });

        it('test for fetchData', () => {
            fetchData(fooMock);
            expect(fooMock).toHaveBeenCalledTimes(1);
            expect(fooMock).toHaveBeenCalledWith({ data: 'name' });
            expect(fooMock).toHaveBeenNthCalledWith(1, { data: 'name' });
        });

        it('test for fetchData return value', () => {
            fooMock.mockReturnValue({ name: 'vasya', age: 10 });
            const result = fetchData(fooMock);

            expect(fooMock).toHaveBeenCalledTimes(1);
            expect(fooMock).toHaveBeenCalledWith({ data: 'name' });
            expect(result).toStrictEqual({ name: 'vasya', age: 10 });
        });

        it('test for fetchData return value once', () => {
            fooMock.mockReturnValueOnce({ name: 'petya', age: 15 });
            const result = fetchData(fooMock);

            expect(fooMock).toHaveBeenCalledTimes(1);
            expect(fooMock).toHaveBeenCalledWith({ data: 'name' });
            expect(result).toStrictEqual({ name: 'petya', age: 15 });

            const result2 = fetchData(fooMock);
            expect(result2).toStrictEqual({ name: 'vasya', age: 10 });
        });

        it('test for fetchData return mockImplementation', () => {
            fooMock.mockImplementation(() => ({ name: 'name', age: 151 }));
            const result = fetchData(fooMock);

            expect(result).toStrictEqual({ name: 'name', age: 151 });
        });
    });

    describe('tests for users', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('test for createUserList', () => {
            const result = createUserList([
                ['name', 10],
                ['name2', 11],
            ]);

            expect(createUserMock).toHaveBeenCalledTimes(2);
        });

        it('test for createUserList spyOn', () => {
            const createUserSpyMock = jest.spyOn(createUserModule, 'createUser');

            createUserList([
                ['name', 10],
                ['name2', 11],
            ]);

            expect(createUserSpyMock).toHaveBeenCalledTimes(2);
        });

        it('test for setToLocalStorage', () => {
            Object.defineProperty(window, 'localStorage', {
                value: {
                    getItem: jest.fn(),
                    setItem: jest.fn(),
                    removeItem: jest.fn(),
                },
            });

            addToLocalStorage();

            expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
        });
    });
});
