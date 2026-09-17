'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export function CartLink({ className, style }: { className?: string, style?: React.CSSProperties }) {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <Link href="/cart" className={className} style={style}>
      Cart {mounted && cartCount > 0 && `(${cartCount})`}
    </Link>
  );
}
