export interface TimeZoneDetailResponse {
  status:           string;
  message:          string;
  countryCode:      string;
  countryName:      string;
  regionName:       string;
  cityName:         string;
  zoneName:         string;
  abbreviation:     string;
  gmtOffset:        number;
  dst:              string;
  zoneStart:        number;
  zoneEnd:          null;
  nextAbbreviation: null;
  timestamp:        number;
  formatted:        Date;
}
