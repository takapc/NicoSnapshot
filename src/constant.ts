export enum Field {
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
    genre_keyword = "genre.keyword",
}

export enum SortType {
    Ascending = "+", //昇順
    Descending = "-", //降順
}

export class Sorter {
    type: SortType;
    field: Field;
    constructor(
        type: SortType = SortType.Descending,
        field: Field = Field.view_count
    ) {
        this.type = type;
        this.field = field;
    }
}

export class QueryString {
    queryType: QueryType;
    param: string[];

    constructor(type: QueryType, param: string[]) {
        this.queryType = type;
        this.param = param;
    }
}

export enum QueryType {
    AND = "AND",
    OR = "OR",
    NOT = "NOT",
}

export class Filter {
    type: FilterType;
    field: Field;
    param: string;
    constructor(type: FilterType, field: Field, p: string) {
        this.type = type;
        this.field = field;
        this.param = p;
    }
}

export enum FilterType {
    equal = "0",
    gt = "gt", //より上
    gte = "gte", //以上
    lt = "lt", //より下
    lte = "lte", //以下
}
