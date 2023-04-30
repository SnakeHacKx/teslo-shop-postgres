import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // @InjectRepository(Product)
    // private readonly productRepository: Repository<Product>,
    // @InjectRepository(ProductImage)
    // private readonly productImageRepository: Repository<ProductImage>,
  ) { }

  async runSeed() {
    await this.deleteTables();

    const adminUser = await this.insertUsers();

    await this.insertProducts(adminUser);

    return 'SEED EXECUTED SUCCESSFULY';
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];

    seedUsers.forEach(user => {
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0];
  }
  
  /**
   * Inserta porductos semilla a la base de datos
   * @param user Usuario generado por el seed que a su vez se utiliza para generar los productos
   */
  private async insertProducts(user: User) {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach(product => {
      insertPromises.push(this.productsService.create(product, user));
    });

    await Promise.all(insertPromises);
    
    return true;
  }
}