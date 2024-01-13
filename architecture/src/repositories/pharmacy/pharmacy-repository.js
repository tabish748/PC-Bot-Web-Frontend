// repositories/userRepository.js

import pharmacyApi from "../../api/pharmacy/pharmacy-api.js";
import {findDrugPricesByZipResponse, findDrugPricesByGeo} from '../response.js'
class PharmacyRepository {
  async findSearchTermSuggestions(data) {
    // return pharmacyApi.findSearchTermSuggestions(data);
    return {
        "resultType": "PharmacySearchTermSuggestions",
        "result": {
            "names": [],
            "locations": [
                "Niagara Falls, New York, NY 14302",
                "Galena, Ohio, OH 43021",
                "Gambier, Ohio, OH 43022",
                "Granville, Ohio, OH 43023",
                "Hebron, Ohio, OH 43025",
                "Hilliard, Ohio, OH 43026",
                "Homer, Ohio, OH 43027",
                "Howard, Ohio, OH 43028",
                "Irwin, Ohio, OH 43029",
                "Akron, Ohio, OH 44302",
                "Green Bay, Wisconsin, WI 54302",
                "Brigham City, Utah, UT 84302"
            ]
        },
        "multiplicity": "SingleObject"
    }
  }

  async findDrugPricesByZip(data) 
  {
    // return pharmacyApi.findSearchTermSuggestions(data);
    if(data)
      return findDrugPricesByZipResponse;
    else
    return findDrugPricesByZipResponse;
  }


    async findDrugPricesByGeo(data) 
    {
      // return pharmacyApi.findSearchTermSuggestions(data);
      return findDrugPricesByGeo;
    }
  }


export default new PharmacyRepository();
