
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [27.8333, -32.8833], // Eastern Cape, South Africa coordinates
      zoom: 8,
      pitch: 45
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each location
    locations.forEach((location) => {
      const markerElement = document.createElement('div');
      markerElement.className = `w-8 h-8 rounded-full cursor-pointer transition-all transform hover:scale-110
        ${location.type === 'cow' ? 'bg-imfuyo-brown' : location.type === 'sheep' ? 'bg-gray-200' : 'bg-imfuyo-lightGreen'}
        ${location.status === 'alert' ? 'animate-pulse ring-2 ring-destructive' : ''}
        ${location.status === 'outside' ? 'ring-2 ring-accent' : ''}`;

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([location.longitude, location.latitude])
        .addTo(map.current);

      markerElement.addEventListener('click', () => {
        onSelectLocation?.(location.id);
        map.current?.flyTo({
          center: [location.longitude, location.latitude],
          zoom: 12
        });
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [locations, mapboxToken, onSelectLocation]);

  return (
    <div className="bg-muted rounded-lg border border-border shadow-inner overflow-hidden relative h-[400px] md:h-[500px]">
      {!mapboxToken ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <p className="mb-4">Please enter your Mapbox public token to view the map</p>
          <input
            type="text"
            placeholder="Enter Mapbox token"
            className="w-full max-w-md px-4 py-2 border rounded"
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Get your token at{" "}
            <a 
              href="https://www.mapbox.com/account/access-tokens" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
      ) : (
        <div ref={mapContainer} className="absolute inset-0" />
      )}
    </div>
  );
};

export default Map;
