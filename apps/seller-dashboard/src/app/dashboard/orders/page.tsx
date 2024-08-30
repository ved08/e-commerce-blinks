import React from "react";
import OrdersTable from "@/components/dashboard/orders/orders-table";
import Navbar from "@/components/navbar/Navbar";

export default function Orders() {
  return (
    <div>
      <Navbar />
      <OrdersTable />
    </div>
  );
}
