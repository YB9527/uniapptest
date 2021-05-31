<template>
	<view class="content">
		<uploadFile :uploadAttr="uploadAttr"></uploadFile>

		 <scroll-view  style="height: 300px;" scroll-y="true" >
			 
			<view  class="scroll-view-item_H uni-bg-red"">
				<button type="primary" @click="test()">AAA</button>
			</view>
			<view  class="scroll-view-item_H uni-bg-red"">
				<button type="primary" @click="test()">AAA</button>
			</view>
			<view  class="scroll-view-item_H uni-bg-red"">
				<button type="primary" @click="test()">AAA</button>
			</view>
			<view  class="scroll-view-item_H uni-bg-red"">
				<button type="primary" @click="wxuploadtest()">上传</button>
			</view>
			<view  class="scroll-view-item_H uni-bg-green">B</view>
			<view  class="scroll-view-item_H uni-bg-red">A</view>
			<view  class="scroll-view-item_H uni-bg-green">B</view>
			<view  class="scroll-view-item_H uni-bg-red">A</view>
			<view  class="scroll-view-item_H uni-bg-green">B</view>
			<view  class="scroll-view-item_H uni-bg-red">A</view>
			<view  class="scroll-view-item_H uni-bg-green">B</view>
			<view  class="scroll-view-item_H uni-bg-red">A</view>
			<view  class="scroll-view-item_H uni-bg-green">B</view>
			<view  class="scroll-view-item_H uni-bg-red">A</view>
			<view  class="scroll-view-item_H uni-bg-green">B</view>
			<view  class="scroll-view-item_H uni-bg-red">A</view>
			<view  class="scroll-view-item_H uni-bg-green">B</view>
			<view  class="scroll-view-item_H uni-bg-red">A</view>
			<view  class="scroll-view-item_H uni-bg-green">B</view>
			<view  class="scroll-view-item_H uni-bg-red">A</view>
			<view  class="scroll-view-item_H uni-bg-green">B</view>
			<view  class="scroll-view-item_H uni-bg-red">A</view>
			<view  class="scroll-view-item_H uni-bg-green">B</view>
			<view  class="scroll-view-item_H uni-bg-red">A</view>
			<view  class="scroll-view-item_H uni-bg-green">B</view>
			<view  class="scroll-view-item_H uni-bg-red">A</view>
			<view  class="scroll-view-item_H uni-bg-green">B</view>
			<view  class="scroll-view-item_H uni-bg-red">A</view>
			<view  class="scroll-view-item_H uni-bg-green">Bbbb</view>
		 </scroll-view>
	</view>
</template>

<script>
	import uploadFile from './uploadFile.vue'
	export default {
		components:{uploadFile},
		data() {
			return {
				title: 'Hello',
				num:0,
				show: true,
				uploadAttr: {
					/* #ifdef  MP-WEIXIN */
					h5disabled:true,
					/* #endif */
					readonly: false,
					url: "http://baidu.com",
					imageValue: [],
					
				}
			}
		},
		onLoad() {

		},
		mounted() {

		},
		methods: {
			test(){
				this.num++;
				let url;
				 if(this.num % 2 === 0){
					url = "/pages/pagesA/testA/testA";
				}else{
					url = "/pages/pagesB/testB/testB";
				} 
				uni.navigateTo({
				    url: url,
				});
			},
			// 数据初始化
			async save(callback) {
				
			},
			async saveFile() {
				//没有保存的文件才保存，uuid有的话证明刚选的文件
				if(this.uploadAttr.imageValue.length > 0 && this.uploadAttr.imageValue[0].uuid){
					let ywh = this.applicationInfo.zjdsqqk.ywh;
					let ath_file = {
						object_id: ywh,
						file_id: ywh+"承诺书",
						table_name: "promise",
						file_path: ywh + "\\承诺书",
					};
					//console.log(this.uploadAttr.imageValue[0]);
					//await this.$Api.saveFile("\承诺书", this.uploadAttr.imageValue[0], ath_file);
					//console.log(ath_file);
				}
			},
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
			}
		}
	}
</script>

<style>
	.uni-file-picker{
		height: 300rpx;
		width: 750rpx;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	
</style>
