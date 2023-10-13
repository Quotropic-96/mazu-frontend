"use client";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./page.module.css";
import Icon from "../components/Icon/Icon";

const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);
  const mapNode = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const defaultLat = -70;
  const defaultLon = 42;
  const initialZoom = 5;
  const maxZoom = 10;
  const minZoom = 0.8;

  const initializeMap = (
    node: HTMLElement,
    lon: number | null,
    lat: number | null
  ): void => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
    if (!lon || !lat) {
      lon = defaultLon;
      lat = defaultLat;
    }
    const mapboxMap = new mapboxgl.Map({
      container: node,
      style: "mapbox://styles/quotropic/clnnarcf4009j01p91yyt2wrh",
      center: [lon, lat],
      zoom: initialZoom,
      maxZoom: maxZoom,
      minZoom: minZoom,
    });

    setMap(mapboxMap);
    setIsLoading(false);
  };

  const toggleMenu = () => {
    console.log("menu");
  };

  useEffect(() => {
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
    <div className={`page ${styles.mapContainer}`}>
      {isLoading ? (
        <h2>Loading</h2>
      ) : (
        <div className={styles.mapNav}>
          <Icon
            name="back"
            image="/icons/back.svg"
            callback={toggleMenu}
          ></Icon>
          <div className={styles.whaleName}>Humpback Whale</div>
          <Icon
            name="whale"
            image="/icons/whale.svg"
            callback={toggleMenu}
          ></Icon>
        </div>
      )}
      <div
        ref={mapNode}
        className={styles.map}
        style={{
          width: "100%",
          height: "calc(100vh - 2 * var(--body-margin))",
        }}
      />
    </div>
  );
};

export default Map;
