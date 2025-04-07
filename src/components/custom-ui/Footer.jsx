export default function Footer() {
    return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">
            © 2025 BlogApp. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary">
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
    )
}