<template>
	<uni-file-picker
		:disabled="th.h5disabled"
		@delete="deleteUniFile"
		@select="select" :url="th.url" :auto-upload="false"
		 v-model="uploadAttr.imageValue" file-mediatype="image" mode="grid"
		file-extname="jpeg,png,jpg" :limit="uploadAttr.limit" :readonly="uploadAttr.readonly" >
		<!-- #ifdef  MP-WEIXIN -->
		<view class="uploadbtn" @click="wxuploadtest">选择图片</view>
		 <!-- #endif -->
		</uni-file-picker>
</template>

<script>

	
	export default{
		props:{
			uploadAttr: {
				readonly: false,
				limit:1,
				imageValue: [],
			},
			info:{
				ywh:"",
				table_name:"",
				
			}
		},
		data(){
			return {
				th:{
					/* #ifdef  MP-WEIXIN */
					h5disabled:true,
					/* #endif */
					url: "http://baidu.com",
					
				}
				
			}
		},
		created() {
			this.findImg();
		},
		methods: {

			deleteUniFile({tempFile,tempFilePath}){
				for (var i = 0; i < this.uploadAttr.imageValue.length; i++) {
					if(this.uploadAttr.imageValue[i].path === tempFile.path){
						this.uploadAttr.imageValue.splice(i,1);
					}
				}
			},
			// 获取上传状态
			select(e) {
				this.uploadAttr.imageValue = [...this.uploadAttr.imageValue, ...e.tempFiles, ];
			},
			wxuploadtest(){
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        // 获取的格式是数组，多选会同时返回，单选只返回一项
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						for (let tempFile of tempFilePaths) {
							this.uploadAttr.imageValue.push({path:tempFile});
						}
				    }
				});
			},
			findImg() {
				let ywh = this.info.ywh;
				let table_name = this.info.table_name;
					if(ywh && table_name){
						zjdsqRequest.findAthFile(ywh,table_name)
							.then(datas=>{
								if(datas && datas.length > 0){
									for (let ath_file of datas) {
										if(ath_file){
											let promiseImgURL =(config.athroot_url +  ath_file.file_path).replace(/\\/g,"/");
											this.uploadAttr.imageValue.push({path:promiseImgURL});
										}
									}
								}
						})
					}
				},
			async saveFile() {
				let ywh = this.info.ywh;
				let table_name = this.info.table_name;
				//没有保存的文件才保存，uuid有的话证明刚选的文件
				if(this.uploadAttr.imageValue.length > 0){
					for (let imagValue of  this.uploadAttr.imageValue) {
						if(imagValue.uuid){
							let ath_file = {
								object_id: ywh,
								file_id: this.$Tool.uuid(),
								table_name: table_name,
								file_path: ywh + "\\"+table_name,
							};
							//console.log(this.uploadAttr.imageValue[0]);
							await this.$Api.saveFile("\\"+table_name, imagValue, ath_file);
							//console.log(ath_file);
						}
					}
					
				}
			}
		}
	}
</script>

<style>
</style>
