/** @format */
import Spinner from "../../Spinner/Spinner";
import CountryItem from "../CountryItem/CountryItem";
import Message from "../../Message/Message";

import styles from "./CountryList.module.css";

function CountryList({ cities, isLoading }) {
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
        <CountryItem key={country.emoji} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
