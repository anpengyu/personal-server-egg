'use strict';

const DataLoader = require('dataloader');
const _ = require('lodash');
const ClassifyModel = require('../../model/classify');

class ClassifyConnector {
    constructor(ctx) {
        this.ctx = ctx;
        this.loader = new DataLoader(this.fetch.bind(this));
        this.proxy = ctx.app.model.Classify;
    }

    fetch(ids) {
        const classify = this.proxy.findAll({
            where: {
                id: {
                    $in: ids,
                },
            },
        }).then(us =>
            us.map(u => u.toJSON())
        );
        return classify;
    }

    //添加分类
    async addClassify(params) {
        const classify = await this.proxy.create({ ...params });
        return classify;
    }

    async loadClassifyForUser(id) {
        const classify = await this.proxy.findAll({
            where: {
                userId: id,
            },
        });
        return classify;
    }

    async loadClassify() {
        const classify = await this.proxy.findAll();
        return classify;
    }

}

module.exports = ClassifyConnector;

