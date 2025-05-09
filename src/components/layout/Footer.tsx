export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted/50 border-t border-border py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} IntelliApply. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          AI-Powered Resume & Cover Letter Generation
        </p>
      </div>
    </footer>
  );
}
