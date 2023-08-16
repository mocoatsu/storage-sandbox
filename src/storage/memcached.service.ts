import { IStorageService } from './storage.interface';
import * as memjs from 'memjs';

const client = memjs.Client.create();

export class MemcachedService implements IStorageService {
  async saveIpAddress(endpoint: string, ip: string): Promise<void> {
    client.set(endpoint, ip, { expires: 600 });
  }

  async verifyIpAddress(endpoint: string, ip: string): Promise<boolean> {
    return new Promise((resolve) => {
      client.get(endpoint, (err, value) => {
        if (err) return resolve(false);
        resolve(value?.toString() === ip);
      });
    });
  }
}
