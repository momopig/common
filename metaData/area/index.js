// 数据源：https://github.com/wecatch/china_regions
import { provinces } from './js/provinces'
import { cities } from './js/cities'
import { countries } from './js/countries'
import { towns } from './js/towns'

const generateTree = (provinces, cities, countries) => {
  var treeData = {
    name: '全部',
    id: '000000',
    children: []
  }
  provinces.map(provinceItem => {
    var provinceObj = {
      name: provinceItem.name,
      id: provinceItem.id,
      parentNode: treeData,
      parentNodeId: treeData.id,
      children: []
    }

    treeData.children.push(provinceObj)
    cities && cities[provinceObj.id] && cities[provinceObj.id].map(cityItem => {
      var cityObj = {
        name: cityItem.name,
        id: cityItem.id,
        parentNode: provinceObj,
        parentNodeId: provinceObj.id,
        children: []
      }
      provinceObj.children.push(cityObj)

      countries && countries[cityObj.id] && countries[cityObj.id].map(countryItem => {
        var countryObj = {
          name: countryItem.name,
          id: countryItem.id,
          parentNode: cityObj,
          parentNodeId: cityObj.id,
          children: []
        }
        cityObj.children.push(countryObj)
      })
    })
  })
  return treeData
}

const areaTree = generateTree(provinces, cities, countries)
const areaTreeWithoutCountries = generateTree(provinces, cities)
const areaTreeOnlyProvinces = generateTree(provinces)

const countryArray = []
for (var cityId in countries) {
  var array = countries[cityId]
  for (let countryObj of array) {
    countryArray.push({
      id: countryObj.id,
      name: countryObj.name,
      parentNodeId: cityId
    })
  }
}
// 测试函数(能够获取市、县)
const getAreaById = (id, callback) => {
  console.log('asyn fetching, please wait...')
  return new Promise((resolve, reject) => {
    var result = countries[id] || cities[id] || towns[id]
    console.log(result)
    setTimeout(() => {
      resolve(result)
    })
  }).then(callback)
}
const getCountryByNameKey = (nameKey, callback) => {
  console.log('asyn searching, please wait...')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var result = countryArray.filter(item => {
        return (item.name.indexOf(nameKey) > -1)
      })
      console.log(result)
      resolve(result)
    })
  }).then(callback)
}

export {
  areaTree,
  areaTreeWithoutCountries,
  areaTreeOnlyProvinces,
  getAreaById,
  getCountryByNameKey
}
