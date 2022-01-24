import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./App.css";
import Header from "./Components/Header";
import { useStore } from "./Store";
import LocationPicker from "./Components/LocationPicker";
import clsx from "clsx";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useState } from "react";
import { ArrowRight } from "react-feather";
function App() {
  const [value, setValue] = useState(new Date());

  const { location, locationPicker, setLocationPicker } = useStore();
  const openLocationPicker = () => {
    setLocationPicker(true);
  };
  return (
    <>
      <Header />
      <div
        style={{ background: "url(/images/bg-desktop.png) " }}
        className="h-screen flex items-center justify-center bg-center bg-cover"
      >
        <div className=" w-full max-w-lg px-3">
          <div
            onClick={openLocationPicker}
            className="rounded border p-4 flex items-center cursor-pointer w-full shadow-md bg-white"
          >
            <div className="rounded-full w-2 h-2 bg-green-600 mr-3"></div>
            <p
              className={clsx(" text-md", {
                "text-gray-400": !location,
              })}
            >
              {location
                ? location.place_name
                : "Pick Up City, Airport, Address or Hotel"}
            </p>
          </div>
          {location && (
            <div className=" gap-2 rounded border p-4 flex flex-col md:flex-row items-center cursor-pointer w-full shadow-md mt-4 bg-white justify-between">
              <DatePicker
                value={value}
                onChange={setValue}
                format="MMM/ddd/YYYY HH:mm:ss"
                plugins={[<TimePicker position="bottom" />]}
              />
              <span className="transform rotate-90 md:rotate-0">
                <ArrowRight />
              </span>
              <DatePicker
                value={value}
                onChange={setValue}
                format="MMM/ddd/YYYY HH:mm:ss"
                plugins={[<TimePicker position="bottom" />]}
              />
            </div>
          )}
          <button
            className={clsx(
              "w-full mt-4  rounded py-3 uppercase font-medium text-lg shadow-sm",
              {
                "bg-gray-300 text-gray-500 cursor-not-allowed": !location,
                "bg-green-600 text-white": location,
              }
            )}
            disabled={!location}
          >
            Find Cars
          </button>
        </div>
      </div>
      {locationPicker && <LocationPicker />}
    </>
  );
}

export default App;
