import Footer from "../ui/footer";
import NavBar from "../ui/nav-bar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen dark:bg-dark-elevation flex flex-col items-center">
      <NavBar />
      <div className="w-full dark:text-dark-primary">{children}</div>
      <Footer />
    </div>
  );
}
