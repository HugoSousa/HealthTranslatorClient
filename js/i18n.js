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
    "rate": {
        "en": "Rate This",
        "pt": "Avaliar"
    },
    "definition_quality": {
        "en": "Definition Quality",
        "pt": "Qualidade da Avaliação"
    },
    "external_references_quality": {
        "en": "External References Quality",
        "pt": "Qualidade das Referências Externas"
    },
    "relationships_quality": {
        "en": "Related Concepts Quality",
        "pt": "Qualidade dos Conceitos Relacionados"
    },
    "general_quality": {
        "en": "General Quality",
        "pt": "Qualidade Geral"
    },

    //relationships
    "inverse_isa": {
        "en": "Belongs to",
        "pt": "Pertence a"
    },
    "same_as": {
        "en": "Same as",
        "pt": "Mesmo que"
    },
    "due_to": {
        "en": "Leads to",
        "pt": "Conduz a"
    },
    "cause_of": {
        "en": "Caused by",
        "pt": "Causado por"
    },
    "isa": {
        "en": "Composed by",
        "pt": "Composto por"
    },
    "finding_site_of": {
        "en": "Found in",
        "pt": "Encontrado em"
    },
    "has_causative_agent": {
        "en": "Caused by",
        "pt": "Causado por"
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



