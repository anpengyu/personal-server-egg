'use strict'

module.exports = {
    Query: {
        loadClassify(root, _, context) {
            return context.connector.classify.loadClassify();
        },
        loadClassifyForUser(root, params, context) {
            return context.connector.classify.loadClassifyForUser(params.userId);
        }
    },
    User: {
        classify(root, id, context) {
            return context.connector.classify.loadClassifyForUser(root.id);
        }
    },
    Mutation: {
        addClassify(root, params, context) {
            return context.connector.classify.addClassify(params);
        }
    }
}