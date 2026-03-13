import { AbstractStore } from './abstract-store';

export interface User {
    id: string;
    parentId: string;
    createdAt: Date;
    name: string;
}

export class UsersStore extends AbstractStore<User, 'id'> {
  constructor() {
    super(['id'], []);
  }
}
