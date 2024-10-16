// validation function

function validateFlightsQueryParams(query) {
  const errors = [];
  if (!query.origin) {
    errors.push("Origin is required!");
  }

  if (!query.destination) {
    errors.push("Destination is required!");
  }

  return errors;
}

function validateHotelsQueryParams(query) {
    // validate query parameters here
  
    const inputError = [];
  
    if (!query.name) {
      inputError.push("Name is required");
    }
  
    if (!query.location) {
      inputError.push("Location is required");
    }
  
    return inputError;
  }


  // sites

  function validateSitesQueryParams(query) {
    const errors = [];
  
    if (!query.name) {
      errors.push("Name is required");
    }
  
    if (!query.location) {
      errors.push("Location is required");
    }
  
    return errors;
  }

module.exports = { validateFlightsQueryParams, validateHotelsQueryParams, validateSitesQueryParams };
