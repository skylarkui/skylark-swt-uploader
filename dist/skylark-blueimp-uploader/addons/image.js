/**
 * skylark-blueimp-uploader - The skylark file uploader
 * @author Hudaokeji, Inc.
 * @version v0.0.1
 * @link https://github.com/skylark-integration/skylark-blueimp-uploader/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/eventer","skylark-utils-imagex","skylark-jquery","skylark-jqueryui/widget","../fileupload-ui"],function(e,i,a,t){"use strict";return t.blueimp.fileuploadui.prototype.options.processQueue.unshift({action:"loadImageMetaData",disableImageHead:"@",disableExif:"@",disableExifThumbnail:"@",disableExifSub:"@",disableExifGps:"@",disabled:"@disableImageMetaDataLoad"},{action:"loadImage",prefix:!0,fileTypes:"@",maxFileSize:"@",noRevoke:"@",disabled:"@disableImageLoad"},{action:"resizeImage",prefix:"image",maxWidth:"@",maxHeight:"@",minWidth:"@",minHeight:"@",crop:"@",orientation:"@",forceResize:"@",disabled:"@disableImageResize"},{action:"saveImage",quality:"@imageQuality",type:"@imageType",disabled:"@disableImageResize"},{action:"saveImageMetaData",disabled:"@disableImageMetaDataSave"},{action:"resizeImage",prefix:"preview",maxWidth:"@",maxHeight:"@",minWidth:"@",minHeight:"@",crop:"@",orientation:"@",thumbnail:"@",canvas:"@",disabled:"@disableImagePreview"},{action:"setImage",name:"@imagePreviewName",disabled:"@disableImagePreview"},{action:"deleteImageReferences",disabled:"@disableImageReferencesDeletion"}),t.widget("blueimp.fileuploadui",t.blueimp.fileuploadui,{options:{loadImageFileTypes:/^image\/(gif|jpeg|png|svg\+xml)$/,loadImageMaxFileSize:1e7,imageMaxWidth:1920,imageMaxHeight:1080,imageOrientation:!1,imageCrop:!1,disableImageResize:!0,previewMaxWidth:80,previewMaxHeight:80,previewOrientation:!0,previewThumbnail:!0,previewCrop:!1,previewCanvas:!0},processActions:{loadImage:function(e,i){if(i.disabled)return e;var n=this,s=e.files[e.index],r=t.Deferred();return"number"===t.type(i.maxFileSize)&&s.size>i.maxFileSize||i.fileTypes&&!i.fileTypes.test(s.type)||!a.loadFile(s,function(i){i.src&&(e.img=i),r.resolveWith(n,[e])},i)?e:r.promise()},resizeImage:function(e,i){if(i.disabled||!e.canvas&&!e.img)return e;i=t.extend({canvas:!0},i);var n,s=this,r=t.Deferred(),l=i.canvas&&e.canvas||e.img,d=function(a){a&&(a.width!==l.width||a.height!==l.height||i.forceResize)&&(e[a.getContext?"canvas":"img"]=a),e.preview=a,r.resolveWith(s,[e])};if(e.exif){if(!0===i.orientation&&(i.orientation=e.exif.get("Orientation")),i.thumbnail&&(n=e.exif.get("Thumbnail")))return a.loadFile(n,d,i),r.promise();e.orientation?delete i.orientation:e.orientation=i.orientation}return l?(d(a.scale(l,i)),r.promise()):e},saveImage:function(e,i){if(!e.canvas||i.disabled)return e;var a=this,n=e.files[e.index],s=t.Deferred();return e.canvas.toBlob?(e.canvas.toBlob(function(i){i.name||(n.type===i.type?i.name=n.name:n.name&&(i.name=n.name.replace(/\..+$/,"."+i.type.substr(6)))),n.type!==i.type&&delete e.imageHead,e.files[e.index]=i,s.resolveWith(a,[e])},i.type||n.type,i.quality),s.promise()):e},loadImageMetaData:function(e,i){if(i.disabled)return e;var n=this,s=t.Deferred();return a.meta.parseMetaData(e.files[e.index],function(i){t.extend(e,i),s.resolveWith(n,[e,"aaa"])},i),s.promise()},saveImageMetaData:function(e,i){if(!(e.imageHead&&e.canvas&&e.canvas.toBlob)||i.disabled)return e;var a=e.files[e.index],t=new Blob([e.imageHead,this._blobSlice.call(a,20)],{type:a.type});return t.name=a.name,e.files[e.index]=t,e},setImage:function(e,i){return e.preview&&!i.disabled&&(e.files[e.index][i.name||"preview"]=e.preview),e},deleteImageReferences:function(e,i){return i.disabled||(delete e.img,delete e.canvas,delete e.preview,delete e.imageHead),e}}}),t});
//# sourceMappingURL=../sourcemaps/addons/image.js.map
