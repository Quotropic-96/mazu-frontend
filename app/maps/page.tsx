"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
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
    whale: "",
    startMonth: "",
    endMonth: "",
  };
  const [isLoading, setIsLoading] = useState(true);
  const [selectors, setSelectors] = useState(initialSelectorsState);
  const [whales, setWhales] = useState(Array<Whale>);
  const [isError, setIsError] = useState(false);

  const getWhales = async () => {
    try {
      const response = await whaleService.getAllWhales();
      setWhales(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
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
    router.push(
      `/maps/${selectors.whale}/${selectors.startMonth}/${selectors.endMonth}`
    );
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
          <FormControl sx={{ m:1, width: 300, minWidth: 80 }}>
            <InputLabel id="whaleLabel">Whale</InputLabel>
            <Select
              labelId="whaleLabel"
              id="whale"
              value={selectors.whale}
              name="whale"
              required
              onChange={handleChange}
            >
              {whales.map((whale) => (
                <MenuItem key={whale._id} value={whale._id}>
                  {whale.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300, minWidth: 80 }}>
            <InputLabel id="startMonthLabel">Start Month</InputLabel>
            <Select
              labelId="startMonthLabel"
              id="startMonth"
              value={selectors.startMonth}
              name="startMonth"
              onChange={handleChange}
            >
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
              <MenuItem value={undefined}>--</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300, minWidth: 80 }}>
            <InputLabel id="endMonthLabel">End Month</InputLabel>
            <Select
              labelId="endMonthLabel"
              id="endMonth"
              value={selectors.endMonth}
              name="endMonth"
              onChange={handleChange}
            >
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
              <MenuItem value={undefined}>--</MenuItem>
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
