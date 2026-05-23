import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-[hsl(var(--glass-border))] section-padding py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="text-lg font-bold gradient-text">
            Joseph.dev
          </Link>
          <p className="text-sm text-muted-foreground">
            Full Stack Developer — Building scalable systems & intelligent platforms.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/josephdev934"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:akujiezejoseph@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Joseph. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
