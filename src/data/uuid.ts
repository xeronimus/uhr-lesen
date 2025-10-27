import {customAlphabet} from 'nanoid';

/**
 * single reference to unique id generator library.
 *
 * we use only lowercase letters, numbers and _ -
 * With the default size of 21, collisions are still rare enough. see https://zelark.github.io/nano-id-cc/
 *
 */
const customNanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz-_', 21);
export default customNanoid;
