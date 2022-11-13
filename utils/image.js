// //区分APP与H5不同端调用不同的方法
// // #ifdef APP-PLUS 
// /**
//  * APP端图片压缩
//  *  参数说明：
//  *  img 图片url
//  *  scale缩放比例 1-100
//  *  callback 回调设置返回值 
// */
//  translateapp(res.tempFilePaths[0], 80, imgUrl => {
// 	//打印压缩后返回的图片url
// 	 console.log(imgUrl );	
//  })
// // #endif

// // #ifdef H5
// /**
//  * H5端图片压缩
//  *  参数说明：
//  *  imgSrc 图片url
//  *  scale缩放比例 0-1
//  *  type 返回图片类型：base64、blob（默认blob）   
//  *  callback 回调设置返回值 
// */
// translate(res.tempFilePaths[0], 0.7, ' ', imgUrl => {
// 	 //打印压缩后返回的图片url			
// 	  console.log(imgUrl );	
// })
// // #endif


/**
 * APP端图片压缩
 *  参数说明：
 *  img 图片url
 *  scale缩放比例 1-100
 *  callback 回调设置返回值 
*/
export function translateapp(img, scale, callback) {
 
		plus.io.resolveLocalFileSystemURL(img, (entry) => { //通过URL参数获取目录对象或文件对象
			entry.file((file) => { // 可通过entry对象操作图片 
				console.log('压缩前图片信息:' + JSON.stringify(file)); //压缩前图片信息
				if (file.size > 504800) { //   如果大于500Kb进行压缩
					plus.zip.compressImage({ // 5+ plus.zip.compressImage 了解一下，有详细的示例
						src: img, //src: 压缩原始图片的路径    
						dst: img.replace('.png', 'yasuo.png').replace('.PNG',
								'yasuo.PNG').replace('.jpg', 'yasuo.jpg')
							.replace('.JPG', 'yasuo.JPG'),
						width: '40%', //dst: (String 类型 )压缩转换目标图片的路径，这里先在后面原始名后面加一个yasuo区分一下
						height: '40%', //width,height: (String 类型 )缩放图片的宽度,高度
						quality: scale, //quality: (Number 类型 )压缩图片的质量
						overwrite: true, //overwrite: (Boolean 类型 )覆盖生成新文件
						// format:'jpg'   //format: (String 类型 )压缩转换后的图片格式
					}, (event) => {
						console.log('压缩后图片信息:' + JSON.stringify(event)); 
						//返回压缩后的图片路径
						callback(event.target);
					}, function(err) {
						 console.log('Resolve file URL failed: ' + err.message);
					});
				} else { //else小于500kb跳过压缩，直接返回现有的src
					callback(img);
					
				}
			});
		}, (e) => { // 返回错误信息
			 console.log('Resolve file URL failed: ' + e.message);
		});
	
}
/**
 * H5端图片压缩
 *  参数说明：
 *  imgSrc 图片url
 *  scale缩放比例 0-1
 *  type 返回图片类型  默认blob 
 *  callback 回调设置返回值 
*/
export function translate(imgSrc, scale, type , callback) {
	// #ifdef MP-WEIXIN
	wx.compressImage({
	  src: imgSrc, // 图片路径
	  quality: 80 ,// 压缩质量
	  success:function(data){
		  const res =  wx.getFileSystemManager().readFileSync(data.tempFilePath,'base64')
		  let return_res = "data:image/png;base64,"+res
		  callback(return_res)
	  }
	})
	return ;
	// if(type == 'base64'){
	// 	callback(base64);
	// }else{
	// 	var blob = base64ToBlob(base64); 
	// 	var blobUrl = window.URL.createObjectURL(blob);//blob地址
	// 	callback(blobUrl);
	// }
	// callback(imgSrc)
	// #endif 
	
	var img = new Image();
	
	img.src = imgSrc;
	img.onload = function() {
		var that = this;
		var h = that.height; // 默认按比例压缩
		var w = that.width;
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var width = document.createAttribute("width");
		width.nodeValue = w;
		var height = document.createAttribute("height");
		height.nodeValue = h;
		canvas.setAttributeNode(width);
		canvas.setAttributeNode(height);
		ctx.drawImage(that, 0, 0, w,h);
		var base64 = canvas.toDataURL('image/jpeg', scale);//压缩比例
		canvas = null;
		if(type == 'base64'){
			callback(base64);
		}else{
			var blob = base64ToBlob(base64); 
			var blobUrl = window.URL.createObjectURL(blob);//blob地址
			callback(blobUrl);
		}
	}
}
// base转Blob
export function base64ToBlob(base64) { 
	var arr = base64.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {
		type: mime
	});
}
