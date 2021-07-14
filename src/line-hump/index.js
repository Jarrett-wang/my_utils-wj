/**
 * 工具函数
 */

// 下划线转换驼峰
const toHump = function (name) {
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}
// 驼峰转换下划线
const toLine = function (name) {
  if (/^textAsset(.*)(Display)$/.test(name)) {
    return name.replace(/textAsset(.*)Display$/, function (str, temp) { return 'text_asset_' + temp.toLowerCase() + '_display' })
  } else if (/^textAsset/.test(name)) {
    return name.replace(/^textAsset(.*)/, function (str, temp) { return 'text_asset_' + temp.toLowerCase() })
  } else if (/^fileAsset(.*)(Display)$/.test(name)) {
    return name.replace(/fileAsset(.*)Display$/, function (str, temp) { return 'file_asset_' + temp.toLowerCase() + '_display' })
  } else if (/^fileAsset/.test(name)) {
    return name.replace(/^fileAsset(.*)/, function (str, temp) { return 'file_asset_' + temp.toLowerCase() })
  } else if (/^numericAsset(.*)(Display)$/.test(name)) {
    return name.replace(/numericAsset(.*)Display$/, function (str, temp) { return 'numeric_asset_' + temp.toLowerCase() + '_display' })
  } else if (/^numericAsset/.test(name)) {
    return name.replace(/^numericAsset(.*)/, function (str, temp) { return 'numeric_asset_' + temp.toLowerCase() })
  } else if (/^datetimeAsset(.*)(Display)$/.test(name)) {
    return name.replace(/datetimeAsset(.*)Display$/, function (str, temp) { return 'datetime_asset_' + temp.toLowerCase() + '_display' })
  } else if (/^datetimeAsset/.test(name)) {
    return name.replace(/^datetimeAsset(.*)/, function (str, temp) { return 'datetime_asset_' + temp.toLowerCase() })
  } else if (/^textAreaAsset(.*)(Display)$/.test(name)) {
    return name.replace(/textAreaAsset(.*)Display$/, function (str, temp) { return 'text_area_asset_' + temp.toLowerCase() + '_display' })
  } else if (/^textAreaAsset/.test(name)) {
    return name.replace(/^textAreaAsset(.*)/, function (str, temp) { return 'text_area_asset_' + temp.toLowerCase() })
  } else {
    return name.replace(/([A-Z])/g, "_$1").toLowerCase();
  }
}
// 分割url获得参数对象的函数
const filterParameters = function (url) {
  let objTemp = {};
  if (url.indexOf('?') !== -1) {
    let tempArr = url.split('?');
    let strs = tempArr[1] ? tempArr[1].split('&') : [];
    _.each(strs, (value) => {
      let arrKeyValue = value.split('=');
      objTemp[arrKeyValue[0]] = JSON.parse(decodeURIComponent(arrKeyValue[1]))
    })
  }
  return objTemp;
}
//便利整个数据结构把所有属性名为驼峰的转化为下划线
const filterKeyToLine = function (tempObj) {
  if (_.isArray(tempObj)) {
    _.each(tempObj, (value, key) => {
      filterKeyToLine(value);
    })
  } else if (_.isObject(tempObj)) {
    _.each(tempObj, (value, key) => {
      if (key !== toLine(key)) {
        tempObj[toLine(key)] = value;
        delete tempObj[key];
      }
      filterKeyToLine(value);
    })
  }
}
//自定义属性下划线还原
const rollBackLine = function (str) {
  let tempIndex = str.indexOf('Asset');
  let tempBool = false;
  if (str !== 'textAssetCeeced' && tempIndex !== -1) {
    let tempReg = new RegExp("[0-9]+");
    tempBool = tempReg.test(str[tempIndex + 5]);
    if (tempBool) {
      str = str.slice(0, (tempIndex + 5)) + '_' + str.slice((tempIndex + 5));
    }
  }
  return {
    keyParam: str,
    boolParam: tempBool,
  };
}

//定义临时全局变量给切换token处使用
const setOrgListTempTokenOnce = function (str) {
  window.orgListTempToken = str;
}
//取出临时token，用完即删除
const getOrgListTempTokenOnce = function (str) {
  let temp = window.orgListTempToken;
  window.orgListTempToken = undefined;
  return temp
}

//编辑表单刚调用详情后，把自定义图片数组处理成自定义name对应值为attachmentId的数组，name+url拼接的属性名对应值为url数组
const composeAssetImgToIdsAndUrls = function (objTemp) {
  _.each(objTemp,(value,key) =>{
    if (/^file_asset/.test(key) && 'attachment_ids' in value) {
      let tempArr =  _.get(value,'attachment_ids',[]);
      let tempIdsArr = tempArr.map((d)=>{
        return _.get(d,'id','')
      });
      let tempAttachmentableIdsArr = tempArr.map((d)=>{
        return _.get(d,'attachmentable_id','')
      });
      let tempUrlsArr = tempArr.map((d)=>{
        return _.get(d,'file_url','')
      });
      objTemp[key] = { 'attachment_ids' : tempIdsArr, image_attachment_ids: tempAttachmentableIdsArr};
      objTemp[key+'urls'] = tempUrlsArr
    }
    if(/^file_asset/.test(key) && _.isArray(value)){
      let tempArr =  value;
      let tempIdsArr = tempArr.map((d)=>{
        return _.get(d,'id','')
      });
      let tempAttachmentableIdsArr = tempArr.map((d)=>{ // 多加了一个附件（图片）id数组，当删除时需要传对应的attachmentable_id过去
        return _.get(d,'attachmentable_id','')
      });
      let tempUrlsArr = tempArr.map((d)=>{
        return _.get(d,'file_url','')
      });
      objTemp[key] = { 'attachment_ids' : tempIdsArr, image_attachment_ids: tempAttachmentableIdsArr};
      objTemp[key+'urls'] = tempUrlsArr
    }
    if(key === 'all_attachments' && _.isArray(value)){
      let tempArr =  value;
      let tempIdsArr = tempArr.map((d)=>{
        return _.get(d,'id','')
      });
      let tempAttachmentableIdsArr = tempArr.map((d)=>{
        return _.get(d,'attachmentable_id','')
      });
      let tempUrlsArr = tempArr.map((d)=>{
        return _.get(d,'file_url','')
      });
      objTemp['attachments'] = { 'attachment_ids' : tempIdsArr, image_attachment_ids: tempAttachmentableIdsArr};
      objTemp['attachmentsurls'] = tempUrlsArr
    }
    if(key === 'attachment' && !_.isEmpty(value)){//产品图片
      objTemp['attachment'] = { 'attachment_ids' : [_.get(value,'id',[])], image_attachment_ids: [_.get(value,'attachmentable_id',[])]};
      objTemp['attachmenturls'] = [_.get(value,'file_url','')]
    }
  })
}


export {
  toHump,
  toLine,
  filterParameters,
  filterKeyToLine,
  rollBackLine,
  setOrgListTempTokenOnce,
  getOrgListTempTokenOnce,
  composeAssetImgToIdsAndUrls,
};