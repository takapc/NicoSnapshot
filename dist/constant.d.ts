export declare enum Field {
    contendId = "contentId",
    title = "title",
    description = "description",
    user_id = "userId",
    channel_id = "channelId",
    view_count = "viewCounter",
    mylist_count = "mylistCounter",
    like_count = "likeCounter",
    playtime = "lengthSeconds",
    thumbnail_url = "thumbnailUrl",
    startTime = "startTime",
    lastComments = "lastResBody",
    comment_count = "commentCounter",
    lastCommentTime = "lastCommentTime",
    categoryTags = "categoryTags",
    tags = "tags",
    tagsExact = "tagsExact",
    genre = "genre",
    genre_keyword = "genre.keyword"
}
export declare enum SortType {
    Ascending = "+",
    Descending = "-"
}
export declare class Sorter {
    type: SortType;
    field: Field;
    constructor(type?: SortType, field?: Field);
}
export declare class QueryString {
    queryType: QueryType;
    param: string[];
    constructor(type: QueryType, param: string[]);
}
export declare enum QueryType {
    AND = "AND",
    OR = "OR",
    NOT = "NOT"
}
export declare class Filter {
    type: FilterType;
    field: Field;
    param: string;
    constructor(type: FilterType, field: Field, p: string);
}
export declare enum FilterType {
    equal = "0",
    gt = "gt",
    gte = "gte",
    lt = "lt",
    lte = "lte"
}
