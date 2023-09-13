// let cards = [
//     {
//         id:0,
//         name: "Vinegar",
//         type: "Ingredient",
//         good: "A natural disinfectant that combats odors",
//         bad: "The acidity wears down granite or natural stone countertops",
//         info: ""

//     },

//     {
//         id:1,
//         name: "Hydrogen Peroxide",
//         type: "Ingredient",
//         good: "A natural bleaching compound that kills bacteria, viruses, and mold",
//         bad: "Can cause mild irritation of throat and eyes",
//         info: ""
//     },

//     {
//         id:2,
//         name: "Bleach",
//         type: "Ingredient",
//         good: "Strong and effective disinfectant",
//         bad: "Reacts with ammonia and acids that create toxic fumes ",
//         info: ""
//     },

//     {
//         id:3,
//         name: "Ammonia",
//         type: "Ingredient",
//         good: "Effective at breaking down household grime or stains such as cooking grease and wine stains.",
//         bad: "High concentration can cause corrosive injuries to eyes and skin with permanant damages",
//         info: ""
//     },

//     {
//         id:4,
//         name: "Isopropyl Alcohol",
//         type: "Ingredient",
//         good: "Clean and disinfect hard surfaces",
//         bad: "Can damage finished surfaces and certain fabrics. Can create harmful fumes ",
//         info: "Also known as rubbing alcohol, it can be used as a disinfectant and sterilizer. Due to its high alcohol content, it's not recommended near fire. It evaporates quickly so it can create harmful fumes."
//     },

//     {
//         id:5,
//         name: "Toilet Bowl Cleaner",
//         type: "Ingredient",
//         good: "Effectively and efficiently cleans and disinfects toilet and combats odors",
//         bad: "Most contain acidic chemicals that can be harmful to lungs and skin",
//         info: ""
//     },

//     {
//         id:6,
//         name: "Mold Remover",
//         type: "Ingredient",
//         good: "Reduces spread of mold and eliminates odors",
//         bad: "Most contain hydrogen peroxide and bleach. Inhaling it can irritate throat, lungs, and skin. ",
//         info: ""
//     },

//     {
//         id:7,
//         name: "Baking Soda",
//         type: "Ingredient",
//         good: "Natural product that is also in food that removes tough stains and odors",
//         bad: "Leaves behind a white, dusty residue after it dries",
//         info: ""
//     },

//     {
//         id:8,
//         name: "Drain Cleaner",
//         type: "Ingredient",
//         good: "Effective and efficient way to unclog and clean drains",
//         bad: "Contains toxic chemicals that are highly corrosive. Mixing different drain cleaners that contain a variety of toxic chemical can create toxic fumes",
//         info: ""
//     },

//     {
//         id:9,
//         name: "Oxalic Acid",
//         type: "Ingredient",
//         good: "A strong acid that removes rust and tough stains on concrete and metal. It bleaches wood by restoring wood to its natural color",
//         bad: "May cause skin irritation from exposure",
//         info: ""
//     },

//     {
//         id:10,
//         name: "Trichloroisocyanuric Acid",
//         type: "Ingredient",
//         good: "Eradicates microorganisms in swimming pools and hot tubs",
//         bad: "Fumes can irritate and burn skin, eyes, nose, throat, and lungs",
//         info: ""
//     },

//     {
//         id:11,
//         name: "Urine",
//         type: "Ingredient",
//         good: "",
//         bad: "",
//         info: ""
//     },

//     {
//         id:12,
//         name: "Glass Cleaner",
//         type: "Ingredient",
//         good: "",
//         bad: "",
//         info: ""
//     },

//     {
//         id:14,
//         name: "Peracetic Acid",
//         type: "Effect",
//         good: "",
//         bad: "",
//         info: "A colorless liquid that can severly irritate lungs and burn skin and eyes."
//     },

//     {
//         id:15,
//         name: "Chloramine",
//         type: "Effect",
//         good: "",
//         bad: "",
//         info: "Known as mustard gas from WWI, a yellow to colorless liquid that let out fumes that cause irritation to eyes, nose, and throat. It is less volatile than Chlorine Gas but it stays in water longer."
//     },

//     {
//         id:16,
//         name: "Chlorine Gas",
//         type: "Effect",
//         good: "",
//         bad: "",
//         info: "Yellow poisonous gas that causes coughing, eye and nose irritation, and shortness of breath."
//     },

//     {
//         id:17,
//         name: "Phosphine Gas",
//         type: "Effect",
//         good: "",
//         bad: "",
//         info: "Colorless and flammable toxic that causes severe lung irritation and compromises cardiac functions. "
//     },

//     {
//         id:18,
//         name: "Chloroform",
//         type: "Effect",
//         good: "",
//         bad: "",
//         info: "Colorless liquid that quickly evaporates into a gas that is harmful to eyes, skin, liver, kidneys, and nervous system. "
//     },

//     {
//         id:19,
//         name: "Nullify",
//         type: "Nullify",
//         good: "",
//         bad: "",
//         info: "Not harmful. Does not clean as intended. The mixture is not compatible and neutralizes its effect.  "
//     },


//     {
//         id:21,
//         name: "Oven Cleaner",
//         type: "Ingredient",
//         good: "",
//         bad: "",
//         info: ""
//     },

//     {
//         id:22,
//         name: "Hydrochloric Acid",
//         type: "Ingredient",
//         good: "Common ingredient in bathroom cleaing supplies that can clean tough stains",
//         bad: "Corrosive nature cause irritation and burn to eyes, skin, and throat.",
//         info: "Hydrogen chloride can be formed during the burning of many plastics. Hydrochloric acid is found in the gases evolved from volcanoes, particularly ones found in Mexico and South America. Hydrochloric acid is also found in the digestive tract of most mammals."
//     },
//     {
//         id:24,
//         name: "Lemon Juice",
//         type: "Ingredient",
//         good: "Best all-natural cleaner due to its low pH and antibacterial properties",
//         bad: "Can corrode marble and leave marks and stains.",
//         info: ""
//     },

//     {
//         id:25,
//         name: "Citric Acid",
//         type: "Ingredient",
//         good: "Safe and effective disinfectant that removes mold and mildew",
//         bad: "Acidic content that can irritate nose and trigger asthma symptoms",
//         info: ""
//     },



// ]

// let cardCombo = [
//     {
//         ingredients: ["Hydrogen Peroxide", "Vinegar"],
//         outcome: "Peracetic Acid"
//     },

//     {
//         ingredients: ["Bleach", "Vinegar"],
//         outcome: "Chlorine Gas"
//     },

//     {
//         ingredients: ["Bleach", "Ammonia"],
//         outcome: "Chloramines"
//     },

//     {
//         ingredients: ["Bleach", "Rubbing Alcohol"],
//         outcome: "Chloroform"
//     },

//     {
//         ingredients: ["Bleach", "Toilet Bowl Cleaner"],
//         outcome: "Chlorine Gas"
//     },

//     {
//         ingredients: ["Bleach", "Mold Remover"],
//         outcome: "Chlorine Gas"
//     },

//     {
//         ingredients: ["Bleach", "Oven Cleaner"],
//         outcome: "Chlorine Gas"
//     },

//     {
//         ingredients: ["Vinegar", "Baking Soda"],
//         outcome: "Nullify"
//     },

//     {
//         ingredients: ["Bleach", "Drain Cleaner"],
//         outcome: "Chlorine Gas"
//     },

//     {
//         ingredients: ["Bleach", "Glass Cleaner"],
//         outcome: "Chlorine Gas"
//     },

//     {
//         ingredients: ["Trichloroisocyanuric Acid", "Oxalic Acid"],
//         outcome: "Chlorine Gas"
//     },

//     {
//         ingredients: ["Bleach", "Lemon Juice"],
//         outcome: "Chlorine Gas"
//     },

//     {
//         ingredients: ["Drain Cleaner", "Drain Cleaner"],
//         outcome: "Chlorine Gas"
//     },

//         {
//         ingredients: ["Bleach", "Citric Acid"],
//         outcome: "Chlorine Gas"
//     },

// ]

// export {cards, cardCombo};

let cardInfo = {
    cards: [
        {
            id:0,
            name: "Vinegar",
            type: "Ingredient",
            good: "A natural disinfectant that combats odors",
            bad: "The acidity wears down granite or natural stone countertops",
            info: ""
    
        },
    
        {
            id:1,
            name: "Hydrogen Peroxide",
            type: "Ingredient",
            good: "A natural bleaching compound that kills bacteria, viruses, and mold",
            bad: "Can cause mild irritation of throat and eyes",
            info: ""
        },
    
        {
            id:2,
            name: "Bleach",
            type: "Ingredient",
            good: "Strong and effective disinfectant",
            bad: "Reacts with ammonia and acids that create toxic fumes ",
            info: ""
        },
    
        {
            id:3,
            name: "Ammonia",
            type: "Ingredient",
            good: "Effective at breaking down household grime or stains such as cooking grease and wine stains.",
            bad: "High concentration can cause corrosive injuries to eyes and skin with permanant damages",
            info: ""
        },
    
        {
            id:4,
            name: "Isopropyl Alcohol",
            type: "Ingredient",
            good: "Clean and disinfect hard surfaces",
            bad: "Can damage finished surfaces and certain fabrics. Can create harmful fumes ",
            info: "Also known as rubbing alcohol, it can be used as a disinfectant and sterilizer. Due to its high alcohol content, it's not recommended near fire. It evaporates quickly so it can create harmful fumes."
        },
    
        {
            id:5,
            name: "Toilet Bowl Cleaner",
            type: "Ingredient",
            good: "Effectively and efficiently cleans and disinfects toilet and combats odors",
            bad: "Most contain acidic chemicals that can be harmful to lungs and skin",
            info: ""
        },
    
        {
            id:6,
            name: "Mold Remover",
            type: "Ingredient",
            good: "Reduces spread of mold and eliminates odors",
            bad: "Most contain hydrogen peroxide and bleach. Inhaling it can irritate throat, lungs, and skin. ",
            info: ""
        },
    
        {
            id:7,
            name: "Baking Soda",
            type: "Ingredient",
            good: "Natural product that is also in food that removes tough stains and odors",
            bad: "Leaves behind a white, dusty residue after it dries",
            info: ""
        },
    
        {
            id:8,
            name: "Drain Cleaner",
            type: "Ingredient",
            good: "Effective and efficient way to unclog and clean drains",
            bad: "Contains toxic chemicals that are highly corrosive. Mixing different drain cleaners that contain a variety of toxic chemical can create toxic fumes",
            info: ""
        },
    
        {
            id:9,
            name: "Oxalic Acid",
            type: "Ingredient",
            good: "A strong acid that removes rust and tough stains on concrete and metal. It bleaches wood by restoring wood to its natural color",
            bad: "May cause skin irritation from exposure",
            info: ""
        },
    
        {
            id:10,
            name: "Trichloroisocyanuric Acid",
            type: "Ingredient",
            good: "Eradicates microorganisms in swimming pools and hot tubs",
            bad: "Fumes can irritate and burn skin, eyes, nose, throat, and lungs",
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
            id:14,
            name: "Peracetic Acid",
            type: "Effect",
            good: "",
            bad: "",
            info: "A colorless liquid that can severly irritate lungs and burn skin and eyes."
        },
    
        {
            id:15,
            name: "Chloramine",
            type: "Effect",
            good: "",
            bad: "",
            info: "Known as mustard gas from WWI, a yellow to colorless liquid that let out fumes that cause irritation to eyes, nose, and throat. It is less volatile than Chlorine Gas but it stays in water longer."
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
            id:21,
            name: "Oven Cleaner",
            type: "Ingredient",
            good: "",
            bad: "",
            info: ""
        },
    
        {
            id:22,
            name: "Hydrochloric Acid",
            type: "Ingredient",
            good: "Common ingredient in bathroom cleaing supplies that can clean tough stains",
            bad: "Corrosive nature cause irritation and burn to eyes, skin, and throat.",
            info: "Hydrogen chloride can be formed during the burning of many plastics. Hydrochloric acid is found in the gases evolved from volcanoes, particularly ones found in Mexico and South America. Hydrochloric acid is also found in the digestive tract of most mammals."
        },
        {
            id:24,
            name: "Lemon Juice",
            type: "Ingredient",
            good: "Best all-natural cleaner due to its low pH and antibacterial properties",
            bad: "Can corrode marble and leave marks and stains.",
            info: ""
        },
    
        {
            id:25,
            name: "Citric Acid",
            type: "Ingredient",
            good: "Safe and effective disinfectant that removes mold and mildew",
            bad: "Acidic content that can irritate nose and trigger asthma symptoms",
            info: ""
        },
    
    
    
    ],

    combo: [
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
    
            {
            ingredients: ["Bleach", "Citric Acid"],
            outcome: "Chlorine Gas"
        },
    
    ]
}