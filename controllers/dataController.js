const {
  flight: flightModel,
  hotel: hotelModel,
  itinerary: itineraryModel,
  itineraryItem: itineraryItemModel,
  site: siteModel,
} = require("../models");

const createItinerary = async (req, res) => {
  try {
    const { flights, hotels, sites, name } = req.body;
    const newItinerary = await itineraryModel.create({ name });

    // flight model
    if (flights && flights.length > 0) {
      for (const flight of flights) {
        const savedFlight = await flightModel.create(flight);

        await itineraryItemModel.create({
          itineraryId: newItinerary.id,
          itemId: savedFlight.id,
          type: "flight",
        });
      }
    }

    // hotel model
    if (hotels && hotels.length > 0) {
      for (const hotel of hotels) {
        const savedHotel = await hotelModel.create(hotel);

        await itineraryItemModel.create({
          itineraryId: newItinerary.id,
          itemId: savedHotel.id,
          type: "hotel",
        });
      }
    }

    // site

    if (sites && sites.length > 0) {
      for (const site of sites) {
        const savedSite = await siteModel.create(site);

        await itineraryItemModel.create({
          itineraryId: newItinerary.id,
          itemId: savedSite.id,
          type: "site",
        });
      }
    }

    res.status(201).json({
      message: "itinerary Created successfully",
      itinerary: newItinerary,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error to creating itinerary" });
  }
};

// get itinerary details 

const getItinerary = async (req, res) => {
  try {
    const itinerary = await itineraryModel.findByPk(req.params.id);

    if (!itinerary) {
      res.status(404).json({ message: "Itinerary not found." });
    }

    // find all itineraryModel
    const items = await itineraryItemModel.findAll({
      where: { itineraryId: itinerary.id },
    });

    const flights = [];
    const hotels = [];
    const sites = [];

    for (const item of items) {
      if (item.type === "flight") {
        const flight = await flightModel.findByPk(item.itemId);
        if (flight) flights.push(flight);
      } else if (item.type === "hotel") {
        const hotel = await hotelModel.findByPk(item.itemId);
        if (hotel) hotels.push(hotel);
      } else {
        const site = await siteModel.findByPk(item.itemId);
        if (site) sites.push(site);
      }
    }
    res.json({
      itinerary,
      flights,
      hotels,
      sites,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error to get itinerary details" });
  }
};

module.exports = { createItinerary, getItinerary };
