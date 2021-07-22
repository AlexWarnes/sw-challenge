import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { UtilService } from "./util.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private UTIL: UtilService) { }

  generateRandomUser(): User {
    return {
      id: this.UTIL.generateUUID(),
      name: "AlexTest",
      age: Math.floor(Math.random() * 100),
      weight: 50 + Math.floor(Math.random() * 100),
    }
  }
}
