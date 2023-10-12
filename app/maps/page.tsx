"use client";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  interface Coordinates {
    lat: number;
    lon: number;
  }
  const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);
  const mapNode = useRef(null);

  const defaultLat = -70;
  const defaultLon = 42;
  const initialZoom = 5;
  const maxZoom = 10;
  const minZoom = 1;

  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    // Get user's geolocation
    if (navigator.geolocation) {
      console.log("in geoloc");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(map);
          const mapboxMap = new mapboxgl.Map({
            container: node,
            style: "mapbox://styles/quotropic/clmowfalm01zb01r42wn8dm1u",
            center: [position.coords.longitude, position.coords.latitude],
            zoom: initialZoom,
            maxZoom: maxZoom,
            minZoom: minZoom,
          });

          mapboxMap.on("load", () => {
            setMap(mapboxMap);
          });

          return () => {
            mapboxMap.remove();
          };
        },
        (error) => {
          console.error("Geolocation error:", error);
          initializeMap(); // Fall back to using default coordinates
        }
      );
    } else {
      initializeMap(); // Fall back to using default coordinates
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeMap = () => {
    console.log("in init map");
    const node = mapNode.current;
    if (!node) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      style: "mapbox://styles/quotropic/clmowfalm01zb01r42wn8dm1u",
      center: [defaultLon, defaultLat],
      zoom: initialZoom,
      maxZoom: maxZoom,
      minZoom: minZoom,
    });

    return () => {
      mapboxMap.remove();
    };
  };

  return <div ref={mapNode} style={{ width: "100%", height: "400px" }} />;
};

export default Map;
