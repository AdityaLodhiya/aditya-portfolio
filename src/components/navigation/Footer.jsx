import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-text2">ADITYA // SYSTEM</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/AdityaLodhiya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text2 hover:text-text transition-colors font-mono text-xs"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aditya-lodhiya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text2 hover:text-text transition-colors font-mono text-xs"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="mailto:adityalodhiya111@gmail.com"
              className="text-text2 hover:text-text transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-text3">SYSTEM STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
