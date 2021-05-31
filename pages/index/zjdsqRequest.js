import Api from '@/api/api';

const TABLE_NAME_ZJDSQQK = "T_zjdsqqk";
exports.TABLE_NAME_ZJDSQQK = TABLE_NAME_ZJDSQQK;

const TABLE_NAME_ZJDFLOW = "T_zjdflow";
exports.TABLE_NAME_ZJDFLOW = TABLE_NAME_ZJDFLOW;

const TABLE_NAME_ZGQRXX = "T_zgqrxx";
exports.TABLE_NAME_ZGQRXX = TABLE_NAME_ZGQRXX;

var findTestData = function(){
	return Api.selectSingleData(TABLE_NAME_ZJDSQQK,{id:314})
}
exports.findTestData = findTestData;
/**通过业务号查找宅基地申请
 * @param {Object} ywh
 */
var findZJDSQQKByYWH = function(ywh){
	return Api.selectSingleData(TABLE_NAME_ZJDSQQK,{ywh})
}
exports.findZJDSQQKByYWH = findZJDSQQKByYWH;
/**通过业务号查找宅基地申请流程
 * @param {Object} ywh
 */
var findZJDFlowByYWH = function(ywh){
	return Api.selectArrayData(TABLE_NAME_ZJDFLOW,{ywh})
}
exports.findZJDFlowByYWH = findZJDFlowByYWH;
/**保存宅基地申请情况
 * @param {Object} zjdsqqk
 */
var saveZJDSQQK =async function(zjdsqqk){


	let tableName = "T_zjdsqqk";
	//如果没有id，保存数据
	if(!zjdsqqk.id){
		zjdsqqk.id  = await Api.findMaxId(tableName);
		zjdsqqk.ywh = "zjd-sq-" + await Api.getShortCode();
		zjdsqqk.sqrq = await Api.getDbDateTime();
	}
	let savePo = JSON.parse(JSON.stringify(zjdsqqk));
	//删除不要的属性
	delete savePo.xzjdczqkRadio;
	delete savePo.xzjdczqkText;
	delete savePo.zjdFlow;
	await Api.saveOrUpdate(tableName,savePo);
	//console.log(zjdsqqk);
};
exports.saveZJDSQQK = saveZJDSQQK;

/**通过id 查找 资格权人
 * @param {Object} zgqrId
 */
var findZGQRXXById = function(zgqrId){
	
	return Api.selectSingleData(TABLE_NAME_ZGQRXX,{id:zgqrId});
		
	
};
exports.findZGQRXXById = findZGQRXXById;

/**
 * 查询此人是否有资格
 * 返回资格权人
 */
var findZGQRXX = async function({xm,zjhm}){
	if(xm && zjhm){
		let data =await Api.selectSingleData("T_zgqrxx",{xm,zjhm});
		return data;
	}
	return "";
}
exports.findZGQRXX = findZGQRXX;

/**
 * 查询家庭成员
 */
var searchJTCY = function({bm}){
	
	return Api.selectArrayData("T_jtcyxx",{nhbm:bm});
}
exports.searchJTCY = searchJTCY;

/**
 * 查找文件记录
 * @param {Object} ywh
 * @param {Object} tableName
 */
var findAthFile = function(ywh,tableName){
	let object_id = ywh;
	let table_name = tableName;
	
	return Api.selectArrayData("Ath_file", {object_id,table_name})
		.then(ath_files=> {
			return ath_files
		}) 
}
exports.findAthFile = findAthFile;

/**
 * 保存宅基地流程
 */
var saveZJDFlow =async function(zjdsqqk,sqzt,{result,bz,user}) {
	//1、检查数据是否填写完整
	//2、改变申请状态
	//记录流程
	let zjdflowid =await Api.findMaxId("t_zjdflow");
	let create_time =  await  Api.getDbDateTime();
	let self = this;
	let zjdflow = {
	  id: zjdflowid,
	  ywh: zjdsqqk.ywh,
	  flow_zt: result ? 1 : 0,
	  sqzt: sqzt,
	  bz: bz,
	  create_time: create_time,
	  hander_id:user?user.userid:"",//办理员
	};
	return  Api.saveOrUpdate("T_zjdflow",zjdflow)
	  .then(r=>{
		 zjdsqqk.sqzt = sqzt+1;
		 return  saveZJDSQQK(zjdsqqk);
	  }).then(()=>{
		  return zjdflow;
	  });
  };
  exports.saveZJDFlow = saveZJDFlow;