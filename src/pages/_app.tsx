import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ProSidebarProvider } from "react-pro-sidebar";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ProSidebarProvider>
        <Component {...pageProps} />
      </ProSidebarProvider>
    </RecoilRoot>
  );
}
