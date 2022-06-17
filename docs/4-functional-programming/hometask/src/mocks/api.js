import accounts from './accounts.json';
import users from './users.json';
import images from './images.json';

const getImages = () => Promise.resolve(images.data);
const getUsers = () => Promise.resolve(users.data);
const getAccounts = () => Promise.resolve(accounts.data);

export { getImages, getUsers, getAccounts };
