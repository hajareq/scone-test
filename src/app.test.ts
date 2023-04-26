import {countChildren, filterAnimalsByPattern, main} from "./app"
import { data } from "./data";
import { Country } from "./interfaces";

describe("app.ts", () => {
  const filteredDataExample = [
    {
      name: 'Uzuzozne',
      people: [
        {
          name: 'Lillie Abbott',
          animals: [
            {
              name: 'John Dory'
            }
          ]
        }
      ]
    },
    {
      name: 'Satanwi',
      people: [
        {
          name: 'Anthony Bruno',
          animals: [
            {
              name: 'Oryx'
            }
          ]
        }
      ]
    }];

  describe('filterAnimalsByPattern() test', () => {

    it('should return all data when an empty pattern is passed', () => {
      const filteredData = filterAnimalsByPattern('');
      expect(filteredData).toStrictEqual(data);
    });

    it('should return an empty array when no name matches the pattern', () => {
      const filteredData = filterAnimalsByPattern('jdnckjdsn');
      expect(filteredData).toStrictEqual([]);
    });

    it('should return a shallow copy of original data', () => {
      const filteredData = filterAnimalsByPattern('');
      expect(filteredData).not.toBe(data);
      expect(filteredData[0].people).not.toBe(data[0].people);
      expect(filteredData[0].people[0].animals).not.toBe(data[0].people[0].animals);
    });

    it('should return filtered data containing the pattern', () => {
      const filteredData = filterAnimalsByPattern('ry');
      expect(filteredData).toStrictEqual(filteredDataExample);
    });

  });

  describe('countChildren() test', () => {

    let dataWithChildrenCount : Country[];

    beforeEach(() => {
      dataWithChildrenCount = countChildren();
    });

    it('should return all data', () => {
      expect(Array.isArray(dataWithChildrenCount)).toBe(true);
      expect(dataWithChildrenCount).toHaveLength(data.length);
    });

    it('should return a shallow copy of original data', () => {
      expect(dataWithChildrenCount).not.toBe(data);
      expect(dataWithChildrenCount[0].people).not.toBe(data[0].people);
      expect(dataWithChildrenCount[0].people[0].animals).not.toBe(data[0].people[0].animals);
    });

    it("correctly adds the count of children to each country's name", () => {
      dataWithChildrenCount.forEach((country, index) => {
        expect(country.name).toBe(`${data[index].name} [${data[index].people.length}]`);
      });
    });

    it('correctly adds the count of animals to each person\'s name', () => {
      dataWithChildrenCount.forEach((country, countryIndex) => {
        country.people.forEach((person, personIndex) => {
          expect(person.name).toBe(`${data[countryIndex].people[personIndex].name} [${data[countryIndex].people[personIndex].animals.length}]`);
        });
      });
    });

  });

  describe('main() test', () => {
    let consoleLogSpy: jest.SpyInstance;
    let consoleErrorSpy: jest.SpyInstance;

    const invalidArgErrorMessage = 'Error: please pass a valid argument, e.g. "--filter=<pattern>" or "--count"';
  
    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, 'log');
      consoleErrorSpy = jest.spyOn(console, 'error');
    });
  
    afterEach(() => {
      consoleLogSpy.mockClear();
      consoleErrorSpy.mockClear();
    });
  
    afterAll(() => {
      consoleLogSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  
    it('should log filtered data when argument starts with --filter=', () => {
      const argument = '--filter=ry';
      main(argument);
      expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify(filteredDataExample, null, 2));
    });
  
    it('should log error message when pattern is missing in --filter argument', () => {
      const argument = '--filter=';
      main(argument);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error: please pass a valid pattern, e.g. "--filter=ry"');
    });
  
    it('should log data with count when argument starts with --count', () => {
      const dataWithCount = countChildren();
      const dataWithCountString = JSON.stringify(dataWithCount, null, 2);

      const argument = '--count';
      main(argument);
      expect(consoleLogSpy).toHaveBeenCalledWith(dataWithCountString);
    });
  
    it('should log error message when argument is not valid', () => {
      const argument = '--invalid';
      main(argument);
      expect(consoleErrorSpy).toHaveBeenCalledWith(invalidArgErrorMessage);
    });
  
    it('should log error message when argument is undefined', () => {
      main(undefined);
      expect(consoleErrorSpy).toHaveBeenCalledWith(invalidArgErrorMessage);
    });
  });      
});