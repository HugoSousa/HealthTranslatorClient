this.i18n = {
    "definition": {
        "en": "Definition",
        "pt": "Definição"
    },
    "external_references": {
        "en": "External References",
        "pt": "Referências Externas"
    },
    "relationships": {
        "en": "Related Concepts",
        "pt": "Conceitos Relacionados"
    },
};

(function () {
    if (this.i18n === undefined) { this.i18n = {}; }
    this.i18n.get = function (value, lang) {
        if (this.hasOwnProperty(value)) {
            value = this[value];
            if (value.hasOwnProperty(lang)) {
                return value[lang];
            } else if (value.hasOwnProperty("en")) {
                return value["en"];
            } else {
                return Object.values(value)[0];
            }
        } else {
            return value;
        }
    };
}());



