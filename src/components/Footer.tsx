import logo from "/public/CuraNookFooterLogo.png";

export function Footer() {
  return (
    <footer className="w-full py-4 flex items-center justify-center gap-2 text-sm text-gray-500 border-t">
      <img src={logo} alt="CuraNook logo" className="h-6 w-6 rounded" />
      <span>
        &copy; {new Date().getFullYear()} CuraNook. All rights reserved.
      </span>
    </footer>
  );
}
