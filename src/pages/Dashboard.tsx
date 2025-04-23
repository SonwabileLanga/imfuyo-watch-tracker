
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map";
import LivestockCard from "@/components/LivestockCard";
import AlertsPanel from "@/components/AlertsPanel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddLivestockForm from "@/components/AddLivestockForm";
import { Plus, MapPin } from "lucide-react";

// Mock data
const mockLivestock = [
  {
    id: "1",
    name: "Bella",
    type: "cow" as const,
    age: "3 years",
    status: "normal" as const,
    lastSeen: "10 minutes ago",
    latitude: 45,
    longitude: 30,
  },
  {
    id: "2",
    name: "Woolly",
    type: "sheep" as const,
    age: "2 years",
    status: "alert" as const,
    lastSeen: "5 minutes ago",
    latitude: 60,
    longitude: 60,
  },
  {
    id: "3",
    name: "Jumper",
    type: "goat" as const,
    age: "1 year",
    status: "outside" as const,
    lastSeen: "2 minutes ago",
    latitude: 25,
    longitude: 75,
  },
];

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
];

const Dashboard = () => {
  const [livestock, setLivestock] = useState(mockLivestock);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleViewLocation = (id: string) => {
    setSelectedAnimal(id);
    // In a real app, this would center the map on the animal
    console.log(`View location for animal ${id}`);
  };

  const handleViewDetails = (id: string) => {
    // In a real app, this would navigate to the animal's detail page
    console.log(`View details for animal ${id}`);
  };

  const handleAddLivestock = (newLivestock: any) => {
    const newId = `${livestock.length + 1}`;
    setLivestock([
      ...livestock,
      {
        id: newId,
        name: newLivestock.name,
        type: newLivestock.type,
        age: newLivestock.age,
        status: "normal" as const,
        lastSeen: "Just now",
        latitude: 50,
        longitude: 50,
      },
    ]);
    setIsAddDialogOpen(false);
  };

  const handleMarkAlertAsRead = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add Livestock
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Map
              locations={livestock.map((animal) => ({
                id: animal.id,
                name: animal.name,
                type: animal.type,
                latitude: animal.latitude,
                longitude: animal.longitude,
                status: animal.status,
              }))}
              onSelectLocation={handleViewLocation}
            />

            <div className="bg-card rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-1 text-primary" />
                Livestock Locations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {livestock.map((animal) => (
                  <LivestockCard
                    key={animal.id}
                    id={animal.id}
                    name={animal.name}
                    type={animal.type}
                    age={animal.age}
                    status={animal.status}
                    lastSeen={animal.lastSeen}
                    onViewLocation={handleViewLocation}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <AlertsPanel
              alerts={alerts}
              onViewAlert={() => {}}
              onViewAnimalLocation={handleViewLocation}
              onMarkAsRead={handleMarkAlertAsRead}
            />
          </div>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Livestock</DialogTitle>
            </DialogHeader>
            <AddLivestockForm
              onAdd={handleAddLivestock}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
