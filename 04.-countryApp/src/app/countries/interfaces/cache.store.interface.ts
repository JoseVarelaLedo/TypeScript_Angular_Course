import { Country } from "./country"
import { Region } from "./region.type"

export interface CacheStore {
  byCapital:    TermCountries,
  byCountries:  TermCountries,
  byRegion:     RegionCountries
}

//dado que no se recomienda tener objetos con tipos complejos internamente, definimos subinterfaces
export interface TermCountries {
  term: string,
  countries: Country[]
}

export interface RegionCountries{
  region?:   Region, //puede que no se haya enviado todavía
  countries: Country[]
}
