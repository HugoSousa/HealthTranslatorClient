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
    "empty": {
        "en": "Other relationships",
        "pt": "Outras relações"
    },
    "same_as": {
        "en": "Same as",
        "pt": "Mesmo que"
    },
    "due_to": {
        "en": "Because of",
        "pt": "Devido a"
    },
    "cause_of": {
        "en": "Cause of",
        "pt": "Causa de"
    },
    "inverse_isa": {
        "en": "Can also be (more specifically)",
        "pt": "Também pode ser (mais especificamente)"
    },
    "isa": {
        "en": "Can also be (broader)",
        "pt": "Também pode ser (mais genericamente)"
    },
    "has_finding_site": {
        "en": "Found in",
        "pt": "Encontrado em"
    },
    "finding_site_of": {
        "en": "Place of",
        "pt": "Local de"
    },
    "has_causative_agent": {
        "en": "Caused by",
        "pt": "Causado por"
    },
    "causative_agent_of": {
        "en": "Causative agent of",
        "pt": "Agente causativo de"
    },
    "has_part": {
        "en": "Has part",
        "pt": "Tem parte"
    },
    "part_of": {
        "en": "Part of",
        "pt": "Parte de"
    },
    "has_associated_morphology": {
        "en": "Associated morphology",
        "pt": "Morfologia associada"
    },
    "associated_morphology_of": {
        "en": "Associated morphology of",
        "pt": "Morfologia associada a"
    },
    "uses": {
        "en": "Uses",
        "pt": "Usa"
    },
    "used_by": {
        "en": "Used by",
        "pt": "Usado por"
    },
    "has_active_ingredient": {
        "en": "Has active ingredient",
        "pt": "Tem ingrediente ativo"
    },
    "active_ingredient_of": {
        "en": "Active ingredient of",
        "pt": "Ingrediente ativo de"
    },
    "occurs_before": {
        "en": "Occurs before",
        "pt": "Acontece antes de"
    },
    "occurs_after": {
        "en": "Occurs after",
        "pt": "Acontece depois de"
    },
    "occurs_in": {
        "en": "Occurs in",
        "pt": "Acontece em"
    },
    "uses_device": {
        "en": "Uses device",
        "pt": "Usa instrumento"
    },
    "device_used_by": {
        "en": "Device used by",
        "pt": "Dispositivo usado por"
    },
    "has_location": {
        "en": "Has location",
        "pt": "Localiza-se em"
    },

    //toasts
    "submit_error": {
        "en": "There was an error submiting your rating. Please try again later.",
        "pt": "Houve um erro a submeter a sua avaliação. Por favor tente novamente mais tarde."
    },
    "suggestion_success": {
        "en": "The concept was successfully submitted! Thank you for your cooperation.",
        "pt": "O conceito foi submetido com sucesso. Obrigado pela sua cooperação."
    },
    "suggestion_error": {
        "en": "There was an error submiting your suggestion. Please try again later.",
        "pt": "Houve um erro a submeter a sua sugestão. Por favor tente novamente mais tarde."
    },
    "already_processed": {
        "en": "This page was already processed.",
        "pt": "Esta página já foi processada."
    }
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



