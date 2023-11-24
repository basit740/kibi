const Location = require("../models/Location"); // Import Location model
const { getLocations } = require("../utils/intiut");
const Companies = require("../models/Companies");
const Users = require("../models/Users");
exports.getLocations = async (req, res) => {
  const companyId = req.query.companyId;

  if (!companyId) {
    return res.status(400).json({ message: "Company ID is required" });
  }

  try {
    const company = await Companies.findOne(
      { Kibi_CompanyId: companyId },
      "_id"
    ).exec();
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const locations = await Location.find({ Kibi_CompanyId: company._id })
      .select("Id LocationName Kibi_AvailableForSelection")
      .exec();

    res.json({
      status: "200",
      data: locations,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.storeLocations = async (data) => {
  const { userInfo, companyInfo, locations } = data;

  const user = await Users.findOne({ email: userInfo.email }, "_id").exec();
  if (!user) return;

  const key = `${companyInfo.CompanyInfo.Id}-${userInfo.email}`;
  const company = await Companies.findOne(
    { Kibi_CompanyId: key },
    "_id"
  ).exec();
  if (!company) return;

  let createOps = [];
  let updateOps = [];
  const db_locations = await Location.find({ Kibi_CompanyId: company._id });
  console.log(locations);
  locations.forEach((loc) => {
    const locationKey = `${key}-${loc.id}`;
    const locationData = {
      Kibi_User: user._id,
      Kibi_CompanyId: company._id,
      Kibi_LocationId: locationKey,
      LocationName: loc.name,
      Id: loc.id,
      // Other fields as necessary
    };

    const existingLocation = db_locations.find(
      (l) => l.Kibi_LocationId === locationKey
    );
    if (existingLocation) {
      updateOps.push({
        updateOne: {
          filter: { Kibi_LocationId: locationKey },
          update: { $set: locationData },
        },
      });
    } else {
      createOps.push({ insertOne: { document: locationData } });
    }
  });

  if (createOps.length > 0) await Location.bulkWrite(createOps);
  if (updateOps.length > 0) await Location.bulkWrite(updateOps);
};
