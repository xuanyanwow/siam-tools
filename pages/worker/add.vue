<template>
	<view>
		<cu-custom bgColor="bg-grey" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">场所码</block>
		</cu-custom>
		<form>

			<view class="cu-form-group">
				<view class="title">输入框</view>
				<input placeholder="场所码名称" name="input" @input="inputChange($event)"></input>
			</view>

			<!-- <view class="cu-form-group margin-top">
				<view class="title">场所类型</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:''}}
					</view>
				</picker>
			</view> -->
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}} / 1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
						:data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>

			<view class="padding flex flex-direction">

				<view class="cu-btn lg bg-blue round" @click="submit">提交</view>
			</view>
		</form>
		
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="base" :content="messageText" :duration="2000" :before-close="true" @close="closeDailog" @confirm="closeDailog"></uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	import {
		translate,
		translateapp
	} from "../../utils/image.js" 
	
	import Upyun  from "../../utils/upyun.js"
	
	export default {
		data() {
			return {
				messageText:'',
				title: '',
				index: 0,
				picker: ['场所码', '地铁站', '办公楼'],
				imgList: [],
			};
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			inputChange(e) {
				this.title = e.detail.value
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1)
			},
			RandomIndex(min, max, i){
				const _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';
			    let index = Math.floor(Math.random()*(max-min+1)+min),
			        numStart = _charStr.length - 10;
			    //如果字符串第一位是数字，则递归重新获取
			    if(i==0&&index>=numStart){
			        index = this.RandomIndex(min, max, i);
			    }
			    //返回最终索引值
			    return index;
			},
			getRandomString(len){
				const _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';

			    let min = 0, max = _charStr.length-1, _str = '';
			    //判断是否指定长度，否则默认长度为15
			    len = len || 15;
			    //循环生成字符串
			    for(var i = 0, index; i < len; i++){
			        index = this.RandomIndex(min, max, i);
			        _str += _charStr[index];
			    }
			    return _str;
			},
			submit() {
				const upyun = new Upyun({
				  bucket: 'axuanyan',
				  operator: 'xuanyanpicgo',
				  getSignatureUrl: 'https://tools-api.siammm.cn/images/get_sign',
				})
				
				let _this = this; 
				let fileName =  this.getRandomString(32)
				upyun.upload({
				  localPath: this.imgList[0],
				  remotePath: '/siam-tools/'+fileName,
				  success: function(res) {
					  _this.saveImagesPath('/siam-tools/'+fileName)
				  },
				  fail: function({errMsg}) {
					  console.log(errMsg )
				  },
				})
			},
			saveImagesPath(path){
				let _this = this;
				uni.request({
				    url: 'https://tools-api.siammm.cn/images/save_one', //仅为示例，并非真实接口地址。
				    data: {
				        path:path,
						openid:uni.getStorageSync("openid"),
						title: this.title
				    },
					method:"POST",
				    success: (res) => {
						if (res.data.code != 200){
							_this.messageText = res.data.msg || "网络繁忙...";
							_this.$refs.popup.open();
						}else{
							uni.redirectTo({
								url: './worker'
							});
						}
				    }
				});
			},
			closeDailog()
			{
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
