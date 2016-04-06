// SAMPLE
this.manifest = {
    "name": "My Extension",
    "icon": "icon.png",
    "settings": [
        /*
        {
            "tab": i18n.get("information"),
            "group": i18n.get("login"),
            "name": "username",
            "type": "text",
            "label": i18n.get("username"),
            "text": i18n.get("x-characters")
        },
        {
            "tab": i18n.get("information"),
            "group": i18n.get("login"),
            "name": "password",
            "type": "text",
            "label": i18n.get("password"),
            "text": i18n.get("x-characters-pw"),
            "masked": true
        },
        {
            "tab": i18n.get("information"),
            "group": i18n.get("login"),
            "name": "myDescription",
            "type": "description",
            "text": i18n.get("description")
        },
        {
            "tab": i18n.get("information"),
            "group": i18n.get("logout"),
            "name": "myCheckbox",
            "type": "checkbox",
            "label": i18n.get("enable")
        },
        {
            "tab": i18n.get("information"),
            "group": i18n.get("logout"),
            "name": "myButton",
            "type": "button",
            "label": i18n.get("disconnect"),
            "text": i18n.get("logout")
        },
        {
            "tab": "Details",
            "group": "Sound",
            "name": "noti_volume",
            "type": "slider",
            "label": "Notification volume:",
            "max": 1,
            "min": 0,
            "step": 0.01,
            "display": true,
            "displayModifier": function (value) {
                return (value * 100).floor() + "%";
            }
        },
        {
            "tab": "Details",
            "group": "Sound",
            "name": "sound_volume",
            "type": "slider",
            "label": "Sound volume:",
            "max": 100,
            "min": 0,
            "step": 1,
            "display": true,
            "displayModifier": function (value) {
                return value + "%";
            }
        },
        {
            "tab": "Details",
            "group": "Food",
            "name": "myPopupButton",
            "type": "popupButton",
            "label": "Soup 1 should be:",
            "options": {
                "values": [
                    {
                        "value": "hot",
                        "text": "Very hot"
                    },
                    {
                        "value": "Medium"
                    },
                    {
                        "value": "Cold"
                    },
                    ["Non-existing"]
                ],
            },
        },
        {
            "tab": "Details",
            "group": "Food",
            "name": "myListBox",
            "type": "listBox",
            "label": "Soup 2 should be:",
            "options": [
                ["hot", "Hot and yummy"],
                ["cold"]
            ]
        },
        {
            "tab": "Details",
            "group": "Food",
            "name": "myRadioButtons",
            "type": "radioButtons",
            "label": "Soup 3 should be:",
            "options": [
                ["hot", "Hot and yummy"],
                ["cold"]
            ]
        },
        */
        //NEW 
        //ABOUT TAB
        {
            "tab": i18n.get("about"),
            "group": i18n.get("what_is_it"),
            "type": "description",
            "text": i18n.get("description")
        },
        {
            "tab": i18n.get("about"),
            "group": i18n.get("server_status"),
            "type": "button",
            "text": "Ping Server",
            "name": "ping"
        },
        {
            "tab": i18n.get("about"),
            "group": i18n.get("server_status"),
            "type": "description",
            "text": i18n.get("check_status"),
            "name": "server_status_description"
        },
        {
            "tab": i18n.get("about"),
            "group": i18n.get("reset_settings_group"),
            "type": "button",
            "text": i18n.get("reset_settings_group"),
            "name": "reset_settings"
        },
        {
            "tab": i18n.get("about"),
            "group": i18n.get("reset_settings_group"),
            "type": "description",
            "text": i18n.get("reset_settings_description")
        },
        {
            "tab": i18n.get("about"),
            "group": i18n.get("mode_group"),
            "type": "radioButtons",
            "label": i18n.get("mode_description"),
            "name": "mode",
            "options": [
                ["always", i18n.get("mode_always")],
                ["click", i18n.get("mode_click")]
            ],
        },

        //FILTERS TAB
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("chv"),
            "type": "description",
            "text": i18n.get("chv_only_description")
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("chv"),
            "type": "radioButtons",
            "label": i18n.get("chv_only"),
            "name": "chv_only",
            "options": [
                ["yes", i18n.get("yes")],
                ["no", i18n.get("no")]
            ],
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty_filter"),
            "type": "radioButtons",
            "label": i18n.get("sty_filter_description"),
            "name": "sty_filter",
            "options": [
                ["all", i18n.get("sty_all")],
                ["one", i18n.get("sty_one")]
            ]
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "description",
            "text": i18n.get("sty_description")
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "button",
            "text": i18n.get("sty_check_all"),
            "id": "sty-check-all-button",
            "name": "sty_check_all"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "button",
            "text": i18n.get("sty_uncheck_all"),
            "id": "sty-uncheck-all-button",
            "name": "sty_uncheck_all"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "button",
            "text": i18n.get("sty_reset_default"),
            "id": "sty-reset-button",
            "name": "sty_reset"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T001 - Organism"),
            "name": "sty_1",
            "id": "sty-1"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T002 - Plant"),
            "name": "sty_2"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T004 - Fungus"),
            "name": "sty_4"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T005 - Virus"),
            "name": "sty_5"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T007 - Bacterium"),
            "name": "sty_7"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T008 - Animal"),
            "name": "sty_8"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T010 - Vertebrate"),
            "name": "sty_10"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T011 - Amphibian"),
            "name": "sty_11"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T012 - Bird"),
            "name": "sty_12"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T013 - Fish"),
            "name": "sty_13"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T014 - Reptile"),
            "name": "sty_14"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T015 - Mammal"),
            "name": "sty_15"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T016 - Human"),
            "name": "sty_16"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T017 - Anatomical Structure"),
            "name": "sty_17"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T018 - Embryonic Structure"),
            "name": "sty_18"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T019 - Congenital Abnormality"),
            "name": "sty_19"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T020 - Acquired Abnormality"),
            "name": "sty_20"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T021 - Fully Formed Anatomical Structure"),
            "name": "sty_21"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T022 - Body System"),
            "name": "sty_22"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T023 - Body Part, Organ, or Organ Component"),
            "name": "sty_23"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T024 - Tissue"),
            "name": "sty_24"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T025 - Cell"),
            "name": "sty_25"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T026 - Cell Component"),
            "name": "sty_26"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T028 - Gene or Genome"),
            "name": "sty_28"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T029 - Body Location or Region"),
            "name": "sty_29"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T030 - Body Space or Junction"),
            "name": "sty_30"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T031 - Body Substance"),
            "name": "sty_31"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T032 - Organism Attribute"),
            "name": "sty_32"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T033 - Finding"),
            "name": "sty_33"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T034 - Laboratory or Test Result"),
            "name": "sty_34"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T037 - Injury or Poisoning"),
            "name": "sty_37"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T038 - Biologic Function"),
            "name": "sty_38"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T039 - Physiologic Function"),
            "name": "sty_39"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T040 - Organism Function"),
            "name": "sty_40"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T041 - Mental Process"),
            "name": "sty_41"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T042 - Organ or Tissue Function"),
            "name": "sty_42"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T043 - Cell Function"),
            "name": "sty_43"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T044 - Molecular Function"),
            "name": "sty_44"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T045 - Genetic Function"),
            "name": "sty_45"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T046 - Pathologic Function"),
            "name": "sty_46"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T047 - Disease or Syndrome"),
            "name": "sty_47"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T048 - Mental or Behavioral Dysfunction"),
            "name": "sty_48"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T049 - Cell or Molecular Dysfunction"),
            "name": "sty_49"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T050 - Experimental Model of Disease"),
            "name": "sty_50"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T051 - Event"),
            "name": "sty_51"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T052 - Activity"),
            "name": "sty_52"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T053 - Behavior"),
            "name": "sty_53"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T054 - Social Behavior"),
            "name": "sty_54"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T055 - Individual Behavior"),
            "name": "sty_55"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T056 - Daily or Recreational Activity"),
            "name": "sty_56"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T057 - Occupational Activity"),
            "name": "sty_57"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T058 - Health Care Activity"),
            "name": "sty_58"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T059 - Laboratory Procedure"),
            "name": "sty_59"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T060 - Diagnostic Procedure"),
            "name": "sty_60"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T061 - Therapeutic or Preventive Procedure"),
            "name": "sty_61"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T062 - Research Activity"),
            "name": "sty_62"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T063 - Molecular Biology Research Technique"),
            "name": "sty_63"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T064 - Governmental or Regulatory Activity"),
            "name": "sty_64"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T065 - Educational Activity"),
            "name": "sty_65"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T066 - Machine Activity"),
            "name": "sty_66"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T067 - Phenomenon or Process"),
            "name": "sty_67"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T068 - Human-caused Phenomenon or Process"),
            "name": "sty_68"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T069 - Environmental Effect of Humans"),
            "name": "sty_69"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T070 - Natural Phenomenon or Process"),
            "name": "sty_70"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T071 - Entity"),
            "name": "sty_71"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T072 - Physical Object"),
            "name": "sty_72"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T073 - Manufactured Object"),
            "name": "sty_73"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T074 - Medical Device"),
            "name": "sty_74"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T075 - Research Device"),
            "name": "sty_75"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T077 - Conceptual Entity"),
            "name": "sty_77"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T078 - Idea or Concept"),
            "name": "sty_78"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T079 - Temporal Concept"),
            "name": "sty_79"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T080 - Qualitative Concept"),
            "name": "sty_80"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T081 - Quantitative Concept"),
            "name": "sty_81"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T082 - Spatial Concept"),
            "name": "sty_82"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T083 - Geographic Area"),
            "name": "sty_83"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T085 - Molecular Sequence"),
            "name": "sty_85"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T086 - Nucleotide Sequence"),
            "name": "sty_86"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T087 - Amino Acid Sequence"),
            "name": "sty_87"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T088 - Carbohydrate Sequence"),
            "name": "sty_88"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T089 - Regulation or Law"),
            "name": "sty_89"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T090 - Occupation or Discipline"),
            "name": "sty_90"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T091 - Biomedical Occupation or Discipline"),
            "name": "sty_91"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T092 - Organization"),
            "name": "sty_92"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T093 - Health Care Related Organization"),
            "name": "sty_93"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T094 - Professional Society"),
            "name": "sty_94"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T095 - Self-help or Relief Organization"),
            "name": "sty_95"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T096 - Group"),
            "name": "sty_96"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T097 - Professional or Occupational Group"),
            "name": "sty_97"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T098 - Population Group"),
            "name": "sty_98"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T099 - Family Group"),
            "name": "sty_99"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T100 - Age Group"),
            "name": "sty_100"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T101 - Patient or Disabled Group"),
            "name": "sty_101"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T102 - Group Attribute"),
            "name": "sty_102"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T103 - Chemical"),
            "name": "sty_103"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T104 - Chemical Viewed Structurally"),
            "name": "sty_104"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T109 - Organic Chemical"),
            "name": "sty_109"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T114 - Nucleic Acid, Nucleoside, or Nucleotide"),
            "name": "sty_114"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T116 - Amino Acid, Peptide, or Protein"),
            "name": "sty_116"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T120 - Chemical Viewed Functionally"),
            "name": "sty_120"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T121 - Pharmacologic Substance"),
            "name": "sty_121"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T122 - Biomedical or Dental Material"),
            "name": "sty_122"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T123 - Biologically Active Substance"),
            "name": "sty_123"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T125 - Hormone"),
            "name": "sty_125"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T126 - Enzyme"),
            "name": "sty_126"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T127 - Vitamin"),
            "name": "sty_127"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T129 - Immunologic Factor"),
            "name": "sty_129"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T130 - Indicator, Reagent, or Diagnostic Aid"),
            "name": "sty_130"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T131 - Hazardous or Poisonous Substance"),
            "name": "sty_131"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T167 - Substance"),
            "name": "sty_167"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T168 - Food"),
            "name": "sty_168"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T169 - Functional Concept"),
            "name": "sty_169"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T170 - Intellectual Product"),
            "name": "sty_170"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T171 - Language"),
            "name": "sty_171"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T184 - Sign or Symptom"),
            "name": "sty_184"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T185 - Classification"),
            "name": "sty_185"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T190 - Anatomical Abnormality"),
            "name": "sty_190"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T191 - Neoplastic Process"),
            "name": "sty_191"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T192 - Receptor"),
            "name": "sty_192"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T194 - Archaeon"),
            "name": "sty_194"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T195 - Antibiotic"),
            "name": "sty_195"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T196 - Element, Ion, or Isotope"),
            "name": "sty_196"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T197 - Inorganic Chemical"),
            "name": "sty_197"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T200 - Clinical Drug"),
            "name": "sty_200"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T201 - Clinical Attribute"),
            "name": "sty_201"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T203 - Drug Delivery Device"),
            "name": "sty_203"
        },
        {
            "tab": i18n.get("filters"),
            "group": i18n.get("sty"),
            "type": "checkbox",
            "label": i18n.get("T204 - Eukaryote"),
            "name": "sty_204"
        },


        //LANGUAGE TAB
        {
            "tab": i18n.get("language"),
            "group": i18n.get("webpages"),
            "type": "description",
            "text": i18n.get("webpages_description")
        },
        {
            "tab": i18n.get("language"),
            "group": i18n.get("webpages"),
            "type": "checkbox",
            "label": i18n.get("en"),
            "name": "lang_en",
            "id": "first-lang-checkbox"
        },
        {
            "tab": i18n.get("language"),
            "group": i18n.get("webpages"),
            "type": "checkbox",
            "label": i18n.get("pt"),
            "name": "lang_pt"
        },
        {
            "tab": i18n.get("language"),
            "group": i18n.get("content"),
            "type": "radioButtons",
            "label": i18n.get("content_description"),
            "name": "lang_content",
            "options": [
                ["en", i18n.get("en")],
                ["pt", i18n.get("pt")],
                ["detected", i18n.get("detected")]
            ]
        },
        {
            "tab": i18n.get("language"),
            "group": i18n.get("external_references"),
            "type": "description",
            "text": i18n.get("external_references_description")
        },
        {
            "tab": i18n.get("language"),
            "group": i18n.get("external_references"),
            "type": "checkbox",
            "label": i18n.get("ext_refs_label"),
            "name": "ext_refs"
        }
        
    ]
    /*,
    "alignment": [
        [
            "username",
            "password"
        ],
        [
            "noti_volume",
            "sound_volume"
        ]
    ]*/
};
