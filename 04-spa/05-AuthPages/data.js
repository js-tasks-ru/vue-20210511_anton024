/** URL адрес API */
export const API_URL = 'https://course-vue.javascript.ru/api';

/**
 * @typedef SuccessUserResult ({
 *    id: number,
 *    fullname: string,
 *    email: string,
 *    avatar?: string
 *  })
 * @description Успешный ответ сервера с данными пользователя
 */

/**
 * @typedef FailResult ({
 *   statusCode: number,
 *   message: string,
 *   error: string
 * })
 * @description Ответ сервера с информацией об ошибке
 */

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise<(SuccessUserResult|FailResult)>} - ответ с сервера, данные пользователя или объект с ошибкой
 */
export async function login(email, password) {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
}

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} fullname - полное имя пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise<(SuccessUserResult|FailResult)>} - ответ с сервера, данные пользователя или объект с ошибкой
 */
export async function register(email, fullname, password) {
  return fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, fullname, password }),
  }).then((res) => res.json());
}
