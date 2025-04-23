
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bell, Check } from "lucide-react";

type LivestockCardProps = {
  id: string;
  name: string;
  type: "cow" | "sheep" | "goat";
  age?: string;
  status: "normal" | "alert" | "outside";
  lastSeen: string;
  onViewLocation: (id: string) => void;
  onViewDetails: (id: string) => void;
};

const LivestockCard = ({
  id,
  name,
  type,
  age,
  status,
  lastSeen,
  onViewLocation,
  onViewDetails,
}: LivestockCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className={`
        pb-2
        ${type === "cow" ? "bg-imfuyo-brown/20" : ""}
        ${type === "sheep" ? "bg-gray-200" : ""}
        ${type === "goat" ? "bg-imfuyo-lightGreen/20" : ""}
      `}>
        <CardTitle className="flex justify-between items-center">
          <span>{name}</span>
          <Badge 
            variant={
              status === "normal" ? "outline" : 
              status === "alert" ? "destructive" : 
              "secondary"
            }
          >
            {status === "normal" ? (
              <Check className="h-3 w-3 mr-1" />
            ) : status === "alert" ? (
              <Bell className="h-3 w-3 mr-1" />
            ) : (
              <MapPin className="h-3 w-3 mr-1" />
            )}
            {status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium">{type}</span>
          </div>
          {age && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Age:</span>
              <span>{age}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last seen:</span>
            <span>{lastSeen}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <Button
          variant="outline"
          size="sm"
          className="w-[48%]"
          onClick={() => onViewLocation(id)}
        >
          <MapPin className="h-4 w-4 mr-1" />
          Location
        </Button>
        <Button
          variant="outline" 
          size="sm"
          className="w-[48%]"
          onClick={() => onViewDetails(id)}
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LivestockCard;
