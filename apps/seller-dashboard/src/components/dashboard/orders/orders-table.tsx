"use client";

import { useState, useMemo } from "react";
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

export default function Orders() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    sortBy: "date",
    sortOrder: "desc",
  });
  const orders = [
    {
      id: "OD001",
      customer: "John Doe",
      date: "2023-06-01",
      total: 250.99,
      status: "Paid",
    },
    {
      id: "OD002",
      customer: "Jane Smith",
      date: "2023-05-15",
      total: 149.99,
      status: "Pending",
    },
    {
      id: "OD003",
      customer: "Bob Johnson",
      date: "2023-04-30",
      total: 399.99,
      status: "Shipped",
    },
    {
      id: "OD004",
      customer: "Sarah Lee",
      date: "2023-03-20",
      total: 79.99,
      status: "Cancelled",
    },
    {
      id: "OD005",
      customer: "Tom Wilson",
      date: "2023-02-10",
      total: 199.99,
      status: "Paid",
    },
    {
      id: "OD006",
      customer: "Emily Davis",
      date: "2023-01-05",
      total: 299.99,
      status: "Shipped",
    },
  ];
  const filteredOrders = useMemo(() => {
    let filtered = orders;
    if (filters.status !== "all") {
      filtered = filtered.filter((order) => order.status === filters.status);
    }
    if (filters.sortBy === "date") {
      filtered = filtered.sort((a, b) =>
        filters.sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (filters.sortBy === "total") {
      filtered = filtered.sort((a, b) =>
        filters.sortOrder === "asc" ? a.total - b.total : b.total - a.total
      );
    }
    if (search) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.customer.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  }, [orders, filters, search]);
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
              <DropdownMenuRadioItem value="Paid">Paid</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Pending">
                Pending
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Shipped">
                Shipped
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Cancelled">
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
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={filters.sortOrder}
              onValueChange={(value) =>
                setFilters({ ...filters, sortOrder: value })
              }
            >
              <DropdownMenuRadioItem value="asc">
                Ascending
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="desc">
                Descending
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
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link href="#" className="font-medium" prefetch={false}>
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Paid"
                        ? "default"
                        : order.status === "Pending"
                          ? "outline"
                          : order.status === "Shipped"
                            ? "default"
                            : "destructive"
                    }
                    className="text-xs"
                  >
                    {order.status}
                  </Badge>
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
