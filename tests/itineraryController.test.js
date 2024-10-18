const {
  getFlightsByOriginAndDestination,
  getHotelsByNameAndLocation,
  getSitesByNameAndLocation,
} = require("../controllers/itineraryController");

const axiosInstance = require("../lib/axios.lib");

// create jest mock function
jest.mock("../lib/axios.lib.js", () => ({
  get: jest.fn(),
}));

// describe mock function
describe("Itinerary Controller Test ", () => {
  // test getFlights
  test("should fetch flights by origin and destination ", async () => {
    const mockResponse = {
      flights: [
        {
          id: 3,
          origin: "mopa",
          destination: "jammu",
          flight_number: "952",
          departure_time: "10/7/2024, 5:37:56 PM",
          arrival_time: "10/7/2024, 10:37:56 PM",
          price: 244.44,
        },
      ],
    };

    axiosInstance.get.mockResolvedValue(mockResponse);

    const req = { query: { origin: "mopa", destination: "jammu" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };

    await getFlightsByOriginAndDestination(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/flights/search?origin=mopa&destination=jammu"
    );
    expect(res.json).toHaveBeenCalledWith(mockResponse.data);
  });

  // test hotels
  test("should fetch hotels by name and location", async () => {
    const mockResponse = {
      hotels: [
        {
          id: 1,
          name: "Bechtelar LLC Hotel",
          location: "Cuttack",
          price_per_night: 29991.83,
          available_rooms: 6,
        },
      ],
    };

    axiosInstance.get.mockResolvedValue(mockResponse);
    const req = { query: { name: "Bechtelar LLC Hotel", location: "Cuttack" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };

    await getHotelsByNameAndLocation(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/hotels/search?name=Bechtelar LLC Hotel&location=Cuttack"
    );

    expect(res.json).toHaveBeenCalledWith(mockResponse.data);
  });

  // get sites
  test("should fetch sites by name and location", async () => {
    const mockResponse = {
      sites: [
        {
          id: 1,
          name: "Steuber, Grimes and Graham Site",
          location: "Daman",
          description: "Admitto carbo assentator comparo.",
        },
      ],
    };
    axiosInstance.get.mockResolvedValue(mockResponse);

    const req = { query: { name: "Steuber, Grimes and Graham Site", location: "Daman" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };

    await getSitesByNameAndLocation(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/sites/search?name=Steuber, Grimes and Graham Site&location=Daman"
    );

    expect(res.json).toHaveBeenCalledWith(mockResponse.data);
  });
});
