enum ForecastMethod {
	Classic = "classic",
	Compact = "compact",
	Complete = "complete",
}

interface ForecastCompactResponse {
	type: "Feature",
	geometry: {
		type: "Point",
		coordinates: number[],
	},
	properties: {
		meta: {
			updated_at: string,
			units: {
				// TODO:
			}
		}
		// TODO: 
		timeseries: any[],
	}
}

export class ForecastAPI {
	private URL: string = "https://api.met.no/weatherapi/locationforecast/2.0";
	constructor() { }

	private async do_request(method: ForecastMethod, lat: number, lon: number, alt?: number) {
		return await fetch(`${this.URL}/${method}?lat=${lat}&lon=${lon}&${alt ? "altitude=" + alt : ""}`)
	}

	// returns XML format
	async classic(lat: number, lon: number, alt?: number) {
		return await this.do_request(ForecastMethod.Classic, lat, lon, alt)
	}

	// returns JSON format
	async compact(lat: number, lon: number, alt?: number): Promise<ForecastCompactResponse> {
		const res = await this.do_request(ForecastMethod.Compact, lat, lon, alt)
		return await res.json()
	}

	// returns something format
	async complete(lat: number, lon: number, alt?: number) {
		return await this.do_request(ForecastMethod.Complete, lat, lon, alt)
	}
}
