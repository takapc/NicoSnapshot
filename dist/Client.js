"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NicoSnapshot = void 0;
require("./constant");
const constant_1 = require("./constant");
class NicoSnapshot {
    constructor() {
        this.endpoint =
            "https://api.search.nicovideo.jp/api/v2/snapshot/video/contents/search";
        this.query = [];
        this.targets = [];
        this.fields = [];
        this.context = "NicoSnapshot v0.1.0";
        this.sort = new constant_1.Sorter();
        this.limit = 10;
        this.offset = 0;
        this.filters = [];
    }
    //Query関連
    AddAndQuery(...q) {
        const query = new constant_1.QueryString(constant_1.QueryType.AND, [...q]);
        this.query.push(query);
        return this;
    }
    SetAndQuery(...q) {
        const query = new constant_1.QueryString(constant_1.QueryType.AND, [...q]);
        this.query = [query];
        return this;
    }
    AddOrQuery(...q) {
        if (q.length <= 1)
            throw new Error("OrQuery must have two or more arguments.");
        const query = new constant_1.QueryString(constant_1.QueryType.OR, q);
        this.query.push(query);
        return this;
    }
    SetOrQuery(...q) {
        if (q.length <= 1)
            throw new Error("OrQuery must have two or more arguments.");
        const query = new constant_1.QueryString(constant_1.QueryType.OR, q);
        this.query = [query];
        return this;
    }
    AddNotQuery(...q) {
        const query = new constant_1.QueryString(constant_1.QueryType.NOT, [...q]);
        this.query.push(query);
        return this;
    }
    BuildQuery() {
        let build = "?q=";
        for (let q of this.query) {
            let u;
            switch (q.queryType) {
                case constant_1.QueryType.AND:
                    u = q.param.join(" ");
                    break;
                case constant_1.QueryType.OR:
                    u = q.param.join(" OR ");
                    break;
                case constant_1.QueryType.NOT:
                    u = q.param.map((e) => `-${e}`).join(" ");
                    break;
            }
            build += `${u} `;
        }
        build = build.slice(0, -1);
        return build;
    }
    //targets関連
    AddTargets(...q) {
        this.targets.push(...q);
        return this;
    }
    SetTargets(...q) {
        this.targets = q;
        return this;
    }
    TagsExact() {
        this.targets = [constant_1.Field.tagsExact];
        return this;
    }
    Keyword() {
        this.targets = [constant_1.Field.title, constant_1.Field.description, constant_1.Field.tags];
        return this;
    }
    BuildTarget() {
        return "&targets=" + this.targets.join(",");
    }
    //fields関連
    AddFields(...p) {
        this.fields.push(...p);
        return this;
    }
    SetFields(...p) {
        this.fields = p;
        return this;
    }
    BuildFields() {
        return "&fields=" + this.fields.join(",");
    }
    //Filter関連
    AddFilter(type, field, p) {
        const filter = new constant_1.Filter(type, field, p);
        this.filters.push(filter);
        return this;
    }
    SetFilter(type, field, p) {
        const filter = new constant_1.Filter(type, field, p);
        this.filters = [filter];
        return this;
    }
    BuildFilter() {
        let build = "";
        for (let f of this.filters) {
            let u = `&filters[${f.field}][${f.type}]=${f.param}`;
            build += u;
        }
        return build;
    }
    //Sort
    SetSorter(type, field) {
        this.sort = new constant_1.Sorter(type, field);
        return this;
    }
    BuildSorter() {
        return `&_sort=${this.sort.type}${this.sort.field}`;
    }
    //context
    SetContext(p) {
        this.context = p;
        return this;
    }
    BuildContext() {
        return `&_context=${this.context}`;
    }
    //limit
    SetLimit(p) {
        this.limit = p;
        return this;
    }
    BuildLimit() {
        return `&_limit=${this.limit}`;
    }
    //offset
    SetOffset(p) {
        this.offset = p;
        return this;
    }
    AddOffset(p) {
        this.offset += p;
        return this;
    }
    BuildOffset() {
        return `&_offset=${this.offset}`;
    }
    //url
    BuildURL() {
        let build = this.endpoint;
        build += this.BuildQuery();
        build += this.BuildContext();
        build += this.BuildTarget();
        build += this.BuildFields();
        build += this.BuildLimit();
        build += this.BuildOffset();
        build += this.BuildSorter();
        build += this.BuildFilter();
        return build;
    }
    Fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(this.BuildURL()).then((e) => e.json());
            return res;
        });
    }
}
exports.NicoSnapshot = NicoSnapshot;
//# sourceMappingURL=Client.js.map