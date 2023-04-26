import { Animal, Country, Person } from "./interfaces";
import { argv } from "process";
import { data } from "./data";

/**
 * A function to filter the list of animals containing the pattern
 * @param pattern a string that's contained in the animals' name
 * @returns a list of countries
 */
export function filterAnimalsByPattern(pattern : string) : Country[] {
  const filteredCountries = data.reduce((countries : Country[], country : Country) => {

    const filteredPeople = country.people.reduce((people : Person[], person : Person) => {

      const filteredAnimals = person.animals.filter((animal : Animal) => animal.name.includes(pattern));

      if (filteredAnimals.length > 0) {
        people.push({
          name: person.name,
          animals: filteredAnimals,
        });
      }

      return people;
    }, []);

    if (filteredPeople.length > 0) {
      countries.push({
        name: country.name,
        people: filteredPeople,
      });
    }

    return countries;
  }, []);

  return filteredCountries;
};

/**
 * A function to append the count of children to the parent's name
 * @returns A list of countries
 */
export function countChildren() : Country[] {
  const countriesWithChildrenSum = data.map(({ name: countryName, people } : Country) => {

    const peopleWithAnimalsSum = people.map(({ name: personName, animals } : Person) => ({
      name: `${personName} [${animals.length}]`,
      animals: [...animals],
    }));

    return {
      name: `${countryName} [${people.length}]`,
      people: peopleWithAnimalsSum
    }

  });

  return countriesWithChildrenSum;
};

/**
 * A function to handle the argument passed to the command line interface and log the result
 * @param argument a string that can be :
 * -> --filter=<pattern> : logs the animals in the data filtered by the pattern given
 * -> --count : logs the data with the count of children appended to each parent's name
 */
export function main(argument : string | undefined) {
  if (argument?.startsWith('--filter=')) {
    const [_, pattern] = argument.split('=');
    if (pattern) {
      const filteredData = filterAnimalsByPattern(pattern);
      console.log(JSON.stringify(filteredData, null, 2));
    } else {
      console.error('Error: please pass a valid pattern, e.g. "--filter=ry"');
    }
  } else if (argument?.startsWith('--count')) {
    const dataWithCount = countChildren();
    console.log(JSON.stringify(dataWithCount, null, 2));
  } else {
    console.error('Error: please pass a valid argument, e.g. "--filter=<pattern>" or "--count"');
  }
}


main(argv[2]);




