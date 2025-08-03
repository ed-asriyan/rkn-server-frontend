import { AbstractStore } from './abstract-store';

export interface User {
    uuid: string;
    parentUuid: string;
    createdAt: Date;
    name: string;
}

export class UsersStore extends AbstractStore<User, 'uuid'> {
  constructor() {
    super(['uuid'], []);
  }
}
