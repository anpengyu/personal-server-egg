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
    Article: {
        classify(root, params, context) {
            console.log('root',root)
            console.log('params',params)
            return context.connector.classify.loadClassifyForArticle(root);
        }
    },
    Mutation: {
        addClassify(root, params, context) {
            return context.connector.classify.addClassify(params);
        }
    }
}