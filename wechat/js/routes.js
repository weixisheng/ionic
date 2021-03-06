angular.module('wechat.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("tab", {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html",
        })
        .state('tab.message', {
            url: '/message',
            views: {
                'tab-message': {
                    templateUrl: 'templates/tab-message.html',
                    controller: "messageCtrl"
                }
            }
        })
        .state("groupDetail",{
            url:"/groupDetail",
            templateUrl:"templates/groupDetail.html",
            controller:"groupDetailCtrl"
        })
        .state("groupInfo",{
            url:"/groupDetail/groupInfo",
            templateUrl:"templates/groupInfo.html",
            controller:"groupDetailCtrl"
        })
        .state('messageDetail', {
            url: '/messageDetail/:messageId',
            templateUrl: "templates/message-detail.html",
            controller: "messageDetailCtrl"
        })
        .state('tab.friends', {
            url: '/friends',
            views: {
                'tab-friends': {
                    templateUrl: 'templates/tab-friends.html',
                    controller: "friendsCtrl"
                }
            }
        })
        .state('tab.find', {
            url: '/find',
            views: {
                'tab-find': {
                    templateUrl: 'templates/tab-find.html',
                    controller: "findCtrl"
                }
            },
        })
        .state('search',{
            url:'/search',
            templateUrl:'templates/search.html',
            controller:"findCtrl"
        })
        .state('moments',{
            url:'/moments',
            templateUrl:"templates/moments.html",
            controller:"findCtrl"
        })
        .state("media",{
            url:"/media",
            templateUrl:"templates/media.html",
            controller:"findCtrl"
        })
        .state("shop",{
            url:"/shop",
            templateUrl:"templates/shop.html",
            controller:"findCtrl"
        })
        .state('tab.setting', {
            url: '/setting',
            views: {
                'tab-setting': {
                    templateUrl: 'templates/tab-setting.html',
                    controller: "settingCtrl"
                }
            }
        })
        .state("settingDetail",{
            url:"/settingDetail",
            templateUrl:"templates/settingDetail.html",
            controller:"settingCtrl"
        })
        .state("newMessage",{
            url:"/settingDetail/newMessage",
            templateUrl:"templates/newMessage.html",
            // controller:"settingCtrl"
        })
        .state("aloneMode",{
            url:"/settingDetail/aloneMode",
            templateUrl:"templates/aloneMode.html",
            // controller:"settingCtrl"
        })
        .state("chat",{
            url:"/settingDetail/chat",
            templateUrl:"templates/chat.html",
            // controller:"settingCtrl"
        })
        .state("privacy",{
            url:"/settingDetail/privacy",
            templateUrl:"templates/privacy.html",
            // controller:"settingCtrl"
        })
        .state("common",{
            url:"/settingDetail/common",
            templateUrl:"templates/common.html",
            // controller:"settingCtrl"
        })
        .state("security",{
            url:"/settingDetail/security",
            templateUrl:"templates/security.html",
            // controller:"settingCtrl"
        })
        .state("about",{
            url:"/settingDetail/about",
            templateUrl:"templates/about.html",
            // controller:"settingCtrl"
        })
        .state("myWallet",{
            url:"/myWallet",
            templateUrl:"templates/wallet.html",
            controller:"settingCtrl"
        });

    $urlRouterProvider.otherwise("/tab/message");
});