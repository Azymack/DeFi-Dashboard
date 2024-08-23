import NavBar from "../ui/nav-bar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <body className={`${inter.className} dark`}>{children}</body>
    // </html>
    <div className="min-h-screen dark:bg-dark-elevation flex flex-col items-center">
      <NavBar />
      <div className="dark:text-dark-primary">{children}</div>
    </div>
  );
}
