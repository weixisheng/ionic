angular.module('wechat.controllers', [])

.controller('findCtrl', function($scope, $state, localStorageService, $http) {
  $scope.onSwipeLeft = function() {
    $state.go("tab.setting");
  };
  $scope.onSwipeRight = function() {
    $state.go("tab.friends");
  };
  $scope.search = function() {
    $state.go("search");
  };
  $scope.goMoments = function() {
    $state.go("moments");
  };

  $scope.$on("$ionicView.beforeEnter", function() {
    $http.get("data/json/moments.json").success(function(response) {
      $scope.moments = response.data;
    });
    $http.get("data/json/shop.json").success(function(response) {
      $scope.shopInfo = response.shopInfo;
       //获取图片信息，修改宽度。一张图片60%，两张图片45%，其余情况默认
      var imgList = document.getElementsByClassName("followImgs");
      for (var i = 0, leng = imgList.length; i < leng; i++) {
        var futu = imgList[i].children;
        var pictures = futu.length;
        switch (pictures) {
          case 1:
            futu[0].style.width = "60%";
            break;
          case 2:
            futu[0].style.width = "45%";
            futu[1].style.width = "45%";
            break;
        }
      } //结束
    });

  });


  $scope.showOperate = function(id) {

    var optionBlock = document.getElementsByClassName("operateBox" + id)[0];
    if (optionBlock.style.visibility == "hidden" || !optionBlock.style.visibility)
      optionBlock.style.visibility = "visible";
    else
      optionBlock.style.visibility = "hidden";
  };
  $scope.goMedia = function() {
    $state.go("media");
  };
  $scope.goShop = function() {
    $state.go("shop");
  };

  $scope.play = function() {
    var button = document.getElementsByClassName("play-button")[0];
    var audio = document.getElementsByClassName("audio-button")[0];
    var buttonClass = button.classList;
    var audioClass = audio.classList;
    if (!audioClass.contains("playing")) {
      audio.play();
      buttonClass.remove("ion-play");
      buttonClass.add("ion-pause");
      audioClass.add("playing");
    } else {
      audio.pause();
      buttonClass.remove("ion-pause");
      buttonClass.add("ion-play");
      audioClass.remove("playing");
    }
  };
})

.controller('messageCtrl', function($scope, $state, $ionicPopup, localStorageService, messageService) {

  // $scope.messages = messageService.getAllMessages();
  // console.log($scope.messages);
  $scope.onSwipeLeft = function() {
    $state.go("tab.friends");
  };
  $scope.popupMessageOpthins = function(message) {
    $scope.popup.index = $scope.messages.indexOf(message);
    $scope.popup.optionsPopup = $ionicPopup.show({
      templateUrl: "templates/popup.html",
      scope: $scope,
    });
    $scope.popup.isPopup = true;
  };
  $scope.markMessage = function() {
    var index = $scope.popup.index;
    var message = $scope.messages[index];
    if (message.showHints) {
      message.showHints = false;
      message.noReadMessages = 0;
    } else {
      message.showHints = true;
      message.noReadMessages = 1;
    }
    $scope.popup.optionsPopup.close();
    $scope.popup.isPopup = false;
    messageService.updateMessage(message);
  };
  $scope.deleteMessage = function() {
    var index = $scope.popup.index;
    var message = $scope.messages[index];
    $scope.messages.splice(index, 1);
    $scope.popup.optionsPopup.close();
    $scope.popup.isPopup = false;
    messageService.deleteMessageId(message.id);
    messageService.clearMessage(message);
  };
  $scope.topMessage = function() {
    var index = $scope.popup.index;
    var message = $scope.messages[index];
    if (message.isTop) {
      message.isTop = 0;
    } else {
      message.isTop = new Date().getTime();
    }
    $scope.popup.optionsPopup.close();
    $scope.popup.isPopup = false;
    messageService.updateMessage(message);
  };
  $scope.messageDetils = function(message) {
    $state.go("messageDetail", {
      "messageId": message.id
    });
  };
  $scope.$on("$ionicView.beforeEnter", function() {
    // console.log($scope.messages);
    $scope.messages = messageService.getAllMessages();
    $scope.popup = {
      isPopup: false,
      index: 0
    };
  });

})

.controller('friendsCtrl', function($scope, $state) {
  $scope.onSwipeLeft = function() {
    $state.go("tab.find");
  };
  $scope.onSwipeRight = function() {
    $state.go("tab.message");
  };
  $scope.contacts_right_bar_swipe = function(e) {
    console.info(e);
  };
})

.controller('settingCtrl', function($scope, $state, $ionicModal) {
  $scope.onSwipeRight = function() {
    $state.go("tab.find");
  };
  $ionicModal.fromTemplateUrl("showQrTemplate.html", {
    scope: $scope,
    animation: "slide-in-up"
  }).then(function(modal) {
    $scope.qrModal = modal;
  });
  $scope.showQr = function() {
    $scope.qrModal.show();
  };
  $scope.closeModal = function() {
    $scope.qrModal.hide();
  };
  $scope.$on("$destroy", function() {
    $scope.qrModal.remove();
  });
  $scope.showMore = function() {
    var moreBlock = document.getElementsByClassName("moreBlock")[0];
    if (moreBlock.style.visibility == "visible") {
      moreBlock.style.visibility = "hidden";
    } else
      moreBlock.style.visibility = "visible";
  };
  $scope.goSetting = function() {
    $state.go("settingDetail");
  };
  $scope.goWallet = function(){
    $state.go("myWallet");
  };
})

.controller('messageDetailCtrl', ['$scope', '$stateParams',
  'messageService', '$ionicScrollDelegate', '$timeout',
  function($scope, $stateParams, messageService, $ionicScrollDelegate, $timeout) {
    var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
    // console.log("enter");
    $scope.doRefresh = function() {
      // console.log("ok");
      $scope.messageNum += 5;
      $timeout(function() {
        $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
          $stateParams.messageId);
        $scope.$broadcast('scroll.refreshComplete');
      }, 200);
    };

    $scope.$on("$ionicView.beforeEnter", function() {
      $scope.message = messageService.getMessageById($stateParams.messageId);
      $scope.message.noReadMessages = 0;
      $scope.message.showHints = false;
      messageService.updateMessage($scope.message);
      $scope.messageNum = 10;
      $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
        $stateParams.messageId);
      $timeout(function() {
        viewScroll.scrollBottom();
      }, 0);

    });

    //增加表情图片
      $(".ion-happy-outline").each(function(index,element){
        $(this).click(function(){
          var currentBtnId = $(this).attr("data-id");
          var currentId = currentBtnId.slice(3);
         var qqFace= $(this).parent().parent().siblings('.facebox'+currentId);
         if(qqFace.css("visibility")=="hidden"){
          $("#footer"+currentId).css({"bottom":"173px"});
          qqFace.css({"visibility":"visible"});
         }
         else{
          $("#footer"+currentId).css({"bottom":"0"});
          qqFace.css({"visibility":"hidden"});
         }
        });
      });//结束

    window.addEventListener("native.keyboardshow", function(e) {
      viewScroll.scrollBottom();
    });
  }
])