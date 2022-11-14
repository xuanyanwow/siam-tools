<template name="basics">
	<view>
		<cu-custom bgColor="bg-grey" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">场所码</block>
		</cu-custom>


		<view style="display: block;height: 10px;width: 80%;margin:15px auto;text-align: center;">
			{{ tips }}
		</view>
		<view class="cu-tabbar-height"></view>

		<view class="cu-btn line-purple round " style="width: 80%; margin:0 10%;" @click="add">添加</view>

		<scroll-view scroll-y class="page">
			<view class="cu-tabbar-height"></view>
			<view class="nav-list">
				<view class="nav-li" 
					@tap="ViewImage"
					@longtap.stop="longTap"
					:data-url="item.path"
					:data-id="item.id"
					:class="'bg-'+item.color" 
					:style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
					v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.name}}</view>
					<view class="nav-name">{{item.type}}</view>
					<!-- <text :class="'cuIcon-' + item.cuIcon"></text> -->
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
		<view class="cu-modal" :class="showImg?'show':''">
			<view class="cu-dialog">
				<!-- <view class="bg-img" :style="'background-image: url(\'' +  showImgUrl + '\');height:600px;background-size:100% auto;'">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="showImg = false">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view> -->
				<image style="width: 200px; height: 200px; background-color: #eeeeee;" mode="aspectFill" :src="showImgUrl" @error="imageError" :show-menu-by-longpress="true"></image>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="showImg = false">ok</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="base" :content="messageText" :duration="2000" :before-close="true" @close="closeDailog" @confirm="closeDailog"></uni-popup-dialog>
		</uni-popup>
		
		
		<uni-popup ref="longTap" type="dialog">
			<uni-popup-dialog mode="base" content="要删除掉吗?" :duration="2000" :before-close="true" @close="closeLongTapDailog" @confirm="confirmLongTap"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
	import {
		translate,
		translateapp,
		base64ToBlob
	} from "../../utils/image.js"
	
	export default {
		data() {
			return {
				tips:'欢迎~',
				isLongTap:false,
				nowDoId:null,
				elements: [],
				test:[{
					title: '白石龙',
					name: '地铁站',
					color: 'cyan',
				}, {
					title: '上梅林',
					name: '地铁站',
					color: 'cyan',
				}, {
					title: '理想时代大厦',
					name: '办公楼',
					color: 'cyan',
				}, {
					title: '白石龙一区',
					name: '场所码',
					color: 'cyan',
				}],
				showImg:false,
				showImgUrl:'',
				messageText:"",
				share:{
					title:'首页',
					path:'/pages/worker/worker',
					imageUrl:'',
					desc:'',
					content:'',
				}
			}
		},
		onShow: function() {
			this.load();
		},
		methods: {
			load(){
				let _this = this
				uni.request({
				    url: 'https://tools-api.siammm.cn/images/get_all', //仅为示例，并非真实接口地址。
				    data: {
						openid:uni.getStorageSync("openid"),
				    },
					method:"POST",
				    success: (res) => {
						if (res.data.code != 200){
							_this.messageText = res.data.msg || "网络繁忙...";
							_this.$refs.popup.open();
						}else{
							_this.elements = res.data.data.list
							_this.tips = res.data.data.tips
						}
				    }
				});
			},
			add: function() {
				console.log(13)
				uni.navigateTo({
					url: '/pages/worker/add',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('acceptDataFromOpenerPage', {
							data: 'data from starter page'
						})
					}
				});
			},
			ViewImage(e) {
				if (this.isLongTap){
					this.isLongTap = false;
					return ;
				}
				this.showImg = true;
				this.showImgUrl = e.currentTarget.dataset.url
				 return ;
				 
				let blobe = base64ToBlob(e.currentTarget.dataset.url)
				var blobUrl = window.URL.createObjectURL(blobe);
				uni.previewImage({
					urls: [blobUrl],
					current: blobUrl
				});
			},
			closeDailog()
			{
				this.$refs.popup.close()
			},
			closeLongTapDailog(){
				this.$refs.longTap.close()
			},
			confirmLongTap(e){
				let _this = this;
				uni.request({
				    url: 'https://tools-api.siammm.cn/images/delete', //仅为示例，并非真实接口地址。
				    data: {
						openid:uni.getStorageSync("openid"),
						image_id: _this.nowDoId
				    },
					method:"POST",
				    success: (res) => {
						_this.$refs.longTap.close()
						if (res.data.code != 200){
							_this.messageText = res.data.msg || "网络繁忙...";
							_this.$refs.popup.open();
						}else{
							_this.load();
						}
				    }
				});
			},
			longTap(e)
			{
				this.$refs.longTap.open()
				this.isLongTap = true;
				this.nowDoId = e.currentTarget.dataset.id;
			}
		},
		//分享到朋友或群
		    onShareAppMessage(res) {
		        return {
		            title:this.share.title,
		            path:this.share.path,
		            imageUrl:this.share.imageUrl,
		            desc:this.share.desc,
		            content:this.share.content,
		            success(res){
		                uni.showToast({
		                    title:'分享成功'
		                })
		            },
		            fail(res){
		                uni.showToast({
		                    title:'分享失败',
		                    icon:'none'
		                })
		            }
		        }
		    },
		    //分享到朋友圈
		    onShareTimeline(res) {
		        return {
		            title:this.share.title,
		            path:this.share.path,
		            imageUrl:this.share.imageUrl,
		            desc:this.share.desc,
		            content:this.share.content,
		            success(res) {
		                uni.showToast({
		                    title: '分享成功'
		                })
		            },
		            fail(res) {
		                uni.showToast({
		                    title: '分享失败',
		                    icon: 'none'
		                })
		            }
		        }
		    },
	}
</script>

<style>

</style>
