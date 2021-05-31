<template>
	<view>
		<view class="list">
			<view class="item">
				<image src="/static/logo.png"></image>
				<view class="righttext">
					<view><text>text1</text></view>
					<view><text>text2</text></view>
			
				</view>
			</view>
		</view>
		<button type="primary" @click="test">loading点击</button>
		<button type="primary" @click="test2">modal点击</button>
		<button type="primary" @click="test3">actionSheet点击</button>
		<button type="primary" @click="test4">测试</button>
		<button type="primary" @click="testsocket">连接socket</button>
		<button type="primary" @click="sendMsg">发送消息</button>
		<button type="primary" @click="closesocket">关闭socket</button>
		
		
		
		<view  class="main">
		       <view class="box" :class="{'active':isActive}" @click="isActive = !isActive">
		           <image class="img" src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/9c877c50-2f0c-11eb-899d-733ae62bed2f.png" mode="aspectFill"></image>
		       </view>
		   </view>
		  <view>
		         <view class="box2" :class="{'active2':isActive}" @click="isActive = !isActive">
		             <image class="img" src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/9c877c50-2f0c-11eb-899d-733ae62bed2f.png" mode="aspectFill"></image>
		         </view>
		     </view>
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				 "isActive":false,
				 "socket":"",
			}
		},
		created() {
			setTimeout(()=>{
				this.isActive = !this.isActive;
			},2000);
		},
		methods: {
			
			test(){
				uni.showLoading({
				    title: '加载中'
				});
				setTimeout(function () {
				    uni.hideLoading();
				}, 2000);
			},
			test2(){
				uni.showModal({
					title:"确认吗？",
					 success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				
			},
			test3(){
				uni.showActionSheet({
				    itemList: ['A', 'B', 'C'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			test4(){
				uni.showNavigationBarLoading();
				setTimeout(function () {
					uni.hideNavigationBarLoading()
				}, 2000);
			},
			closesocket(){
				this.socket.close();
			},
			sendMsg(){
				if(this.socket){
					this.socket.send("这是来自客户端的消息" + location.href + new Date());
				}
					
			},
			testsocket(){
				
				//socket = new WebSocket("ws://localhost:9094/starManager/websocket/张三");
						var socket;
						if(typeof(WebSocket) == "undefined") {
							console.log("您的浏览器不支持WebSocket");
						}else{
							console.log("您的浏览器支持WebSocket");
							
							//实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
							//socket = new WebSocket("ws://localhost:9094/starManager/websocket/张三")
							socket = new WebSocket("ws://localhost:3333/websocket");
							this.socket = socket;
							//打开事件
							socket.onopen = function() {
								console.log("Socket 已打开");
								//socket.send("这是来自客户端的消息" + location.href + new Date());
							};
							//获得消息事件
							socket.onmessage = function(msg) {
								console.log(msg.data);
								//发现消息进入    调后台获取
								
								
							};
							//关闭事件
							socket.onclose = function() {
								console.log("Socket已关闭");
							};
							//发生了错误事件
							socket.onerror = function() {
								alert("Socket发生了错误");
							}
							
				 
				//                            		$("#btnSend").click(function() {
				//                            			socket.send("这是来自客户端的消息" + location.href + new Date());
				//                            		});
				//
				//                            		$("#btnClose").click(function() {
				//                            			socket.close();
				//                            		});
				
				}
			}
		}
	}
</script>

<style lang="scss">
	.list{
		height: 300rpx;
		background: #F1F1F1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.item{
		display: flex;
		justify-content: center;
		image{
			height: 200rpx;
			width: 200rpx;
		}
		.righttext{
			margin-left: 20rpx;
			display: flex;
			justify-content: space-around;
			flex-direction: column;
		}
		
	}
	.main{
		display: flex;
		align-items: center;
		justify-content: center;
	}
    .box{
        margin:20px;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        width:200rpx;
        height:200rpx;
        background-color: #007AFF;
        transition-property: width, height, background-color,opacity;
        transition-duration:3s;
        transition-delay:0.1s;
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1.0);
    }
    .active{
        width:700rpx;
        height:600rpx;
        background-color: #6bd8ff;
		opacity: 0.3;
		

		 
    }
	.box2{
		  box-shadow: inset 3px 5px 20px rgb(255, 69, 0);
	}
	.active2{
	  transition-duration:3s;
	  transform:translateX(245px);
	}
    .img{
        width:80rpx;
        height:80rpx;
    }
</style>
