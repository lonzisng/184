/**
 * @Description:
 * @author WXH
 * @date 2019/4/28 11:25
 */
$(".right").on("click","#updatePwd",function () {
    $(".updatePwd").show();

    $("#update").click(function () {
        $(".updatePwd").hide();
    });
});

//头像上传
var initCropperInModal = function(img, input, modal){
    var $image = img;
    var $inputImage = input;
    var $modal = modal;
    var options = {
        aspectRatio: 1, // 纵横比
        viewMode: 2,
        preview: '.img-preview' // 预览图的class名
    };
    // 模态框隐藏后需要保存的数据对象
    var saveData = {};
    var URL = window.URL || window.webkitURL;
    var blobURL;
    $modal.on('show.bs.modal',function () {
        // 如果打开模态框时没有选择文件就点击“打开图片”按钮
        if(!$inputImage.val()){
            $inputImage.click();
        }
    }).on('shown.bs.modal', function () {
        // 重新创建
        $image.cropper( $.extend(options, {
            ready: function () {
                // 当剪切界面就绪后，恢复数据
                if(saveData.canvasData){
                    $image.cropper('setCanvasData', saveData.canvasData);
                    $image.cropper('setCropBoxData', saveData.cropBoxData);
                }
            }
        }));
    }).on('hidden.bs.modal', function () {
        // 保存相关数据
        saveData.cropBoxData = $image.cropper('getCropBoxData');
        saveData.canvasData = $image.cropper('getCanvasData');
        // 销毁并将图片保存在img标签
        $image.cropper('destroy').attr('src',blobURL);
    });
    if (URL) {
       $(".right").on("chang","inputImage",function() {
            var files = this.files;
            var file;
            if (!$image.data('cropper')) {
                return;
            }
            if (files && files.length) {
                file = files[0];
                if (/^image\/\w+$/.test(file.type)) {

                    if(blobURL) {
                        URL.revokeObjectURL(blobURL);
                    }
                    blobURL = URL.createObjectURL(file);

                    // 重置cropper，将图像替换
                    $image.cropper('reset').cropper('replace', blobURL);

                    // 选择文件后，显示和隐藏相关内容
                    $('.img-container').removeClass('hidden');
                    $('.img-preview-box').removeClass('hidden');
                    $('#changeModal .disabled').removeAttr('disabled').removeClass('disabled');
                    $('#changeModal .tip-info').addClass('hidden');

                } else {
                    window.alert('请选择一个图像文件！');
                }
            }
        });
    } else {
        $inputImage.prop('disabled', true).addClass('disabled');
    }
};

var sendPhoto = function(){
    $('#photo').cropper('getCroppedCanvas',{
        width:300,
        height:300
    }).toBlob(function(blob){
        // 转化为blob后更改src属性，隐藏模态框
        $('#user-photo').attr('src',URL.createObjectURL(blob));
        $('#changeModal').modal('hide');
    });
};
$(function(){
    initCropperInModal($('#photo'),$('#photoInput'),$('#changeModal'));
});