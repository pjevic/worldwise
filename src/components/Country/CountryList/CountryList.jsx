/** @format */
import { useCities } from "../../../contexts/CitiesContext";

import Spinner from "../../Spinner/Spinner";
import CountryItem from "../CountryItem/CountryItem";
import Message from "../../Message/Message";

import styles from "./CountryList.module.css";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  if (!countries.length)
    return (
      <Message message="Add your first country by clicking on a country on the map." />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
