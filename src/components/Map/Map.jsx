/** @format */
import { useSearchParams } from "react-router-dom";

import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <p>
        Position: lat: {lat}, lng {lng}
      </p>
      <button
        onClick={() => {
          setSearchParams({ lat: 25, lng: 50 });
        }}
      >
        Change Position
      </button>
    </div>
  );
}

export default Map;
