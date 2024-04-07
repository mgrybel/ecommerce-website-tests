import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/utilities/api/ProductAPIHandlers';

const AdminHome = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAllProducts = async () => {
      const response = await getAllProducts();
      setProducts(response);
    };
    fetchAllProducts();
  }, []);

  return (
    <div>
      <section className='text-center container'>
        <div className='row py-lg-5'>
          <div className='col-lg-6 col-md-8 mx-auto'>
            <h1>Available Products</h1>
            <p className='text-center'>
              <Link to='/addProduct'>
                <button type='button' className='btn btn-success'>
                  Add Product
                </button>
              </Link>
            </p>
          </div>
        </div>
      </section>
      <div className='container'>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
          {products.map((product, index) => (
            <ProductCard
              imageUrl={product.imageUrl}
              key={index}
              pid={product.id}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;