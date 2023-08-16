import { IStorageService } from './storage.interface';
import { MemcachedService } from './memcached.service';

export class StorageService implements IStorageService {
  private storage: IStorageService;

  constructor() {
    this.storage = new MemcachedService();
  }

  async saveIpAddress(endpoint: string, ip: string): Promise<void> {
    return this.storage.saveIpAddress(endpoint, ip);
  }

  async verifyIpAddress(endpoint: string, ip: string): Promise<boolean> {
    return this.storage.verifyIpAddress(endpoint, ip);
  }
}
