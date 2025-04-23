
import { useState } from "react";
import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Bell, MapPin, Database, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock data
const mockUserData = {
  name: "John Mokoena",
  phone: "073 123 4567",
  email: "john@example.com",
  farmName: "Green Hills Farm",
  location: "Eastern Cape, South Africa",
};

const Profile = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState(mockUserData);
  const [notifications, setNotifications] = useState({
    boundaryAlerts: true,
    batteryAlerts: true,
    movementAlerts: true,
    dailySummary: false,
  });

  const handleSaveProfile = (updatedUserData: typeof mockUserData) => {
    setUserData(updatedUserData);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleToggleNotification = (setting: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleResetPassword = () => {
    // In a real app, this would initiate a password reset flow
    toast({
      title: "Reset Email Sent",
      description: "Check your email for instructions to reset your password.",
    });
  };

  const handleLogout = () => {
    // In a real app, this would log the user out
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex-1">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Profile */}
          <div>
            <UserProfile user={userData} onSave={handleSaveProfile} />
          </div>

          {/* Notification Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-primary" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="boundary-alerts">Boundary Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when animals cross farm boundaries
                      </p>
                    </div>
                    <Switch
                      id="boundary-alerts"
                      checked={notifications.boundaryAlerts}
                      onCheckedChange={() => handleToggleNotification("boundaryAlerts")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="battery-alerts">Battery Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when tracker batteries are low
                      </p>
                    </div>
                    <Switch
                      id="battery-alerts"
                      checked={notifications.batteryAlerts}
                      onCheckedChange={() => handleToggleNotification("batteryAlerts")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="movement-alerts">Movement Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about unusual animal movements
                      </p>
                    </div>
                    <Switch
                      id="movement-alerts"
                      checked={notifications.movementAlerts}
                      onCheckedChange={() => handleToggleNotification("movementAlerts")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="daily-summary">Daily Summary</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive daily summary reports of your livestock
                      </p>
                    </div>
                    <Switch
                      id="daily-summary"
                      checked={notifications.dailySummary}
                      onCheckedChange={() => handleToggleNotification("dailySummary")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
