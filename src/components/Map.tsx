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
import { Style, Circle, Fill, Stroke, Text } from 'ol/style';

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

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([28.3235, -32.5046]),
        zoom: 12,
      }),
    });

    mapRef.current = map;

    locations
      .filter(location => location.status !== 'outside')
      .forEach((location) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([location.longitude, location.latitude])),
          id: location.id,
        });

        const color = location.type === 'cow' 
          ? '#795548' 
          : location.type === 'sheep' 
            ? '#9e9e9e' 
            : '#8BC34A';

        const style = new Style({
          image: new Circle({
            radius: 10,
            fill: new Fill({ color }),
            stroke: new Stroke({
              color: location.status === 'alert' 
                ? '#ff4444' 
                : '#ffffff',
              width: location.status === 'alert' ? 3 : 1,
            }),
          }),
          text: location.type === 'cow' ? new Text({
            text: location.status === 'alert' ? '⚠️' : '✓',
            offsetY: -15,
            scale: 1.2,
            fill: new Fill({
              color: location.status === 'alert' ? '#ff4444' : '#4CAF50'
            })
          }) : undefined
        });

        feature.setStyle(style);
        vectorSource.addFeature(feature);
      });

    map.on('click', (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      if (feature) {
        const id = feature.get('id');
        if (id && onSelectLocation) {
          onSelectLocation(id);
          const geometry = feature.getGeometry();
          if (geometry && geometry instanceof Point) {
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

    map.on('pointermove', (event) => {
      const pixel = map.getEventPixel(event.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
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
      <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-[#795548] rounded-full border border-white"></span>
            <span>Cow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#ff4444]">⚠️</span>
            <span>Crossing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#4CAF50]">✓</span>
            <span>Normal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivestockMap;
