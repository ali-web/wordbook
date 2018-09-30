module.exports = (() => {
    const WordSchema = {
        text: {type: String, required: true},
        definition: String,
        meaning: [ {type: String} ],
        example: String,
        found:   [ {type: String} ],
        hashtag: [ {type: String} ],
        synonym: [ {type: String} ],
        antonym: [ {type: String} ],
        family:  [ {type: String} ],
        kind: {
            type: String,
            enum: ['verb', 'noun', 'adjective', 'adverb', 'expression', 'idiom', 'sentence']
        },
        formality: {
            type: String,
            enum: ['formal', 'informal', 'slang'],
        },
        tense: {
            type: String,
            enum: ['present', 'past', 'pp', "none"],
        },
        root: {
            present: String,
            past: String,
            pp: String
        },
        creator: String,
        created_at: {type: Date, default: Date.now}
    };

    return WordSchema;
  })();