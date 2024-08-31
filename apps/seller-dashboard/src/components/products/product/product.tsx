import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getAllProducts } from '@/lib/action'
import React, { useEffect } from 'react'
import PopoverButton from './popoverbtn'

export default function Product(props: {
    name: string,
    title: string,
    description: string,
    imageUrl: string,
    price: string,
    stock: string,
    id: string,
    label: string
}) {
  return (
        <Card className="w-[250px] h-fit">
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.name}</CardDescription>
            </CardHeader>
            <CardContent>
                <img src={props.imageUrl}/>
                <CardDescription>{props.label}</CardDescription>
                <CardDescription>{props.description}</CardDescription>
                <p>Price: {props.price}</p>
                <p>In Stock: {props.stock}</p>
                <PopoverButton props={props}/>
            </CardContent>
        </Card>
  )
}
