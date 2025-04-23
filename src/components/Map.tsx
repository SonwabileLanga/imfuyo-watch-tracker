
import { useState } from "react";

type Location = {
  id: string;
  name: string;
  type: "cow" | "sheep" | "goat"; 
  latitude: number;
  longitude: number;
  status: "normal" | "alert" | "outside";
};

type MapProps = {
  locations: Location[];
  onSelectLocation?: (locationId: string) => void;
};

const Map = ({ locations, onSelectLocation }: MapProps) => {
  // In a real app, this would use Mapbox, Google Maps, or Leaflet
  // For this prototype, we'll create a simple visual representation
  const [selected, setSelected] = useState<string | null>(null);
  
  const handleSelect = (id: string) => {
    setSelected(id);
    onSelectLocation && onSelectLocation(id);
  };

  return (
    <div className="bg-muted rounded-lg border border-border shadow-inner overflow-hidden relative h-[400px] md:h-[500px]">
      <div className="absolute inset-0 p-4">
        {/* This is a placeholder for an actual map */}
        <div className="bg-imfuyo-beige h-full w-full rounded relative">
          {/* Represent farm boundary */}
          <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] border-2 border-dashed border-imfuyo-green rounded-lg"></div>
          
          {/* Place animals on the map */}
          {locations.map((location) => (
            <div 
              key={location.id}
              onClick={() => handleSelect(location.id)}
              className={`absolute w-8 h-8 rounded-full cursor-pointer transition-all transform hover:scale-110
                ${location.type === 'cow' ? 'bg-imfuyo-brown' : location.type === 'sheep' ? 'bg-gray-200' : 'bg-imfuyo-lightGreen'}
                ${location.status === 'alert' ? 'animate-pulse ring-2 ring-destructive' : ''}
                ${location.status === 'outside' ? 'ring-2 ring-accent' : ''}
                ${selected === location.id ? 'ring-4 ring-primary' : ''}
              `}
              style={{ 
                top: `${(1 - (location.latitude / 100)) * 100}%`, 
                left: `${(location.longitude / 100) * 100}%` 
              }}
            >
              <div className="flex items-center justify-center h-full w-full text-white text-xs font-bold">
                {location.type === 'cow' ? '🐄' : location.type === 'sheep' ? '🐑' : '🐐'}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 text-xs text-center">
        This is a placeholder map. In a production app, integrate with Mapbox or Google Maps API.
      </div>
    </div>
  );
};

export default Map;
