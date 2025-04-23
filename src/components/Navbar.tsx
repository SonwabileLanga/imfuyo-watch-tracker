
import { Link } from "react-router-dom";
import { Bell, MapPin, Database, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-card border-b border-border z-10 shadow-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-primary text-xl font-bold">imFuyo</span>
          <span className="bg-primary text-primary-foreground px-2 rounded-md text-xs">YAM</span>
        </Link>

        <div className="md:hidden flex space-x-1">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <MapPin className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/livestock">
            <Button variant="ghost" size="icon">
              <Database className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/alerts">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/dashboard" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-muted">
            <MapPin className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link to="/livestock" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-muted">
            <Database className="h-4 w-4" />
            <span>Livestock</span>
          </Link>
          <Link to="/alerts" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-muted">
            <Bell className="h-4 w-4" />
            <span>Alerts</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-muted">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
