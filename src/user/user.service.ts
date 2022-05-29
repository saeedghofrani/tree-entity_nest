import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(body: Object) {
    const user = this.userRepository.create(body);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await getManager().getTreeRepository(User).findTrees({ depth: 5 });
  }

  async findParrents() {
    return await getManager().getTreeRepository(User).findRoots({ depth: 5 });
  }

  async findChild(id: number) {
    const parrent = await this.userRepository.findOne(id);
    return await getManager().getTreeRepository(User).findDescendants(parrent);
  }

  async findParrent(id: number) {
    const child = await this.userRepository.findOne(id);
    return await getManager().getTreeRepository(User).findAncestors(child);
  }
}
