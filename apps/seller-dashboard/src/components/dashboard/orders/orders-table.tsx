"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Label } from "@/components/ui/label";
import { useWallet } from "@solana/wallet-adapter-react";
import { getOrderBySeller, updateOrderStatus } from "@/lib/action";
import { ProductSchema, UserSchema } from "@/lib/validation";
import { OrderStatus, Product, User } from "@repo/db/client";
import { useRouter } from "next/navigation";

interface Order {
  id: string,
  name: string,
  city: string,
  state: string,
  dropOfAddress: string,
  ZipCode: string,
  orderstatus: OrderStatus,
  buyerWallet: string,
  productId: string,
  user: User,
  product: Product,
}
export default function Orders() {
  const router=useRouter();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    sortBy: "date",
    sortOrder: "desc",
  });
  const [nothing, setDoNothing] = useState<number>(0)

  const [orders1, setOrders] = useState<Order[]>();

  const { connected, publicKey } = useWallet()
  useEffect(() => {
    (async() => {
      if (!publicKey) return;
      const data = await getOrderBySeller(publicKey.toString())
      if(data.err) return;
      setOrders(data.data)
    })()
  }, [])
  // const orders = [
  //   {
  //     id: "OD001",
  //     name: "John Doe",
  //     date: "2023-06-01",
  //     total: 250.99,
  //     orderstatus: "PROCESSING",
  //     ZipCode: "12345",
  //     buyerWallet: "1234567890",
  //     city: "New York",
  //     dropOfAddress: "1234, 5th Avenue",
  //     product: ProductSchema,
  //     productId: "123456",
  //     state: "NY",
  //     user: UserSchema
  //   }
  // ];
  const updateOrderStatus1 = async(orderId: string, newStatus: OrderStatus) => {
    let orderId1 = `fe6c63ed-21e1-438d-bb46-4a26ff956b3a`
    let orderId2 = orderId
    console.log(orderId2)
    const message = await updateOrderStatus(orderId1, newStatus);
    console.log("CLickeddd")
    console.log(message)
  }
  const filteredOrders = useMemo(() => {
    let filtered = orders1;
    if(filtered === undefined) return [];
    if (filters.status !== "all") {
      filtered = filtered.filter((order) => order.orderstatus === filters.status);
    }
    /// TODOoooooooo
    if (filters.sortBy === "date") {
      filtered = filtered.sort((a, b) =>
        filters.sortOrder === "asc"
          ? new Date(a.product.createdAt).getTime() - new Date(b.product.createdAt).getTime()
          : new Date(b.product.createdAt).getTime() - new Date(a.product.createdAt).getTime()
      );
    } else if (filters.sortBy === "total") {
      filtered = filtered.sort((a, b) =>
        filters.sortOrder === "asc" ? Number(a.product.price) - Number(b.product.price) : Number(b.product.price) - Number(a.product.price)
      );
    }
    if (search) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  }, [orders1, filters, search]);
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="w-full rounded-lg bg-background pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shrink-0">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]" align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={filters.status}
              onValueChange={(value) =>
                setFilters({ ...filters, status: value })
              }
            >
              <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="PROCESSING">
                Processing
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="SHIPPED">
                Shipped
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="DELIVERED">
                Delivered
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="CANCELLED">
                Cancelled
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters({ ...filters, sortBy: value })
              }
            >
              <DropdownMenuRadioItem value="date">
                Sort by Date
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="total">
                Sort by Total
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup> 
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Wallet</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders && filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                    {order.id}
                </TableCell>
                <TableCell>{order.productId}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.product.createdAt.toDateString()}</TableCell>
                <TableCell>${order.product.price}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="bg-transparent hover:bg-transparent">
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
                        <Button className="bg-transparent hover:bg-transparent" onClick={() => {updateOrderStatus1(order.id, OrderStatus.PROCESSING)}}>
                          <Badge  variant="secondary">{OrderStatus.PROCESSING}</Badge>
                        </Button>
                        <Button className="bg-transparent hover:bg-transparent" onClick={() => {updateOrderStatus1(order.id, OrderStatus.SHIPPED)}}>
                          <Badge  variant="outline">{OrderStatus.SHIPPED}</Badge>
                        </Button>
                        <Button className="bg-transparent hover:bg-transparent" onClick={() => {updateOrderStatus1(order.id, OrderStatus.DELIVERED)}}>
                          <Badge  variant="default">{OrderStatus.DELIVERED}</Badge>
                        </Button>
                        <Button className="bg-transparent hover:bg-transparent" onClick={() => {updateOrderStatus1(order.id, OrderStatus.CANCELLED)}}>
                          <Badge  variant="destructive">{OrderStatus.CANCELLED}</Badge>
                        </Button>
                      </div>
                    </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function FilterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
