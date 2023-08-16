export interface IStorageService {
  saveIpAddress(endpoint: string, ip: string): Promise<void>;
  verifyIpAddress(endpoint: string, ip: string): Promise<boolean>;
}
