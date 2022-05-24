import { CategoryService } from './../modules/category/category.service';
import { ProductService } from './../modules/product/product.service';
import { Inject } from '@nestjs/common';
import { Console, Command, createSpinner } from 'nestjs-console';

@Console()
export class SeedService {
  constructor(
    @Inject(ProductService) private productService: ProductService,
    @Inject(CategoryService) private categoryService: CategoryService,
  ) {}

  @Command({
    command: 'seed',
    description: 'Seed DB',
  })
  async seed(): Promise<void> {
    const spin = createSpinner();

    spin.start('Seeding the DB');

    spin.info('Seeding Products');
    await this.seedProducts();

    spin.info('Seeding Categories');
    await this.seedCategories();

    spin.succeed('Seeding done');
  }

  async seedProducts() {
    const products = [
      {
        title: 'Tenis',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque mollis dui, id interdum arcu pharetra pellentesque. Aliquam ultrices libero diam, sit amet condimentum velit convallis nec. Vivamus commodo tortor et est viverra imperdiet. Ut eu sem urna. Morbi porta feugiat enim, quis rhoncus tellus posuere ut. Nunc condimentum libero sit amet ligula suscipit, eget commodo est tempor. Sed viverra quam nec aliquam luctus. Curabitur est lorem, aliquam nec vehicula nec, tempor maximus neque. Integer nec turpis nunc.',
        price: 20,
        status: true,
      },
      {
        title: 'Chuteira',
        description:
          'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus porta lectus a porta aliquam. Duis aliquam sodales efficitur. Nam dui neque, accumsan quis elementum quis, finibus vel ipsum. Phasellus mi nulla, congue vitae nisl euismod, condimentum dictum urna. Morbi at tortor mauris. Ut et iaculis ligula. Sed dui nisi, eleifend sed malesuada nec, condimentum ut dolor. Morbi a nisl ac metus blandit volutpat. Nam in egestas ligula, nec auctor lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id lacinia enim, non dapibus ante.',
        price: 30,
        status: true,
      },
    ];

    for (const product of products) {
      await this.productService.create(product);
    }
  }

  async seedCategories() {
    const categories = [
      {
        title: 'Nike',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque mollis dui, id interdum arcu pharetra pellentesque. Aliquam ultrices libero diam, sit amet condimentum velit convallis nec. Vivamus commodo tortor et est viverra imperdiet. Ut eu sem urna. Morbi porta feugiat enim, quis rhoncus tellus posuere ut. Nunc condimentum libero sit amet ligula suscipit, eget commodo est tempor. Sed viverra quam nec aliquam luctus. Curabitur est lorem, aliquam nec vehicula nec, tempor maximus neque. Integer nec turpis nunc.',
      },
      {
        title: 'Adidas',
        description:
          'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus porta lectus a porta aliquam. Duis aliquam sodales efficitur. Nam dui neque, accumsan quis elementum quis, finibus vel ipsum. Phasellus mi nulla, congue vitae nisl euismod, condimentum dictum urna. Morbi at tortor mauris. Ut et iaculis ligula. Sed dui nisi, eleifend sed malesuada nec, condimentum ut dolor. Morbi a nisl ac metus blandit volutpat. Nam in egestas ligula, nec auctor lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id lacinia enim, non dapibus ante.',
      },
    ];

    for (const category of categories) {
      await this.categoryService.create(category);
    }
  }
}
