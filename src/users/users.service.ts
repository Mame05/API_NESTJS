import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Define a User interface
interface User {
  id: number;
  name: string;
  email: string;
  // Add other properties as needed
}
@Injectable()
export class UsersService {
  private users: User[] = [];
  private currentId = 1; // Compteur pour les IDs

  create(createUserDto: CreateUserDto): User {
    const user: User = { 
      id: this.currentId++, // Incrémente après utilisation
      ...createUserDto 
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[]  {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): User | null  {
     const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;

    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }

  remove(id: number): User | null  {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;
    return this.users.splice(index, 1)[0];
  }
}
