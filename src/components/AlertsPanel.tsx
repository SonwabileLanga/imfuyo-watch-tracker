
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, MapPin } from "lucide-react";

type Alert = {
  id: string;
  animalId: string;
  animalName: string;
  type: "boundary" | "movement" | "battery" | "offline";
  message: string;
  timestamp: string;
  read: boolean;
};

type AlertsPanelProps = {
  alerts: Alert[];
  onViewAlert: (id: string) => void;
  onViewAnimalLocation: (id: string) => void;
  onMarkAsRead: (id: string) => void;
};

const AlertsPanel = ({
  alerts,
  onViewAlert,
  onViewAnimalLocation,
  onMarkAsRead,
}: AlertsPanelProps) => {
  const unreadCount = alerts.filter((alert) => !alert.read).length;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-primary" />
            Alerts
          </span>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} New</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No alerts. All animals are safe.
          </div>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${
                  !alert.read
                    ? "bg-destructive/5 border-destructive/20"
                    : "bg-card border-border"
                } `}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{alert.animalName}</span>
                  <Badge
                    variant={alert.read ? "outline" : "destructive"}
                    className="capitalize"
                  >
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-sm my-1">{alert.message}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {alert.timestamp}
                  </span>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => onViewAnimalLocation(alert.animalId)}
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      Location
                    </Button>
                    {!alert.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => onMarkAsRead(alert.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
