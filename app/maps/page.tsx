"use client";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);
  const mapNode = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const defaultLat = -70;
  const defaultLon = 42;
  const initialZoom = 5;
  const maxZoom = 10;
  const minZoom = 1;

  const initializeMap = (
    node: HTMLElement,
    lon: number | null,
    lat: number | null
  ) => {
    console.log("init map");
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
    if (!lon || !lat) {
      lon = defaultLon;
      lat = defaultLat;
    }
    const mapboxMap = new mapboxgl.Map({
      container: node,
      style: "mapbox://styles/quotropic/clmowfalm01zb01r42wn8dm1u",
      center: [lon, lat],
      zoom: initialZoom,
      maxZoom: maxZoom,
      minZoom: minZoom,
    });

    setMap(mapboxMap);
    setIsLoading(false);
    console.log("changed loading");
  };

  useEffect(() => {
    console.log("uesef");
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          initializeMap(
            node,
            position.coords.longitude,
            position.coords.latitude
          );
          return () => {
            if (map) {
              map.remove();
            }
          };
        },
        (error) => {
          console.error("Geolocation error:", error);
          initializeMap(node, null, null); // Fall back to using default coordinates
        }
      );
    } else {
      initializeMap(node, null, null); // Fall back to using default coordinates
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mapContainer">
        {isLoading && <h2>Loading</h2>}
        <div
          ref={mapNode}
          id="map"
          style={{ width: "100%", height: "400px" }}
        />
      </div>
    </>
  );
};

export default Map;
