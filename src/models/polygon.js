
const mongoose = require('mongoose')
require('../db/mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
    district_id: {
        type: Number,
        required: true
      },
      city_id: {
        type: Number,
        required: true
      },
      country_id: {
        type: Number,
        required: true
      },
    area_polygon: {
      type: {
           type: String,
           default: "Polygon" 
        },
      coordinates: {
        type:[[[Number]]],
        required: true
      }
    },
    owner : {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  }
  },{
    toJson: {
      virtual: true
    }
  })
  schema.index({ 'area_polygon': '2dsphere' })

  schema.statics.findByCoordinate = function (coordinates, _id) {
    let [a, b] = coordinates
    console.log(coordinates);
    
    // if (!a || !b){
    //   throw new Error
    // }
    return this.find({_id, area_polygon:
      {$geoIntersects:
          {$geometry:{ "type" : "Point", coordinates}
        }
      }
  })
  }
const Polygon = mongoose.model('Polygon', schema)

// const test = new Polygon({
//     name: 'fourCorners',
//     geo: {
//       type: 'Polygon',
//       coordinates: [[ [0,0], [0,4], [4,4], [4,0], [0,0] ]]
//     }
//   })

// console.log(test)


module.exports = Polygon