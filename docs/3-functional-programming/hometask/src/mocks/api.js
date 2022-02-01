import accounts from './accounts.json';
import users from "./users.json";
import images from "./images.json";

const getImages = () => new Promise(resolve => resolve(images.data));
const getUsers = () => new Promise((resolve) => resolve(users.data));
const getAccounts = () => new Promise((resolve) => resolve(accounts.data));

export { getImages, getUsers, getAccounts };
