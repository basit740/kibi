const { getClassDetails } = require('../utils/intiut');


exports.getClasses = async (req, res) => {

    const classes = await getClassDetails()
    console.log(classes)
    res.json({
        status: '200',
        data: classes.classes
    })
}
