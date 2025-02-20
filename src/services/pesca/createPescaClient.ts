/* eslint-disable no-console */
import { PescaClient } from '@moneyboy/api/PescaClient';
import { HttpClient } from '@moneyboy/services/networking/httpClient';
import EncryptedStorage from 'react-native-encrypted-storage';

const constants = {
  storage: {
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    user: 'user',
  },
};

/**
 * Create a new Parse Client.
 * @param appName name of the app to connect to
 * @param url url of the app
 * @returns a new instance of a Parse Client
 */
export const createPescaClient = (url: string): PescaClient => {
  const httpClient = new HttpClient(url, constants, EncryptedStorage);

  async function login(username: string, password: string): Promise<MaybeError<boolean>> {
    const body = JSON.stringify({
      username,
      password,
    });
    const result = await httpClient.request('auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    if (result?.status !== 201) {
      return [false, result?.status === 401 ? 'Invalid username/password' : 'Internal error'];
    }

    const tokens: Pesca.LoginReturnDTO = await result.json();
    await EncryptedStorage.setItem(constants.storage.access_token, tokens.access_token).catch(console.error);
    await EncryptedStorage.setItem(constants.storage.refresh_token, tokens.refresh_token).catch(console.error);
    return [true];
  }

  async function logout(): Promise<void> {
    await httpClient.requestWithAuth('auth/logout', {
      method: 'DELETE',
    });
    await EncryptedStorage.removeItem(constants.storage.access_token).catch(() => null);
    await EncryptedStorage.removeItem(constants.storage.refresh_token).catch(() => null);
    await EncryptedStorage.removeItem(constants.storage.user).catch(() => null);
  }

  async function register(data: Pesca.RegistrationPayload): Promise<MaybeError<boolean>> {
    const payload: Pesca.RegistrationPayload = data;

    const result = await httpClient.request('auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (result?.status === 202) {
      return [true];
    }

    return [false, (await result?.json())?.message ?? 'Error during registration'];
  }

  async function getUser(): Promise<Pesca.UserProfileInformation | null> {
    const result = await httpClient.requestWithAuth('users/profile', {});
    let user: Pesca.UserProfileInformation | null = null;
    if (result?.status === 200) {
      user = await result.json();
      // store current user in memory
      await EncryptedStorage.setItem(constants.storage.user, JSON.stringify(user)).catch(console.error);
    } else if (result?.status !== 401) {
      // if we have no connection or another error happens (but we are NOT unauthorized), we use cached user
      const userJSON = await EncryptedStorage.getItem(constants.storage.user).catch(() => null);
      if (userJSON) {
        try {
          user = JSON.parse(userJSON);
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      // if we are unauthorized, we simply delete all stored data, so we leave nothing behind after a logout
      await EncryptedStorage.removeItem(constants.storage.access_token).catch(() => null);
      await EncryptedStorage.removeItem(constants.storage.refresh_token).catch(() => null);
      await EncryptedStorage.removeItem(constants.storage.user).catch(() => null);
    }
    return user;
  }

  async function getUsers(): Promise<Pesca.UserInformation[] | null> {
    const result = await httpClient.requestWithAuth('/users', {});
    if (result?.status === 200) {
      return result.json();
    }
    return null;
  }

  const payments = {
    create: async (payment: Pesca.PaymentCreateDTO): Promise<boolean> => {
      const result = await httpClient.requestWithAuth('payments', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment),
      });
      return result?.status === 201;
    },
    getAll: async (): Promise<Pesca.PaymentInformation[] | null> => {
      const result = await httpClient.requestWithAuth('payments', {});
      if (result?.status === 200) {
        return result.json().then((fetchedPayments: Pesca.PaymentInformation[]) =>
          fetchedPayments.map(p => ({
            ...p,
            date: parseInt(p.date as unknown as string, 10),
          })),
        );
      }
      return null;
    },
  };

  return Object.freeze<PescaClient>({
    login,
    logout,
    register,
    getUser,
    getUsers,
    payments,
  });
};
