import { Controller, Get, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import * as memjs from 'memjs';

const client = memjs.Client.create();

const setMemcachedValue = (key: string, value: string) => {
  return new Promise<void>((resolve, reject) => {
    client.set(key, value, { expires: 600 }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

const getMemcachedValue = (key: string) => {
  return new Promise<string | null>((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) reject(err);
      else resolve(value?.toString() || null);
    });
  });
};

@Controller()
export class AppController {
  @Get('open-schedule')
  async openSchedule(@Req() request: Request) {
    const ip = request.ip;
    const key = `open-schedule:${ip}`;
    await setMemcachedValue(key, 'true');
    return `Schedule opened by IP ${ip}`;
  }

  @Get('book-lesson')
  async bookLesson(@Req() request: Request) {
    const ip = request.ip;
    const key = `open-schedule:${ip}`;
    const value = await getMemcachedValue(key);

    if (value) {
      const message = `Unauthorized access by IP ${ip}`;
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }

    return `Lesson booked by IP ${ip}`;
  }
}
