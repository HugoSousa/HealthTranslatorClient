window.addEvent("domready", function () {
    // Option 1: Use the manifest:
    new FancySettings.initWithManifest(function (settings) {
        
        var sty_checkboxes = $('sty-1').getParents('div.bundle.checkbox');
        sty_checkboxes = sty_checkboxes.append($('sty-1').getParent('div.bundle.checkbox').getSiblings('.setting.bundle.checkbox'));
        div = new Element('div', {id: 'sty-wrapper-checkboxes'});
        sty_checkboxes.each(function(e){ div.wraps(e) });

        var sty_buttons = $('sty-wrapper-checkboxes').getSiblings('div.bundle.button');
        div = new Element('div', {id: 'sty-wrapper-buttons'});
        sty_buttons.each(function(e){ div.wraps(e) });
        
        
        var check = $$('div.tab-content>h2:contains("Language")');
        check.getParent().getElements('p.element.description').each(function(el){ el.addClass("bigger-description"); });
        

        settings.manifest.ping.addEvent("action", function () {
            ping(settings);
        });

        settings.manifest.reset_settings.addEvent("action", function(){
            settings.manifest.mode.set("click");
            settings.manifest.chv_only.set("yes");
            settings.manifest.sty_filter.set("sty_one");
            settings.manifest.lang_en.set(true);
            settings.manifest.lang_pt.set(true);
            settings.manifest.lang_content.set("detected");
            settings.manifest.ext_refs.set(false);
            setDefaultSemanticTypes(settings);
        });


        settings.manifest.sty_check_all.addEvent("action", function(){
            setAllSemanticTypes(settings, true);
        });
        
        settings.manifest.sty_uncheck_all.addEvent("action", function(){
            setAllSemanticTypes(settings, false);
        });

        settings.manifest.sty_reset.addEvent("action", function(){
            setDefaultSemanticTypes(settings);
        });

        settings.manifest.mode.addEvent("action", function(){
            chrome.extension.getBackgroundPage().changeExecutionMode();
        })
    });
});

function ping(settings){
    var t0 = performance.now();

    var request = new Request({
        url: "http://localhost:8080/HealthTranslatorServer/webresources/ping",
        method: 'get',
        onSuccess: function(responseText){
            console.log("PING SUCCESS");

            var t1 = performance.now();
            var duration = (t1 - t0).toFixed(2);
            settings.manifest.server_status_description.set(i18n.get("server_up") + duration + "ms").element.addClass("green-description");
        },
        onFailure: function(){
            console.log("PING ERROR");
            settings.manifest.server_status_description.set(i18n.get("server_down")).element.addClass("red-description");
        }

    });

    request.send();
}

function setAllSemanticTypes(settings, value){
    settings.manifest.sty_1.set(value);
    settings.manifest.sty_2.set(value);
    settings.manifest.sty_4.set(value);
    settings.manifest.sty_5.set(value);
    settings.manifest.sty_7.set(value);
    settings.manifest.sty_8.set(value);
    settings.manifest.sty_10.set(value);
    settings.manifest.sty_11.set(value);
    settings.manifest.sty_12.set(value);
    settings.manifest.sty_13.set(value);
    settings.manifest.sty_14.set(value);
    settings.manifest.sty_15.set(value);
    settings.manifest.sty_16.set(value);
    settings.manifest.sty_17.set(value);
    settings.manifest.sty_18.set(value);
    settings.manifest.sty_19.set(value);
    settings.manifest.sty_20.set(value);
    settings.manifest.sty_21.set(value);
    settings.manifest.sty_22.set(value);
    settings.manifest.sty_23.set(value);
    settings.manifest.sty_24.set(value);
    settings.manifest.sty_25.set(value);
    settings.manifest.sty_26.set(value);
    settings.manifest.sty_28.set(value);
    settings.manifest.sty_29.set(value);
    settings.manifest.sty_30.set(value);
    settings.manifest.sty_31.set(value);
    settings.manifest.sty_32.set(value);
    settings.manifest.sty_33.set(value);
    settings.manifest.sty_34.set(value);
    settings.manifest.sty_37.set(value);
    settings.manifest.sty_38.set(value);
    settings.manifest.sty_39.set(value);
    settings.manifest.sty_40.set(value);
    settings.manifest.sty_41.set(value);
    settings.manifest.sty_42.set(value);
    settings.manifest.sty_43.set(value);
    settings.manifest.sty_44.set(value);
    settings.manifest.sty_45.set(value);
    settings.manifest.sty_46.set(value);
    settings.manifest.sty_47.set(value);
    settings.manifest.sty_48.set(value);
    settings.manifest.sty_49.set(value);
    settings.manifest.sty_50.set(value);
    settings.manifest.sty_51.set(value);
    settings.manifest.sty_52.set(value);
    settings.manifest.sty_53.set(value);
    settings.manifest.sty_54.set(value);
    settings.manifest.sty_55.set(value);
    settings.manifest.sty_56.set(value);
    settings.manifest.sty_57.set(value);
    settings.manifest.sty_58.set(value);
    settings.manifest.sty_59.set(value);
    settings.manifest.sty_60.set(value);
    settings.manifest.sty_61.set(value);
    settings.manifest.sty_62.set(value);
    settings.manifest.sty_63.set(value);
    settings.manifest.sty_64.set(value);
    settings.manifest.sty_65.set(value);
    settings.manifest.sty_66.set(value);
    settings.manifest.sty_67.set(value);
    settings.manifest.sty_68.set(value);
    settings.manifest.sty_69.set(value);
    settings.manifest.sty_70.set(value);
    settings.manifest.sty_71.set(value);
    settings.manifest.sty_72.set(value);
    settings.manifest.sty_73.set(value);
    settings.manifest.sty_74.set(value);
    settings.manifest.sty_75.set(value);
    settings.manifest.sty_77.set(value);
    settings.manifest.sty_78.set(value);
    settings.manifest.sty_79.set(value);
    settings.manifest.sty_80.set(value);
    settings.manifest.sty_81.set(value);
    settings.manifest.sty_82.set(value);
    settings.manifest.sty_83.set(value);
    settings.manifest.sty_85.set(value);
    settings.manifest.sty_86.set(value);
    settings.manifest.sty_87.set(value);
    settings.manifest.sty_88.set(value);
    settings.manifest.sty_89.set(value);
    settings.manifest.sty_90.set(value);
    settings.manifest.sty_91.set(value);
    settings.manifest.sty_92.set(value);
    settings.manifest.sty_93.set(value);
    settings.manifest.sty_94.set(value);
    settings.manifest.sty_95.set(value);
    settings.manifest.sty_96.set(value);
    settings.manifest.sty_97.set(value);
    settings.manifest.sty_98.set(value);
    settings.manifest.sty_99.set(value);
    settings.manifest.sty_100.set(value);
    settings.manifest.sty_101.set(value);
    settings.manifest.sty_102.set(value);
    settings.manifest.sty_103.set(value);
    settings.manifest.sty_104.set(value);
    settings.manifest.sty_109.set(value);
    settings.manifest.sty_114.set(value);
    settings.manifest.sty_116.set(value);
    settings.manifest.sty_120.set(value);
    settings.manifest.sty_121.set(value);
    settings.manifest.sty_122.set(value);
    settings.manifest.sty_123.set(value);
    settings.manifest.sty_125.set(value);
    settings.manifest.sty_126.set(value);
    settings.manifest.sty_127.set(value);
    settings.manifest.sty_129.set(value);
    settings.manifest.sty_130.set(value);
    settings.manifest.sty_131.set(value);
    settings.manifest.sty_167.set(value);
    settings.manifest.sty_168.set(value);
    settings.manifest.sty_169.set(value);
    settings.manifest.sty_170.set(value);
    settings.manifest.sty_171.set(value);
    settings.manifest.sty_184.set(value);
    settings.manifest.sty_185.set(value);
    settings.manifest.sty_190.set(value);
    settings.manifest.sty_191.set(value);
    settings.manifest.sty_192.set(value);
    settings.manifest.sty_194.set(value);
    settings.manifest.sty_195.set(value);
    settings.manifest.sty_196.set(value);
    settings.manifest.sty_197.set(value);
    settings.manifest.sty_200.set(value);
    settings.manifest.sty_201.set(value);
    settings.manifest.sty_203.set(value);
    settings.manifest.sty_204.set(value);                                                            
}

function setDefaultSemanticTypes(settings){
    setAllSemanticTypes(settings, false);

    settings.manifest.sty_5.set(true);
    settings.manifest.sty_7.set(true);
    settings.manifest.sty_19.set(true);
    settings.manifest.sty_20.set(true);
    settings.manifest.sty_23.set(true);
    settings.manifest.sty_29.set(true);
    settings.manifest.sty_30.set(true);
    settings.manifest.sty_33.set(true);
    settings.manifest.sty_37.set(true);
    settings.manifest.sty_46.set(true);
    settings.manifest.sty_47.set(true);
    settings.manifest.sty_48.set(true);
    settings.manifest.sty_59.set(true);
    settings.manifest.sty_60.set(true);
    settings.manifest.sty_61.set(true);
    settings.manifest.sty_109.set(true);
    settings.manifest.sty_116.set(true);
    settings.manifest.sty_121.set(true);
    settings.manifest.sty_125.set(true);
    settings.manifest.sty_126.set(true);
    settings.manifest.sty_127.set(true);
    settings.manifest.sty_129.set(true);
    settings.manifest.sty_130.set(true);
    settings.manifest.sty_131.set(true);
    settings.manifest.sty_184.set(true);
    settings.manifest.sty_190.set(true);
    settings.manifest.sty_194.set(true);
    settings.manifest.sty_195.set(true);
    settings.manifest.sty_200.set(true);
    settings.manifest.sty_204.set(true);


}
