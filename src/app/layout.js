import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import { DataProvider } from '@/lib/DataContext';

export const metadata = {
  title: 'R&D TECH 공채 1기 - 배치후 육성 대시보드',
  description: 'R&D TECH 공채 1기 신입사원의 6개월 배치후 육성 계획을 관리하는 대시보드',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <DataProvider>
            {children}
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
