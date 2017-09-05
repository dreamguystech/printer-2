// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova','ngCordova.plugins.bluetoothSerial'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('Ctrl', function($scope, $rootScope, $state, $cordovaBluetoothSerial) {

    $rootScope.iniciar = function(){
   

        $cordovaBluetoothSerial.enable().then(
            function(obj) {
              console.log("Bluetooth is enabled");
              $scope.retorno = obj;
            },
            function(obj) {
                console.log("Bluetooth is *not* enabled");
              $scope.retorno = obj;
            }
        );
    }

    $rootScope.descobrir = function(){
      $scope.devices = "";
      $cordovaBluetoothSerial.discoverUnpaired().then(function(devices) {
            console.log(devices);

            $scope.devices = devices; 
          // devices.forEach(function(device) {
          //   console.log(device.id);
          // })
      }, function(obj){
        console.log('erro')
          console.log(obj)
      });
    }

    $rootScope.conecta = function(address){
      
      $cordovaBluetoothSerial.connect(address).then(function(obj){
        console.log(obj)
        alert("Bluetooth Conectado!")
      },function(obj){
        console.log(obj)
      })
    }
    $rootScope.escreverTxt = function(){
      console.log($scope.texto);

      $cordovaBluetoothSerial.clear().then(function(obj){console.log(obj)}, function(obj){console.log(obj)});
      var txt2 = String.fromCharCode(0X1B)+"d"+String.fromCharCode(3)+$scope.texto+String.fromCharCode(0X1B)+"d"+String.fromCharCode(3);
      $cordovaBluetoothSerial.write(txt2).then(function(obj){
        console.log(obj)
      }, function(obj){
        console.log(obj)
      }
      );

    }
    // $rootScope.escrever = function(){
    //     $cordovaBluetoothSerial.clear().then(function(obj){console.log(obj)}, function(obj){console.log(obj)});


    //   // var txt =                     String.fromCharCode(0X1B)+"a"+String.fromCharCode(1)+
    //   //                               String.fromCharCode(0X1B)+"!"+String.fromCharCode(0)+
    //   //                               "January 14, 2002 15:00"+
    //   //                               String.fromCharCode(0X1B)+"d"+String.fromCharCode(3)+ 
    //   //                               String.fromCharCode(0X1B)+"a"+String.fromCharCode(0)+ 
    //   //                               String.fromCharCode(0X1B)+"!"+String.fromCharCode(1)+ 
    //   //                               "TM-U210B-----------$20.00"+String.fromCharCode(0XA)+
    //   //                               "TM-U210D-----------$21.00"+String.fromCharCode(0XA)+
    //   //                               "PS-170-------------$17.00"+String.fromCharCode(0XA)+
    //   //                               String.fromCharCode(0XA)+ 
    //   //                               String.fromCharCode(0X1B)+"!"+String.fromCharCode(17)+ 
    //   //                               "TOTAL $58.00"+String.fromCharCode(0XA)+
    //   //                               String.fromCharCode(0X1B)+"!"+String.fromCharCode(0)+ 
    //   //                               "--------------------------"+String.fromCharCode(0XA)+
    //   //                               "PAID $60.00"+String.fromCharCode(0XA)+
    //   //                               "CHANGE $ 2.00"+String.fromCharCode(0xA)+
    //   //                               String.fromCharCode(0X1B)+"d"+String.fromCharCode(3)+ 
    //   //                               String.fromCharCode(0x1B)+ String.fromCharCode(0x40)+
                                    
    //                                 // String.fromCharCode(0x1D)+"V"+String.fromCharCode(66)+
                                    
    //                                 // String.fromCharCode(0)+String.fromCharCode(0x1B)+String.fromCharCode(0x70)+String.fromCharCode(0x0)+
    //                                 // String.fromCharCode(60)+String.fromCharCode(120);

    //   // $cordovaBluetoothSerial.write(txt).then(function(obj){
    //   //   console.log(obj)
    //   // }, function(obj){
    //   //   console.log(obj)
    //   // }
    //   // );
    //       // CHR$(&H1D) ;”(”;”k”; CHR$(10); CHR$(0); CHR$(49); CHR$(80); CHR$(48);
    //       // “CITIZEN”
    //       // CHR$(&H1D) ;”(”;”k”; CHR$(3); CHR$(0); CHR$(49); CHR$(81); CHR$(48);

    //     // $cordovaBluetoothSerial.write(String.fromCharCode(0X1D)+"("+"k"+ String.fromCharCode(10)+ String.fromCharCode(0)+ String.fromCharCode(49)+ String.fromCharCode(80)+ String.fromCharCode(48));
    //     // $cordovaBluetoothSerial.write("CITIZEN");
    //     // $cordovaBluetoothSerial.write(String.fromCharCode(0X1D)+"("+"k"+ String.fromCharCode(3)+ String.fromCharCode(0)+ String.fromCharCode(49)+ String.fromCharCode(81)+ String.fromCharCode(48));
    //     // $cordovaBluetoothSerial.write(String.fromCharCode(0)+String.fromCharCode(0x1B)+String.fromCharCode(0x70)+String.fromCharCode(0x0)+String.fromCharCode(60)+String.fromCharCode(120));

    //         // $cordovaBluetoothSerial.write(
    //         //   String.fromCharCode(0X1D)+"("+"k"+ String.fromCharCode(10)+ String.fromCharCode(0)+
    //         //   String.fromCharCode(49)+ String.fromCharCode(80)+String.fromCharCode(48)+"CITIZEN"+String.fromCharCode(0X1D)+"("+"k"+ String.fromCharCode(3)+ String.fromCharCode(0)+ String.fromCharCode(49)+ String.fromCharCode(81)+ String.fromCharCode(48)
    //         //   );


    //        // $cordovaBluetoothSerial.write(String.fromCharCode(0X1D)+"H"+ String.fromCharCode(2)+
    //        // String.fromCharCode(0X1D)+"k"+
    //        // String.fromCharCode(4)+
    //        // "564"+String.fromCharCode(0)); 

    // }
       
    setTimeout(function(){$rootScope.iniciar();},1000);
    
})
