"use client";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./page.module.css";
import Icon from "../../components/Icon/Icon";
import goBack from "../../utils/goBack";
import { Error } from "@/app/types/Error";
import { Map } from "@/app/types/Map";
import mapService from "@/app/services/mapService";

const Map = ({ params }: any) => {
  const { selectors } = params;
  const router = useRouter();
  const mapNode = useRef(null);
  const [maps, setMaps] = useState<Array<Map>>([]);
  const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>({
    isError: false,
    errorMessage: "",
  });

  const defaultLat = -70;
  const defaultLon = 42;
  const initialZoom = 5;
  const maxZoom = 10;
  const minZoom = 0.8;
  const defaultMapStyle = "mapbox://styles/quotropic/clnnarcf4009j01p91yyt2wrh";

  const validateSelectors = (selectors: Array<string>): boolean => {
    if (selectors.length < 3) {
      setError({
        isError: true,
        errorMessage: "Invlaid params",
      });
      return false;
    }
    return true;
  };

  const getMaps = async (selectors: Array<string>): Promise<void> => {
    try {
      const response = await mapService.getMapsFromSelectors(
        selectors[0],
        selectors[1],
        selectors[2]
      );
      setMaps(response);
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        errorMessage: "Could not retrieve maps",
      });
    }
  };

  const renderMap = (node: HTMLElement, mapStyle: string): void => {
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          initializeMap(
            node,
            position.coords.longitude,
            position.coords.latitude,
            mapStyle
          );
          return () => {
            if (map) {
              map.remove();
            }
          };
        },
        (error) => {
          console.error("Geolocation error:", error);
          initializeMap(node, undefined, undefined, undefined); // Fall back to using default coordinates
        }
      );
    } else {
      initializeMap(node, undefined, undefined, undefined); // Fall back to using default coordinates
    }
  };

  const initializeMap = (
    node: HTMLElement,
    lon: number | undefined,
    lat: number | undefined,
    mapStyle: string | undefined
  ): void => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
    if (!lon || !lat) {
      lon = defaultLon;
      lat = defaultLat;
      mapStyle = defaultMapStyle;
    }
    const mapboxMap = new mapboxgl.Map({
      container: node,
      style: mapStyle,
      center: [lon, lat],
      zoom: initialZoom,
      maxZoom: maxZoom,
      minZoom: minZoom,
    });

    setMap(mapboxMap);
    setIsLoading(false);
  };

  const toggleMenu = (): void => {
    console.log("menu");
  };

  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

    if (validateSelectors(selectors)) {
      getMaps(selectors);
    } else {
      goBack(router);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;
    if (maps.length !== 0) {
      renderMap(node, maps[0].url);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maps]);

  return (
    <div className={`page ${styles.mapContainer}`}>
      {isLoading ? (
        <h2>Loading</h2>
      ) : (
        <div className={styles.mapNav}>
          <Icon
            name="back"
            image="/icons/back.svg"
            callback={() => goBack(router)}
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
