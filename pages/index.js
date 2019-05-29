
import styles from './index.css';
import React, { PureComponent } from 'react'
// import maptalks from 'maptalks'
const maptalks = require('maptalks')
const RoadJSON = require('./RoadJSON.json')
// RoadJSON.type='GeometryCollection'
class IndexPage extends PureComponent {
  componentDidMount() {
    let map = new maptalks.Map('map', {
      center: [120.3, 30.4],
      zoom: 14,
      spatialReference:{
        projection : 'baidu'
      },
      baseLayer: new maptalks.TileLayer('base', {
        'urlTemplate' : 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1',
        'subdomains'  : [0,1,2,3,4,5,6,7,8,9],
        'attribution' :  '&copy; <a target="_blank" href="http://map.baidu.com">Baidu</a>'
      })
    })

    let roadLayer = new maptalks.VectorLayer('roadLayer')
    let lineStringArr = [];
    RoadJSON.features.forEach(element => {
      let coordinates = element.geometry.coordinates
      let _arr = [];
      coordinates.forEach(item => {
        item.splice(2, 1)
        let _item = item.map(Number)
        _arr.push(_item)
      })
      lineStringArr.push(_arr)
    });
    console.log(lineStringArr)

    let roadMultiLineString = new maptalks.MultiLineString([...lineStringArr],{
      visible: true,
      symbol: {
        'lineColor': '#ff0000',
        'lineWidth': 1,
      }
    }).addTo(roadLayer)
    roadLayer.addTo(map)
  }
  render() {
    return(
      <div id="map" style={{width: '100vw',height: '100vh'}}></div>
    )
  }
}

export default IndexPage