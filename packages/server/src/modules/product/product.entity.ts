import { CategoryEntity } from '../category/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  status: boolean;

  @ManyToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.products,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @Column({ type: 'varchar', nullable: true })
  categoryId: string | null;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(product?: Partial<ProductEntity>) {
    this.id = product?.id;
    this.title = product?.title;
    this.description = product?.description;
    this.price = product?.price;
    this.status = product?.status;
    this.categoryId = product?.categoryId;
    this.createdAt = product?.createdAt;
    this.updatedAt = product?.updatedAt;
  }
}
