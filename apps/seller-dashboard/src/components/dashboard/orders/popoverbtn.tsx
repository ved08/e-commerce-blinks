"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { OrderStatus } from '@repo/db/client';
import React, { useState } from 'react'

export default function PopoverBtn({order, updateOrderStatus1}: any) {
    const [popoverState, setPopoverState] = useState(false);
    const togglePopover = () =>  {
        setPopoverState(!popoverState);
    }
  return (
    <Popover open={popoverState}>
        <PopoverTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent" onClick={togglePopover}>
            <Badge
            variant={
                order.orderstatus === "PROCESSING"
                ? "secondary"
                : order.orderstatus === "SHIPPED"
                    ? "outline"
                    : order.orderstatus === "DELIVERED"
                    ? "default"
                    : "destructive"
            }
            className="text-xs"
            >
            {order.orderstatus}
            </Badge>
        </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-0 p-4 border rounded bg-white">
        <div className="grid gap-4">
            <div className="flex flex-col">
            <Button
                className="bg-transparent hover:bg-transparent"
                onClick={() => {
                updateOrderStatus1(
                    order.id,
                    OrderStatus.PROCESSING
                );
                togglePopover()
                }}
            >
                <Badge variant="secondary">
                {OrderStatus.PROCESSING}
                </Badge>
            </Button>
            <Button
                className="bg-transparent hover:bg-transparent"
                onClick={() => {
                updateOrderStatus1(
                    order.id,
                    OrderStatus.SHIPPED
                );
                togglePopover()
                }}
            >
                <Badge variant="outline">
                {OrderStatus.SHIPPED}
                </Badge>
            </Button>
            <Button
                className="bg-transparent hover:bg-transparent"
                onClick={() => {
                updateOrderStatus1(
                    order.id,
                    OrderStatus.DELIVERED
                );
                togglePopover()
                }}
            >
                <Badge variant="default">
                {OrderStatus.DELIVERED}
                </Badge>
            </Button>
            <Button
                className="bg-transparent hover:bg-transparent"
                onClick={() => {
                updateOrderStatus1(
                    order.id,
                    OrderStatus.CANCELLED
                );
                togglePopover()
                }}
            >
                <Badge variant="destructive">
                {OrderStatus.CANCELLED}
                </Badge>
            </Button>
            </div>
        </div>
        </PopoverContent>
    </Popover>    
  )
}
