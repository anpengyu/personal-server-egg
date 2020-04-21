'use strict'

module.exports = {
    Query: {
        loadClassify(root, _, context) {
            return context.connector.classify.loadClassify();
        },
        loadClassifyForUser(root, id, context) {
            return context.connector.classify.loadClassifyForUser(id);
        }
    },
    Mutation: {
        addClassify(root, params, context) {
            return context.connector.classify.addClassify(params);
        }
    }
}