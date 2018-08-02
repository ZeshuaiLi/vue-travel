const SS = sessionStorage;
const LS = localStorage;
const DELIMITER = '||||||';
/** @function Decode 解码数据
 * @param {any} data 数据
 */
const Decode = (data) => {
  if (data) {
    const arr = data.split(DELIMITER)
    const type = arr[0];
    data = arr[1];
    if (type === '2') {
      data = JSON.parse(data);
    }
  }
  return data;
}
/** @function Encode 加码数据
 * @param {any} data 数据
 * @returns {string} 数据字符串
 */
const Encode = (data) => {
  if (typeof data !== 'string') {
    return '2' + DELIMITER + JSON.stringify(data)
  } else {
    return '1' + DELIMITER + data
  }
}
/** @function ProxySet 获取数据
 * @param {localStorage | sessionStorage} session 数据
 * @param {string} key key
 * @param {any} data 数据
 * @returns {string} 数据字符串
 */
const ProxySet = (session, key, data) => {
  session.setItem(key, Encode(data))
}
/** @function ProxyGet 存储数据
 * @param {localStorage | sessionStorage} session 数据
 * @param {string} key 数据
 * @returns {any} 数据字符串
 */
const ProxyGet = (session, key) => {
  let data = session.getItem(key);
  if (data) {
    data = Decode(data);
  }
  return data
}
/** @function ProxyRemove 存储数据
 * @param {localStorage | sessionStorage} session 数据
 * @param {string} key 数据
 */
const ProxyRemove = (session, key) => {
  return session.removeItem(key);
}
/** @function SSet 存储数据
 * @param {string} key 数据
 * @param {any} data 数据
 */
export const SSet = (key, data) => {
  return ProxySet(SS, key, data)
}
/** @function SGet 获取数据
 * @param {string} key
 * @returns {any} 数据
 */
export const SGet = (key) => {
  return ProxyGet(SS, key)
}
/** @function SRemove 获取数据
 * @param {string} key
 */
export const SRemove = (key) => {
  return ProxyRemove(SS, key)
}
/** @function LSet 存储数据
 * @param {string} key 数据
 */
export const LSet = (key, data) => {
  return ProxySet(LS, key, data)
}
/** @function LGet 获取数据
 * @param {string} key 数据
 * @returns {any} 数据
 */
export const LGet = (key) => {
  return ProxyGet(LS, key)
}
/** @function SRemove 获取数据
 * @param {string} key
 */
export const LRemove = (key) => {
  return ProxyRemove(LS, key)
}
