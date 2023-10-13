"use client";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const MapMenu = () => {
  const initialSelectorsState = {
    whale: "",
    startMonth: '',
    endMonth: '',
  };
  const [selectors, setSelectors] = useState(initialSelectorsState);
  // const [whale, setWhale] = useState("");
  // const [startMonth, setStartMonth] = useState("");
  // const [endMonth, setEndMonth] = useState("");

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
    console.log(selectors);
    console.log("submit");
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ width: 200, minWidth: 80 }}>
        <InputLabel id="whaleLabel">Whale</InputLabel>
        <Select
          labelId="whaleLabel"
          id="whale"
          value={selectors.whale}
          name="whale"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: 200, minWidth: 80 }}>
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
      <FormControl sx={{ width: 200, minWidth: 80 }}>
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
      <button type="submit">See Map</button>
    </form>
  );
};

export default MapMenu;
