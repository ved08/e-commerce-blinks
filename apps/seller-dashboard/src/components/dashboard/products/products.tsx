"use client"
import { Fragment, useEffect, useState } from 'react'
import Product from './product/product'
import { getAllProducts } from '@/lib/action'
import Navbar from '../../navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PopoverButton from './product/popoverbtn';
import { useWallet } from '@solana/wallet-adapter-react';
import Loading from '@/components/Loading';

export default function Products() {
    const [products, setProducts] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { publicKey, connected } = useWallet()
    useEffect(() => {
        (async() => {
            if (!connected) return;
                console.log("world")
                console.log(publicKey?.toString)
                const data = await getAllProducts(publicKey?.toString())
                console.log(data)
                if(data.err) return;
                setProducts(data.data)
        })()
    }, [connected])

    const addNewProduct = async () => {
        // TODO HERE
    }
  return (
    <Fragment>
        <Navbar />
        {connected && publicKey ?
            <>
                <div className='grid grid-cols-3 justify-center m-5'>
                    <div>  </div>
                    <h1 className='text-4xl text-center subpixel-antialiased font-bold'>Your Products</h1>
                    <div className='justify-self-end'>
                    <Button variant="ghost" onClick={addNewProduct}><Plus />New Product</Button>
                    </div>
                </div>
                <div className='flex justify-center m-4'>
                <div className='grid gap-4 justify-center md:justify-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {products && products.map((product: any) => 
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

            </>:
            <Loading />
        }
    </Fragment>
  )
}
