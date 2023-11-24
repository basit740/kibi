const Class = require("../models/Class"); // Import Class model
const Companies = require("../models/Companies");
const Users = require("../models/Users");
const { getClasses } = require("../utils/intiut");

exports.getClasses = async (req, res) => {
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

    const classes = await Class.find({ Kibi_CompanyId: company._id })
      .select("Id ClassName Kibi_AvailableForSelection")
      .exec();

    res.json({
      status: "200",
      data: classes,
    });
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.storeClasses = async (data) => {
  const { userInfo, companyInfo, classes } = data;

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
  const db_classes = await Class.find({ Kibi_CompanyId: company._id });
  console.log(classes);
  classes.forEach((cls) => {
    const classKey = `${key}-${cls.id}`;
    const classData = {
      Kibi_User: user._id,
      Kibi_CompanyId: company._id,
      Kibi_ClassId: classKey,
      ClassName: cls.name,
      Id: cls.id,
      // Other fields as necessary
    };

    const existingClass = db_classes.find((c) => c.Kibi_ClassId === classKey);
    if (existingClass) {
      updateOps.push({
        updateOne: {
          filter: { Kibi_ClassId: classKey },
          update: { $set: classData },
        },
      });
    } else {
      createOps.push({ insertOne: { document: classData } });
    }
  });

  if (createOps.length > 0) await Class.bulkWrite(createOps);
  if (updateOps.length > 0) await Class.bulkWrite(updateOps);
};
