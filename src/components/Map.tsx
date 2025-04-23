import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Circle, Fill, Stroke } from 'ol/style';

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

const LivestockMap = ({ locations, onSelectLocation }: MapProps) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapElement.current) return;

    // Create vector source and layer for livestock markers
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Initialize map centered on Centane, Eastern Cape
    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([28.3235, -32.5046]), // Centane, Eastern Cape coordinates
        zoom: 12, // Closer zoom to see the area better
      }),
    });

    mapRef.current = map;

    // Filter and add markers only for livestock that are not "outside"
    locations
      .filter(location => location.status !== 'outside')
      .forEach((location) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([location.longitude, location.latitude])),
          id: location.id,
        });

        // Style based on animal type and status
        const color = location.type === 'cow' 
          ? '#795548' 
          : location.type === 'sheep' 
            ? '#9e9e9e' 
            : '#8BC34A';

        const style = new Style({
          image: new Circle({
            radius: 8,
            fill: new Fill({ color }),
            stroke: new Stroke({
              color: location.status === 'alert' 
                ? '#ff4444' 
                : '#ffffff',
              width: location.status === 'alert' ? 2 : 1,
            }),
          }),
        });

        feature.setStyle(style);
        vectorSource.addFeature(feature);
      });

    // Handle click events
    map.on('click', (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      if (feature) {
        const id = feature.get('id');
        if (id && onSelectLocation) {
          onSelectLocation(id);
          // Fix for error #1: Check the geometry type and cast it correctly
          const geometry = feature.getGeometry();
          if (geometry && geometry instanceof Point) {
            // Now TypeScript knows this is specifically a Point geometry
            const coordinates = geometry.getCoordinates();
            map.getView().animate({
              center: coordinates,
              zoom: 12,
              duration: 1000,
            });
          }
        }
      }
    });

    // Change cursor on hover over features
    map.on('pointermove', (event) => {
      const pixel = map.getEventPixel(event.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      // Fix for error #2: Check that map.getTarget() returns an HTMLElement
      const target = map.getTarget();
      if (target && typeof target !== 'string') {
        target.style.cursor = hit ? 'pointer' : '';
      }
    });

    return () => {
      map.setTarget(undefined);
    };
  }, [locations, onSelectLocation]);

  return (
    <div className="bg-muted rounded-lg border border-border shadow-inner overflow-hidden relative h-[400px] md:h-[500px]">
      <div ref={mapElement} className="absolute inset-0" />
    </div>
  );
};

export default LivestockMap;
