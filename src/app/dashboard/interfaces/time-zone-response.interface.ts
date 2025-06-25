import { ZoneInfo } from "./time-zone.interface";

export interface TimeZoneResponse {
  status:  string;
  message: string;
  zones:   ZoneInfo[];
}
