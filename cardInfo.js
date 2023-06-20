let cards = [
    {
        id:0,
        name: "Vinegar",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:1,
        name: "Hydrogen Peroxide",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:2,
        name: "Bleach",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:3,
        name: "Ammonia",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:4,
        name: "Rubbing Alcohol",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:5,
        name: "Toilet Bowl Cleaner",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:6,
        name: "Mold Remover",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:7,
        name: "Baking Soda",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:8,
        name: "Drain Cleaner",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:9,
        name: "Oxalic Acid",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:10,
        name: "Trichloroisocyanuric Acid",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:11,
        name: "Urine",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:12,
        name: "Glass Cleaner",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:13,
        name: "Peracetic Acid",
        type: "Effect",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:14,
        name: "Peracetic Acid",
        type: "Effect",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:15,
        name: "Chloramines",
        type: "Effect",
        good: "",
        bad: "",
        info: "Poison that is less volatile than Chlorine Gas but it stays in water longer"
    },

    {
        id:16,
        name: "Chlorine Gas",
        type: "Effect",
        good: "",
        bad: "",
        info: "Yellow poisonous gas that causes coughing, eye and nose irritation, and shortness of breath."
    },

    {
        id:17,
        name: "Phosphine Gas",
        type: "Effect",
        good: "",
        bad: "",
        info: "Colorless and flammable toxic that causes severe lung irritation and compromises cardiac functions. "
    },

    {
        id:18,
        name: "Chloroform",
        type: "Effect",
        good: "",
        bad: "",
        info: "Colorless liquid that quickly evaporates into a gas that is harmful to eyes, skin, liver, kidneys, and nervous system. "
    },

    {
        id:19,
        name: "Nullify",
        type: "Nullify",
        good: "",
        bad: "",
        info: "Not harmful. Does not clean as intended. The mixture is not compatible and neutralizes its effect.  "
    },

    {
        id:20,
        name: "Baking Soda",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:21,
        name: "Oven Cleaner",
        type: "Ingredient",
        good: "",
        bad: "",
        info: ""
    },

    {
        id:22,
        name: "Trichloroisocyanuric Acid",
        type: "Ingredient",
        good: "Eradicating microorganisms in swimming pools and hot tubs",
        bad: "",
        info: ""
    },

    {
        id:23,
        name: "Oxalic Acid",
        type: "Ingredient",
        good: "Removes rust and other difficult stains",
        bad: "",
        info: ""
    },

    {
        id:24,
        name: "Lemon Juice",
        type: "Ingredient",
        good: "Best all-natural cleaner",
        bad: "",
        info: ""
    },

    {
        id:25,
        name: "Citric Acid",
        type: "Ingredient",
        good: "Removes mold and mildew",
        bad: "",
        info: ""
    },



]

let cardCombo = [
    {
        ingredients: ["Hydrogen Peroxide", "Vinegar"],
        outcome: "Peracetic Acid"
    },

    {
        ingredients: ["Bleach", "Vinegar"],
        outcome: "Chlorine Gas"
    },

    {
        ingredients: ["Bleach", "Ammonia"],
        outcome: "Chloramines"
    },

    {
        ingredients: ["Bleach", "Rubbing Alcohol"],
        outcome: "Chloroform"
    },

    {
        ingredients: ["Bleach", "Toilet Bowl Cleaner"],
        outcome: "Chlorine Gas"
    },

    {
        ingredients: ["Bleach", "Mold Remover"],
        outcome: "Chlorine Gas"
    },

    {
        ingredients: ["Bleach", "Oven Cleaner"],
        outcome: "Chlorine Gas"
    },

    {
        ingredients: ["Vinegar", "Baking Soda"],
        outcome: "Nullify"
    },

    {
        ingredients: ["Bleach", "Drain Cleaner"],
        outcome: "Chlorine Gas"
    },

    {
        ingredients: ["Bleach", "Glass Cleaner"],
        outcome: "Chlorine Gas"
    },

    {
        ingredients: ["Trichloroisocyanuric Acid", "Oxalic Acid"],
        outcome: "Chlorine Gas"
    },

    {
        ingredients: ["Bleach", "Lemon Juice"],
        outcome: "Chlorine Gas"
    },

    {
        ingredients: ["Drain Cleaner", "Drain Cleaner"],
        outcome: "Chlorine Gas"
    },


]

export {cards, cardCombo};