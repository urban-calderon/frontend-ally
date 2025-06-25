import { Country } from "./country.interface";

export interface CountryResponse {
  success: boolean;
  data:    Country[];
}
