import { IProduct } from '@/types/api';

interface IProps {
  product: IProduct;
}

export default function ProductView({ product }: IProps) {
  return (
    <div className="flex flex-col md:flex-1 w-full mb-6">
      <div className="md:flex-1">
        <h2 className="mb-2 leading-tight tracking-tight font-bold text-primary text-2xl md:text-3xl">
          {product?.title}
        </h2>
        <p className="text-gray-500 text-sm">
          Categoria:{' '}
          <a href="#" className="text-secondary hover:underline">
            {product?.category?.title}
          </a>
        </p>

        <div className="flex items-center space-x-4 my-4">
          <div>
            <div className="rounded-lg bg-gray-100 flex py-2 px-3">
              <span className="text-primary mr-1 mt-1">R$</span>
              <span className="font-bold text-secondary text-3xl">
                {product?.price}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-500">{product?.description}</p>
      </div>
    </div>
  );
}
