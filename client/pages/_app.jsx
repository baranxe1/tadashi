import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

// icons
import { AiFillCaretUp as UpArrowIcon } from "react-icons/ai";
import { useEffect, useState } from "react";

const App = ({ Component, pageProps, router }) => {
  const url = `http://localhost:3000/${router.route}`;
  const [showButton, setShowButton] = useState(false);
  const scrollToTop = () => window.scrollTo(0, 0);
  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 500) setShowButton(true);
      else setShowButton(false);
    };
    [showButton];
  });

  return (
    <ThemeProvider attribute="class">
      <NextNProgress />
      <AuthProvider>
        <ToastContainer />
        <Head>
          <link rel="icon" href="/images/logo.png" type="image/icon" />
        </Head>
        <DefaultSeo
          titleTemplate="Tadashi | %s"
          openGraph={{
            type: "website",
            locale: "en_IE",
            title: "Tadashi | Home",
            url,
            description:
              "Tadashi is a online web application for downloading instagram posts",
            site_name: "Tadashi | Home",
            images: [
              {
                url: "/images/open-graph.jpg",
                width: 1200,
                height: 630,
                alt: "Tadashi Logo",
              },
            ],
          }}
          canonical={url}
        />
        <Header />
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} canonical={url} key={url} />
        </AnimatePresence>
        <Footer />
      </AuthProvider>
      {showButton && (
        <button
          type="button"
          className="fixed bottom-4 right-4 z-50 bg-primary-500 text-white dark:bg-dark-300 aspect-square p-4 border-dark-900 shadow-lg rounded-full"
          onClick={scrollToTop}
        >
          <UpArrowIcon />
        </button>
      )}
    </ThemeProvider>
  );
};

export default App;
