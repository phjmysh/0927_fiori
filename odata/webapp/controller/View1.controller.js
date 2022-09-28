sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("sap.sync.odata.controller.View1", {
            onInit: function () {
                var oData = {
                    salesOderNum : null,
                    salesOderMemo : null
                };

                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel,"view");

            },

            onCreate : function(){
                var oModel = this.getView().getModel(); //oDataModel 객체
                var oViewModel = this.getView().getModel("view");
                var sSONUM = oViewModel.getProperty("/salesOderNum");
                var sMemo = oViewModel.getProperty("/salesOderMemo");

                var oCreateData = { Sonum : sSONUM, Memo : sMemo};

                oModel.create("/SalesOrderSet", oCreateData,{
                    success : function(){
                        oViewModel.setProperty("/salesOderNum", null);
                        oViewModel.setProperty("/salesOderMemo", null);
                        MessageToast.show("생겨났다..");
                    }
                });

                //ui5 framework odataV2 모델 api(메소드 기능)으로 생성요청

                // oModel.createEntry("/SalesOderSet", 
                //     {
                //         properties : oCreateData
                //     }
                // );

                // oModel.submitChanges();


            },
            onDelete : function (oEvent) {

                //내가 삭제버튼을 누른 엔티티의 상세주소를 추출해서 삭제요청
                var sPath = oEvent.getParameter("listItem").getBindingContextPath();
                var oModel = this.getView().getModel();

                //Delete http 요청
                oModel.remove(sPath,{ success : function(){
                    MessageToast.show("지워졌다..");
                }})
            },

            onPressEdit : function(){
                this.byId("table").setMode("SingleSelectMaster");
            },

            onPressDel : function(){
                this.byId("table").setMode("Delete");
            },

            onPressItem : function (oEvent) {
                var sPath = oEvent.getParameter("listItem").getBindingContextPath();
                var oModel = this.getView().getModel();
                var oData = oModel.getProperty(sPath);

                var oViewModel = this.getView().getModel("view");
                oViewModel.setProperty("/salesOderNum", oData.Sonum);
                oViewModel.setProperty("/salesOderMemo", oData.Memo);

                debugger;
            },

            onUpdate : function() {
                var oViewModel = this.getView().getModel("view");
                var sSONUM = oViewModel.getProperty("/salesOderNum");
                var sMemo = oViewModel.getProperty("/salesOderMemo");
                var oModel = this.getView().getModel();
                var oData = { Sonum : sSONUM, Memo : sMemo};
                var sPath = "/SalesOrderSet('" + sSONUM + "')" 
                
            
                oModel.update(sPath, oData, { success : function (){
                    MessageToast.show("바뀌었다..")
                }});
            },

            onRefresh : function(){
                this.getView().getModel().onRefresh(true);
            }
            

        });
    });
