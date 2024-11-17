'use client'

import { usePathname } from 'next/navigation'
import { Header } from './header'

export function HeaderWrapper() {
  const pathname = usePathname()
  
  if (pathname?.includes('admin')) {
    return null
  }

  return <Header />
} 