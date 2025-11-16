"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Barcode, Plus, Minus, Trash2, Percent, Printer, CreditCard, Smartphone, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function POSPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock products
  const products = [
    { id: 1, name: "Product A", price: 50, stock: 100, barcode: "1234567890" },
    { id: 2, name: "Product B", price: 75, stock: 50, barcode: "1234567891" },
    { id: 3, name: "Product C", price: 30, stock: 200, barcode: "1234567892" },
    { id: 4, name: "Product D", price: 100, stock: 75, barcode: "1234567893" },
  ];

  const addToCart = (product: any) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const discount = 0;
  const total = subtotal + tax - discount;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Point of Sale</h1>
        <p className="text-gray-600 mt-1">Process sales and manage transactions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Products Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search & Barcode */}
          <Card>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products or scan barcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <Button variant="outline" leftIcon={<Barcode className="w-4 h-4" />}>
                Scan
              </Button>
            </div>
          </Card>

          {/* Products Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products
                .filter((product) =>
                  product.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
                  >
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{formatCurrency(product.price)}</div>
                    <div className="text-xs text-gray-500 mt-1">Stock: {product.stock}</div>
                  </button>
                ))}
            </div>
          </Card>
        </div>

        {/* Cart Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cart ({cart.length})</CardTitle>
            </CardHeader>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-600">{formatCurrency(item.price)} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-red-100 rounded ml-2"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" leftIcon={<Percent size={14} />} />
                  <span className="font-medium">{formatCurrency(discount)}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" leftIcon={<CreditCard size={18} />}>
                Card
              </Button>
              <Button variant="outline" leftIcon={<Wallet size={18} />}>
                Cash
              </Button>
              <Button variant="outline" leftIcon={<Smartphone size={18} />}>
                Mobile
              </Button>
              <Button variant="outline" leftIcon={<Smartphone size={18} />}>
                QR Pay
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <Button variant="primary" fullWidth>
                Process Payment
              </Button>
              <Button variant="outline" fullWidth leftIcon={<Printer className="w-4 h-4" />}>
                Print Receipt
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

