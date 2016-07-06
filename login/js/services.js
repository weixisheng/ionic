angular.module('starter.services', [])

.factory('Profiles', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var profiles = [{
    id: 0,
    name: '张三',
    deseg: '总监',
    face: 'img/150x165/anoop-kumar.png'
  },
   {
    id: 1,
    name: '李四',
    deseg: '项目经理',
    face: 'img/150x165/vijay-kumar.png'
  },
   {
    id: 2,
    name: '王五',
    deseg: '架构师',
    face: 'img/150x165/durgesh-soni.png'
  }, 
  {
    id: 3,
    name: '赵六',
    deseg: 'JAVA工程师',
    face: 'img/150x165/manish-mittal.png'
  },
   {
    id: 4,
    name: '张齐',
    deseg: 'UI 设计师',
    face: 'img/150x165/vinay-kumar.png'
  },
   {
    id: 5,
    name: '秦王',
    deseg: '测试',
    face: 'img/150x165/ankit-gera.png'
  }];

  return {
    all: function() {
      return profiles;
    },
    remove: function(id) {
      profiles.splice(profiles.indexOf(id), 1);
    },
    get: function(profileId) {
      var i=0,len=profiles.length;
      for (; i < len; i++) {
        if (profiles[i].id === parseInt(profileId)) {
          return profiles[i];
        }
      }
      return null;
    }
  };
});
