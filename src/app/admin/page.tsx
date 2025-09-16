'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para o painel do Decap CMS
    router.push('/admin/index.html');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white text-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecionando para o painel administrativo...</p>
      </div>
    </div>
  );
}
