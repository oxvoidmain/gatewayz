"use client"
import { PrivyProviderWrapper } from '@/components/providers/privy-provider';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { Toaster } from "@/components/ui/toaster";
export default function ClientLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <PrivyProviderWrapper>
            <AppHeader />
            {children}
            <Toaster />
            <AppFooter />
        </PrivyProviderWrapper>
    )
  }