const Footer = () => {
  return (
    <footer className="py-10 border-t border-border bg-card">
      <div className="container text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Lumina Dental. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          City, Country · +XXX-XXXX-XXXX
        </p>
      </div>
    </footer>
  );
};

export default Footer;
