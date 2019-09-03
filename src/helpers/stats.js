const { Tesis } = require('../models');

async function tesisCounter() {

    return await Tesis.countDocuments();
}

async function TesisTotalViewsCounter() {

    const result = await Tesis.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' }
        }
    }]);
    return result[0].viewsTotal;

}

async function likesTotalCounter() {

    const result = await Tesis.aggregate([{
        $group: {
            _id: '1',
            likesTotal: { $sum: '$likes' }
        }
    }]);
    return result[0].likesTotal;

}
module.exports = async () => {

  const results =  await Promise.all([
        tesisCounter(),
        TesisTotalViewsCounter(),
        likesTotalCounter() 
    ]);


    return {
        tesis: results[0],
        views: results[1],
        likes: results[2]
    }


}