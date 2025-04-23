
import { useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Check, Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - same structure as in Dashboard
const mockAlerts = [
  {
    id: "a1",
    animalId: "2",
    animalName: "Woolly",
    type: "boundary" as const,
    message: "Animal has crossed the farm boundary",
    timestamp: "Today, 14:32",
    read: false,
  },
  {
    id: "a2",
    animalId: "3",
    animalName: "Jumper",
    type: "movement" as const,
    message: "Unusual movement detected",
    timestamp: "Today, 13:15",
    read: false,
  },
  {
    id: "a3",
    animalId: "1",
    animalName: "Bella",
    type: "battery" as const,
    message: "Tracker battery low (15%)",
    timestamp: "Yesterday, 18:45",
    read: true,
  },
  {
    id: "a4",
    animalId: "4",
    animalName: "Daisy",
    type: "offline" as const,
    message: "Tracker has been offline for 2 hours",
    timestamp: "Yesterday, 12:20",
    read: true,
  },
  {
    id: "a5",
    animalId: "5",
    animalName: "Fluffy",
    type: "boundary" as const,
    message: "Animal is approaching the farm boundary",
    timestamp: "2 days ago, 09:15",
    read: true,
  },
];

const Alerts = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.animalName
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) || 
      alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (currentTab === "all") return matchesSearch;
    if (currentTab === "unread") return matchesSearch && !alert.read;
    if (currentTab === "read") return matchesSearch && alert.read;
    
    return matchesSearch;
  });

  const handleViewAnimalLocation = (animalId: string) => {
    // In a real app, this would navigate to the map view centered on this animal
    console.log(`View location for animal ${animalId}`);
  };

  const handleMarkAsRead = (alertId: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, read: true })));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Bell className="h-6 w-6 mr-2 text-primary" />
            Alerts
          </h1>
          
          {alerts.some(alert => !alert.read) && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <Check className="h-4 w-4 mr-1" />
              Mark All as Read
            </Button>
          )}
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Alert History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="read">Read</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  {renderAlertsList(filteredAlerts)}
                </TabsContent>
                <TabsContent value="unread" className="mt-4">
                  {renderAlertsList(filteredAlerts)}
                </TabsContent>
                <TabsContent value="read" className="mt-4">
                  {renderAlertsList(filteredAlerts)}
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  function renderAlertsList(alertsList: typeof alerts) {
    if (alertsList.length === 0) {
      return (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">No alerts found.</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {alertsList.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border ${
              !alert.read
                ? "bg-destructive/5 border-destructive/20"
                : "bg-card border-border"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{alert.animalName}</span>
              <Badge
                variant={alert.read ? "outline" : "destructive"}
                className="capitalize"
              >
                {alert.type}
              </Badge>
            </div>
            <p className="text-sm my-2">{alert.message}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {alert.timestamp}
              </span>
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewAnimalLocation(alert.animalId)}
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  View Location
                </Button>
                {!alert.read && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAsRead(alert.id)}
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark as Read
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Alerts;
