import { observer, useLocalObservable } from 'mobx-react-lite'
import AMapLoader from '@amap/amap-jsapi-loader'
import { useEffect, useState } from 'react'
// import './MapContainer.css'
window._AMapSecurityConfig = {
  securityJsCode: '018e7e8962daa5dc0e1bd82abf112183'
}
export const Map = observer(() => {
  const [MapContainer, setMapContainer] = useState<HTMLDivElement>()
  const state = useLocalObservable(() => ({
    map: undefined,
    setMap(map) {
      this.map = map
    }
  }))
  useEffect(() => {
    console.log(MapContainer)
    if (!MapContainer) return
    AMapLoader.load({
      key: 'a09e6a19ebd91c1656a1d89df3683344',
      version: '2.0',
      plugins: [
        'AMap.MouseTool',
        'AMap.Driving',
        'AMap.PolyEditor',
        'AMap.GeoJSON',
        'AMap.Weather',
        'AMap.CitySearch',
        'AMap.TileLayer',
        'AMap.Scale',
        'AMap.HawkEye',
        'AMap.ContextMenu',
        'AMap.DistrictSearch',
        'AMap.Polygon',
        'AMap.Polyline',
        'AMap.Marker',
        'AMap.Geolocation',
        'AMap.OverlayGroup',
        'AMap.LngLat',
        'AMap.GeometryUtil',
        'AMap.Pixel',
        'AMap.RangingTool',
        'AMap.Icon',
        'AMap.Size'
      ]
      // Loca: {
      //   version: '2.0.0'
      // }
    })
      .then((AMap) => {
        console.log(AMap)
        const map = new AMap.Map('map', {
          resizeEnable: true,
          pitchEnable: true,
          pitch: 50,
          viewMode: '3D', //开启3D视图,默认为关闭
          center: [116.397428, 39.90923], //地图中心点
          zoom: 13, //地图显示的缩放级别
          layers: [
            // 高德默认标准图层
            new AMap.TileLayer.Traffic({
              zIndex: 10,
              zooms: [7, 22]
            })
          ]
        })
        // 鹰眼
        map.addControl(new AMap.HawkEye({ isOpen: false }))

        // 比例尺
        map.addControl(new AMap.Scale())

        // 卫星图层
        const layerGroup = new AMap.LayerGroup([
          new AMap.TileLayer.Satellite({
            visible: false
          }),
          new AMap.TileLayer.RoadNet({
            opacity: 1,
            visible: false
          })
        ])
        layerGroup.setMap(map)

        //构造路线导航类
        const driving = new AMap.Driving({
          map: map
          // panel: 'panel'
        })
        // 根据起终点经纬度规划驾车导航路线
        driving.search(
          new AMap.LngLat(116.379028, 39.865042),
          new AMap.LngLat(116.427281, 39.903719),
          function (status, result) {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === 'complete') {
              console.log('SUCCESS')
            } else {
              console.log('Fa')
              console.log(result)
            }
          }
        )
        driving.setMap(map)
        map.setFitView() //地图自适应
      })
      .catch((e) => {
        console.log(e)
      })
  }, [MapContainer])

  return (
    <>
      <div
        id="map"
        ref={(r) => {
          r && setMapContainer(r)
        }}
        className="h-96 w-full"
      ></div>
      {/*<div id="panel"></div>*/}
    </>
  )
})
