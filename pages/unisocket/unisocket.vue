<template>
	<view>
		<button type="primary" @click="uniapptestsocket">uniapp连接socket</button>
		
		<view>
			<textarea v-model="text"></textarea>
		</view>
		<button type="primary" @click="uniappsendMsg">uniapp发送消息</button>
		<button type="primary" @click="uniappclosesocket">uniapp关闭socket</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:"",
			}
		},
		methods: {
			uniapptestsocket(){
				uni.connectSocket({
				    url: 'ws://localhost:3333/websocket',
					data:"user=client1",
				});
				uni.onSocketMessage(function (res) {
				  console.log('收到服务器内容：' + res.data);
				});
				uni.onSocketOpen(function (res) {
				  console.log('WebSocket连接已打开！');
				});
				uni.onSocketError(function (res) {
				  console.log('WebSocket连接打开失败，请检查！');
				});
			},
			uniappsendMsg(){
			
				uni.sendSocketMessage({
				      data: this.text
				    });
			},
			uniappclosesocket(){
				  uni.closeSocket();
			},
		}
	}
</script>

<style>

</style>
