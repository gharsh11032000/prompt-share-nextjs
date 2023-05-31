import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prompt Verse | Unleash Your Creativity",
  description:
    "Welcome to PromptVerse, the ultimate platform for sharing and discovering creative prompts! Whether you're a writer, artist, or simply looking to spark your imagination, our community-driven collection of prompts will inspire you to create something amazing. Join us today and explore a universe of ideas, collaborate with other creators, and share your work with the world!",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-base-200 min-h-screen`}>
          <div className="container max-w-7xl mx-auto flex flex-col min-h-screen">
            <Header />
            <main className="pt-20">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
