import { createUser } from './createUser';

export const addToLocalStorage = () => {
    window.localStorage.setItem('name', '');
};

export const createUserList = (users: [string, number][]) => {
    return users.map(([name, age]) => createUser(name, age));
};
