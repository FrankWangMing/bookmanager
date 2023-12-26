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
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          position: 'RB', //定位按钮的停靠位置
          offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
          zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
        })
        geolocation.getCurrentPosition((status, result) => {
          if (status == 'complete') {
            console.log(result)
            // document.getElementById('status').innerHTML = '定位成功'
            // var str = []
            // str.push('定位结果：' + data.position)
            // str.push('定位类别：' + data.location_type)
            // if (data.accuracy) {
            //   str.push('精度：' + data.accuracy + ' 米')
            // } //如为IP精确定位结果则没有精度信息
            // str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'))
            // document.getElementById('result').innerHTML = str.join('<br>')
          } else {
            console.log(result)
          }
        })

        // // 获取输入提示信息
        // function autoInput(){
        //   var keywords = document.getElementById("input").value;
        //   AMap.plugin('AMap.AutoComplete', function(){
        //     // 实例化Autocomplete
        //     var autoOptions = {
        //       city: '全国'
        //     }
        //     var autoComplete = new AMap.Autocomplete(autoOptions);
        //     autoComplete.search(keywords, function(status, result) {
        //       // 搜索成功时，result即是对应的匹配数据
        //       var node = new PrettyJSON.view.Node({
        //         el: document.querySelector("#input-info"),
        //         data: result
        //       });
        //     })
        //   })
        // }
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
        className="w-full"
        style={{ height: '90vh' }}
      ></div>
      {/*<div id="panel"></div>*/}
    </>
  )
})
