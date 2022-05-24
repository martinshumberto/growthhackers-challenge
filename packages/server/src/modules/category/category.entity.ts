import { ProductEntity } from '../product/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.category)
  products: ProductEntity[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(category?: Partial<CategoryEntity>) {
    this.id = category?.id;
    this.title = category?.title;
    this.description = category?.description;
    this.createdAt = category?.createdAt;
    this.updatedAt = category?.updatedAt;
  }
}
