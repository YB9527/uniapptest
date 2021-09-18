<template>
	<view>
		<u-action-sheet :list="list" v-model="show"></u-action-sheet>
		<button class="u-reset-button">点击登录</button>
		<u-modal v-model="modalshow" content="点击确定进行授权">
			<button open-type="getUserInfo" class="u-reset-button" slot="confirm-button" @getuserinfo="getuserinfo">确定</button>
		</u-modal>
		<u-button @click="modalshow = true">打开modal</u-button>
		<view class="u-flex">
			<view class="tx"><text>1</text> </view>
			<view>2</view>
		</view>
		<u-icon name="photo-fill"></u-icon>
		<u-icon name="photo" color="#2979ff" size="28"></u-icon>
		<u-icon label="uView" size="40" name="https://cdn.uviewui.com/uview/example/button.png"></u-icon>
		<u-image width="100rpx" height="100rpx" :src="src"  shape="circle" :fade="true" duration="4500"></u-image>
		<!-- 点击图片将不会触发clickHandler -->
		<view @tap="clickHandler">
			<view @tap.stop>
				<u-image :src="src"></u-image>
			</view>
		</view>
		<u-button shape="square" :ripple="true"  size="medium">乌啼</u-button>
		<u-row gutter="120">
			<u-col span="3">
				<view class="demo-layout bg-purple">
				</view>
			</u-col>
			<u-col span="9">
				<view class="demo-layout bg-purple-light">
				</view>
			</u-col>
		</u-row>
		<u-cell-group>
			<u-cell-item icon="share" title="停车坐爱枫林晚" :arrow="true" arrow-direction="down"></u-cell-item>
			<u-cell-item icon="map" title="霜叶红于二月花" :arrow="false"></u-cell-item>
		</u-cell-group>
		<u-tag text="一丘之貉" mode="dark" />
		<u-tag text="沆瀣一气" mode="light" />
		<u-tag text="狼狈为奸" mode="plain" />
		<u-tag text="要清楚" closeable :show="tagshow"  />
		<view>
		    <u-rate v-model="value" :colors="colors" :icons="icons" inactive-icon="thumb-up"></u-rate>
		  </view>
		  <u-line-progress :striped="true" :percent="70" :striped-active="true"></u-line-progress>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					text: '点赞',
					color: 'blue',
					fontSize: 28
				}, {
					text: '分享'
				}, {
					text: '评论'
				}],
				show: false,
				modalshow: false,
				tagshow:true,
				src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201410%2F20%2F20141020162058_UrMNe.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625304273&t=5b49cae7683a49234d8415348009f3d4",	
				value: 2,
			    colors: ['#ffc454', '#ffb409', '#ff9500'],
			    icons: ['thumb-down-fill', 'thumb-down-fill', 'thumb-up-fill', 'thumb-up-fill']
			}
		},
		created() {
			
		},
		methods: {
			getuserinfo(res) {
				console.log(res);
			}
		
		}
	}
</script>

<style lang="scss">
	.tx{
		width: 100rpx;
		
	}
	
	
		.wrap {
			padding: 24rpx;
		}
	
		.u-row {
			margin: 40rpx 0;
		}
	
		.demo-layout {
			height: 80rpx;
			border-radius: 8rpx;
		}
	
		.bg-purple {
			background: #d3dce6;
		}
	
		.bg-purple-light {
			background: #e5e9f2;
		}
	
		.bg-purple-dark {
			background: #99a9bf;
		}
</style>
