import { Link, useForm } from '@inertiajs/react';
import Price from '@/Components/atoms/Price';
import Button from '@/Components/atoms/Button';

export default function ProductCard({ product }) {
  const { post, processing } = useForm();
  const thumb = product.primary_image?.image_path ?? product.images?.[0]?.image_path;

  const addToCart = () => {
    post(route('cart.add'), { 
      data: { product_id: product.id, quantity: 1 },
      preserveScroll: true 
    });
  };

  return (
    <div className="group rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link href={route('products.show', product.id)} className="block overflow-hidden h-48 lg:h-56">
        <img
          src={thumb ? `/storage/${thumb}` : 'https://placehold.co/400x400?text=No+Image'}
          alt={product.product_name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </Link>
      <div className="p-4 flex flex-col gap-2">
        {product.product_offer > 0 && (
          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full w-fit">
            {product.product_offer}% OFF
          </span>
        )}
        <h3 className="font-semibold text-gray-800 truncate">{product.product_name}</h3>
        <Price original={product.product_price} sale={product.product_sales_price} />
        <Button onClick={addToCart} loading={processing} size="sm" className="mt-2 w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
