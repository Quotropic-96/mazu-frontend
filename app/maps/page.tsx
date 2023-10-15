"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import whaleService from "../services/whaleService";
import goBack from "../utils/goBack";
import Icon from "../components/Icon/Icon";
import styles from "./page.module.css";

type Size = {
  gender: string;
  length: number;
  _id: string;
};

type Whale = {
  _id: string;
  name: string;
  otherNames: Array<string>;
  scientificName: string;
  sizes: Array<Size>;
  curiosities: Array<string>;
};

type Error = {
  isError: boolean;
  errorMessage: string;
};

const MapMenu = () => {
  const router = useRouter();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const initialSelectorsState = {
    whale: "Whale",
    startMonth: "startMonth",
    endMonth: "endMonth",
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectors, setSelectors] = useState(initialSelectorsState);
  const [whales, setWhales] = useState<Array<Whale>>([]);
  const [error, setError] = useState<Error>({
    isError: false,
    errorMessage: "",
  });

  const getWhales = async () => {
    try {
      const response = await whaleService.getAllWhales();
      setWhales(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        errorMessage: "Could not find Whales",
      });
    }
  };

  const validateSelectors = (selectors: any): boolean => {
    if (selectors.whale === initialSelectorsState.whale) {
      setError({
        isError: true,
        errorMessage: "Select a whale",
      });
      return false;
    }
    if (whales.filter((whale) => {whale.name === selectors.whale}).length !== 0) {
      setError({
        isError: true,
        errorMessage: "Invalid whale name",
      });
      return false;
    }
    if (selectors.startMonth < 1 || selectors.startMonth > 12) {
      setError({
        isError: true,
        errorMessage: "Invalid start month",
      });
      return false;
    }
    if (selectors.endMonth < 1 || selectors.endMonth > 12) {
      setError({
        isError: true,
        errorMessage: "Invalid end month",
      });
      return false;
    }
    if (selectors.startMonth > selectors.endMonth) {
      setError({
        isError: true,
        errorMessage: "Start month can't be larger than end month",
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    getWhales();
  }, []);

  const handleChange = (e: SelectChangeEvent) => {
    e.preventDefault();
    setSelectors((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateSelectors(selectors)) {
      router.push(
        `/maps/${selectors.whale}/${selectors.startMonth}/${selectors.endMonth}`
      );
    } else {
      setSelectors(initialSelectorsState);
    }
  };

  return (
    <div className={`page ${styles.main}`}>
      <Icon
        name="back"
        image="/icons/back.svg"
        callback={() => goBack(router)}
      ></Icon>
      {!isLoading && (
        <form className={styles.form} onSubmit={handleSubmit}>
          {error.isError && (
            <div className="error">
              <p>{error.errorMessage}</p>
            </div>
          )}
          <FormControl sx={{ m: 1, width: 300, minWidth: 80 }}>
            <Select
              labelId="whaleLabel"
              id="whale"
              value={selectors.whale}
              name="whale"
              required
              onChange={handleChange}
            >
              <MenuItem disabled value="Whale">
                <em className={styles.placeHolder}>Whale</em>
              </MenuItem>
              {whales.map((whale) => (
                <MenuItem key={whale._id} value={whale._id}>
                  {whale.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300, minWidth: 80 }}>
            <Select
              labelId="startMonthLabel"
              id="startMonth"
              value={selectors.startMonth}
              name="startMonth"
              onChange={handleChange}
            >
              <MenuItem disabled value="startMonth">
                <em className={styles.placeHolder}>Start Month</em>
              </MenuItem>
              {months.map((month, index) => (
                <MenuItem key={index} value={index + 1}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300, minWidth: 80 }}>
            <Select
              labelId="endMonthLabel"
              id="endMonth"
              value={selectors.endMonth}
              name="endMonth"
              onChange={handleChange}
            >
              <MenuItem disabled value="endMonth">
                <em className={styles.placeHolder}>End Month</em>
              </MenuItem>
              {months.map((month, index) => (
                <MenuItem key={index} value={index + 1}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button type="submit" className={styles.submitButton}>
            See The Map
          </button>
        </form>
      )}
    </div>
  );
};

export default MapMenu;
