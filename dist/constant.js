"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterType = exports.Filter = exports.QueryType = exports.QueryString = exports.Sorter = exports.SortType = exports.Field = void 0;
var Field;
(function (Field) {
    Field["contendId"] = "contentId";
    Field["title"] = "title";
    Field["description"] = "description";
    Field["user_id"] = "userId";
    Field["channel_id"] = "channelId";
    Field["view_count"] = "viewCounter";
    Field["mylist_count"] = "mylistCounter";
    Field["like_count"] = "likeCounter";
    Field["playtime"] = "lengthSeconds";
    Field["thumbnail_url"] = "thumbnailUrl";
    Field["startTime"] = "startTime";
    Field["lastComments"] = "lastResBody";
    Field["comment_count"] = "commentCounter";
    Field["lastCommentTime"] = "lastCommentTime";
    Field["categoryTags"] = "categoryTags";
    Field["tags"] = "tags";
    Field["tagsExact"] = "tagsExact";
    Field["genre"] = "genre";
    Field["genre_keyword"] = "genre.keyword";
})(Field || (exports.Field = Field = {}));
var SortType;
(function (SortType) {
    SortType["Ascending"] = "+";
    SortType["Descending"] = "-";
})(SortType || (exports.SortType = SortType = {}));
class Sorter {
    constructor(type = SortType.Descending, field = Field.view_count) {
        this.type = type;
        this.field = field;
    }
}
exports.Sorter = Sorter;
class QueryString {
    constructor(type, param) {
        this.queryType = type;
        this.param = param;
    }
}
exports.QueryString = QueryString;
var QueryType;
(function (QueryType) {
    QueryType["AND"] = "AND";
    QueryType["OR"] = "OR";
    QueryType["NOT"] = "NOT";
})(QueryType || (exports.QueryType = QueryType = {}));
class Filter {
    constructor(type, field, p) {
        this.type = type;
        this.field = field;
        this.param = p;
    }
}
exports.Filter = Filter;
var FilterType;
(function (FilterType) {
    FilterType["equal"] = "0";
    FilterType["gt"] = "gt";
    FilterType["gte"] = "gte";
    FilterType["lt"] = "lt";
    FilterType["lte"] = "lte";
})(FilterType || (exports.FilterType = FilterType = {}));
//# sourceMappingURL=constant.js.map