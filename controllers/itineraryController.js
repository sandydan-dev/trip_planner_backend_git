const axios = require("axios");
const {
  validateFlightsQueryParams,
  validateHotelsQueryParams,
  validateSitesQueryParams
} = require("../validation/index");

// create an axios instance

const axiosInstance = axios.create({
  baseURL: process.env.MICROSERVICE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    CLIENT_KEY: process.env.CLIENT_KEY,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  },
});

// create input validation

const getFlightsByOriginAndDestination = async (req, res) => {
  // validate input parameters
  const errors = validateFlightsQueryParams(req.query);

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }
  // declare route
  try {
    const { origin, destination } = req.query;

    const response = await axiosInstance.get(
      `/flights/search?origin=${origin}&destination=${destination}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching flights:", error.message);
    res.status(500).json({ message: "Failed to fetch flights data" });
  }
};

const getFlights = async (req, res) => {
  // error handling
  try {
    const test_error = req.query.test_error;
    const rate_limit = req.query.rate_limit;

    const response = await axiosInstance.get(
      `/flights?test_error=${test_error}&rate_limit=${rate_limit}`,
      {
        headers: {
          CLIENT_KEY: process.env.CLIENT_KEY,
          CLIENT_SECRET: process.env.CLIENT_SECRET,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching flights:", error.message);

    if (error.response.status === 429) {
      console.log(
        "Rate limit exceeded. Please try again later.".error.response.status
      );

      return res
        .status(429)
        .json({ error: "Rate limit exceeded, Please try again later" });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      console.error(error.response.data.error, "Internal server error:");
      return res
        .status(500)
        .json({ error: "Simulated for error testing purposes." });
    }

    return res.status(500).json({ message: "Failed to fetch flights data" });
  }
};

// getHotels

const getHotelsByNameAndLocation = async (req, res) => {
  // validate input parameters
  const errors = validateHotelsQueryParams(req.query);
  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  try {
    const { name, location } = req.query;
    const response = await axiosInstance.get(
      `/hotels/search?name=${name}&location=${location}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching flights:", error.message);
    res.status(500).json({ message: "Failed to fetch flights data" });
  }
};

const getHotels = async (req, res) => {
  try {
    const test_error = req.query.test_error;
    const rate_limit = req.query.rate_limit;

    const response = await axiosInstance.get(
      `/hotels?test_error=${test_error}&rate_limit=${rate_limit}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching hotels:", error.message);

    if (error.response.status === 429) {
      console.log("Rate limit exceeded. Please try again later.");
      return res
        .status(429)
        .json({ error: "Rate limit exceeded, Please try again later" });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      console.error(error.response.data.error, "Internal server error:");
      return res
        .status(500)
        .json({ error: "Simulated for error testing purposes." });
    }

    res.status(500).json({ message: "Failed to fetch hotels data" });
  }
};

// site

const getSitesByNameAndLocation = async (req, res) => {
  // validate input parameters
  const errors = validateSitesQueryParams(req.query);
  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  try {
    const { name, location } = req.query;
    const response = await axiosInstance.get(
      `/sites/search?name=${name}&location=${location}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching site hotels:", error.message);
    res.status(500).json({ message: "Failed to fetch site sites details" });
  }
};

const getSites = async (req, res) => {
  try {
    const test_error = req.query.test_error;
    const rate_limit = req.query.rate_limit;

    const response = await axiosInstance.get(
      `/sites? test_error=${test_error}&rate_limit=${rate_limit}`
    );

    res.json(response.data);
  } catch (error) {
    if (error.response.status === 429) {
      console.log("Rate limit exceeded. Please try again later.");
      return res
        .status(429)
        .json({ error: "Rate limit exceeded, Please try again later" });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      console.error(error.response.data.error, "Internal server error:");
      return res
        .status(500)
        .json({ error: "Simulated for error testing purposes." });
    }

    console.error("Error fetching sites:", error.message);
    res.status(500).json({ message: "Failed to fetch sites data" });
  }
};

module.exports = {
  getFlights,
  getHotels,
  getSites,
  getFlightsByOriginAndDestination,
  getHotelsByNameAndLocation,
  getSitesByNameAndLocation,
};
