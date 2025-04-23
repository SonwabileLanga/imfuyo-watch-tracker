
import { useState } from "react";
import Navbar from "@/components/Navbar";
import LivestockCard from "@/components/LivestockCard";
import AddLivestockForm from "@/components/AddLivestockForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - same as in Dashboard.tsx
const mockLivestock = [
  {
    id: "1",
    name: "Bella",
    type: "cow" as const,
    age: "3 years",
    status: "normal" as const,
    lastSeen: "10 minutes ago",
  },
  {
    id: "2",
    name: "Woolly",
    type: "sheep" as const,
    age: "2 years",
    status: "alert" as const,
    lastSeen: "5 minutes ago",
  },
  {
    id: "3",
    name: "Jumper",
    type: "goat" as const,
    age: "1 year",
    status: "outside" as const,
    lastSeen: "2 minutes ago",
  },
  {
    id: "4",
    name: "Daisy",
    type: "cow" as const,
    age: "4 years",
    status: "normal" as const,
    lastSeen: "15 minutes ago",
  },
  {
    id: "5",
    name: "Fluffy",
    type: "sheep" as const,
    age: "1.5 years",
    status: "normal" as const,
    lastSeen: "8 minutes ago",
  },
];

const Livestock = () => {
  const [livestock, setLivestock] = useState(mockLivestock);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredLivestock = livestock.filter((animal) => {
    const matchesSearch = animal.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || animal.type === filterType;
    const matchesStatus = filterStatus === "all" || animal.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleViewLocation = (id: string) => {
    // In a real app, this would navigate to the map view centered on this animal
    console.log(`View location for animal ${id}`);
  };

  const handleViewDetails = (id: string) => {
    // In a real app, this would navigate to animal details page
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
      },
    ]);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Livestock</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add Livestock
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg font-medium mb-4">Filter Animals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="cow">Cows</SelectItem>
                <SelectItem value="sheep">Sheep</SelectItem>
                <SelectItem value="goat">Goats</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="alert">Alert</SelectItem>
                <SelectItem value="outside">Outside Boundary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredLivestock.length === 0 ? (
          <div className="text-center py-12 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">No livestock found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredLivestock.map((animal) => (
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
        )}

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

export default Livestock;
