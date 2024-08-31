"use client"
import { Fragment, useEffect, useState } from 'react'
import Product from './product/product'
import { getAllProducts } from '@/lib/action'
import Navbar from '../navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PopoverButton from './product/popoverbtn';

export default function Products() {
    const [products, setProducts] = useState<any>(null);
    useEffect(() => {
        (async() => {
            const data = await getAllProducts()
            console.log(data)
            setProducts(data)
        })()
    }, [])
  return (
    <Fragment>
        <Navbar />
        <div className='grid grid-cols-3 justify-center m-5'>
            <div>  </div>
            <h1 className='text-4xl text-center subpixel-antialiased font-bold'>Your Products</h1>
            <div className='justify-self-end'>
            <Button variant="ghost"><Plus />New Product</Button>
            </div>
        </div>
        <div className='flex justify-center m-4'>
        <div className='grid gap-4 justify-center md:justify-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products && products.data.map((product: any) => 
            <Product 
            title={product.title} 
            description={product.description}
            imageUrl={product.imageUrl}
            price={product.price}
            stock={product.stock}
            name={product.name}
            id = {product.id}
            label = {product.label}
            />)}
        </div>
        </div>
    </Fragment>
  )
}
