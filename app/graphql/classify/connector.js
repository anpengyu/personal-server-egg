'use strict';

const DataLoader = require('dataloader');
const _ = require('lodash');
const ClassifyModel = require('../../model/classify');
const Classify = require('../../entity/blog/Classify').default

class ClassifyConnector {

    //添加分类
    async addClassify(params) {
        const classify = await Classify.save({ ...params });
        return classify;
    }

    async loadClassifyForArticle(params) {
        console.log('params',params.course)
        const classify = await Classify.findOne({
            where: {
                name: params.course,
                userId:params.userId,
            },
        });
        return classify;
    }

    async loadClassifyForUser(id) {
        const classify = await Classify.find({
            where: {
                userId: id,
            },
        });
        return classify;
    }

    async loadClassify() {
        const classify = await Classify.find();
        return classify;
    }

}

module.exports = ClassifyConnector;

