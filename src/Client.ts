import "./constant";
import {
    QueryString,
    QueryType,
    Field,
    Sorter,
    Filter,
    FilterType,
    SortType,
} from "./constant";

export class NicoSnapshot {
    endpoint: string;
    query: QueryString[]; //必須
    targets: Field[]; //必須
    fields: Field[];
    context: string; //必須
    sort: Sorter; //必須
    limit: number;
    offset: number;
    filters: Filter[];

    constructor() {
        this.endpoint =
            "https://api.search.nicovideo.jp/api/v2/snapshot/video/contents/search";
        this.query = [];
        this.targets = [];
        this.fields = [];
        this.context = "NicoSnapshot v0.1.0";
        this.sort = new Sorter();
        this.limit = 10;
        this.offset = 0;
        this.filters = [];
    }

    //Query関連
    AddAndQuery(...q: string[]): NicoSnapshot {
        const query = new QueryString(QueryType.AND, [...q]);
        this.query.push(query);
        return this;
    }

    SetAndQuery(...q: string[]): NicoSnapshot {
        const query = new QueryString(QueryType.AND, [...q]);
        this.query = [query];
        return this;
    }
    AddOrQuery(...q: string[]): NicoSnapshot {
        if (q.length <= 1)
            throw new Error("OrQuery must have two or more arguments.");
        const query = new QueryString(QueryType.OR, q);
        this.query.push(query);
        return this;
    }
    SetOrQuery(...q: string[]): NicoSnapshot {
        if (q.length <= 1)
            throw new Error("OrQuery must have two or more arguments.");
        const query = new QueryString(QueryType.OR, q);
        this.query = [query];
        return this;
    }
    AddNotQuery(...q: string[]): NicoSnapshot {
        const query = new QueryString(QueryType.NOT, [...q]);
        this.query.push(query);
        return this;
    }
    private BuildQuery(): string {
        let build = "?q=";
        for (let q of this.query) {
            let u: string;
            switch (q.queryType) {
                case QueryType.AND:
                    u = q.param.join(" ");
                    break;
                case QueryType.OR:
                    u = q.param.join(" OR ");
                    break;
                case QueryType.NOT:
                    u = q.param.map((e) => `-${e}`).join(" ");
                    break;
            }
            build += `${u} `;
        }
        build = build.slice(0, -1);
        return build;
    }

    //targets関連
    AddTargets(...q: Field[]): NicoSnapshot {
        this.targets.push(...q);
        return this;
    }
    SetTargets(...q: Field[]): NicoSnapshot {
        this.targets = q;
        return this;
    }
    TagsExact(): NicoSnapshot {
        this.targets = [Field.tagsExact];
        return this;
    }
    Keyword(): NicoSnapshot {
        this.targets = [Field.title, Field.description, Field.tags];
        return this;
    }
    private BuildTarget(): string {
        return "&targets=" + this.targets.join(",");
    }

    //fields関連
    AddFields(...p: Field[]): NicoSnapshot {
        this.fields.push(...p);
        return this;
    }
    SetFields(...p: Field[]): NicoSnapshot {
        this.fields = p;
        return this;
    }
    private BuildFields(): string {
        return "&fields=" + this.fields.join(",");
    }

    //Filter関連
    AddFilter(type: FilterType, field: Field, p: string): NicoSnapshot {
        const filter = new Filter(type, field, p);
        this.filters.push(filter);
        return this;
    }
    SetFilter(type: FilterType, field: Field, p: string): NicoSnapshot {
        const filter = new Filter(type, field, p);
        this.filters = [filter];
        return this;
    }
    private BuildFilter(): string {
        let build = "";
        for (let f of this.filters) {
            let u = `&filters[${f.field}][${f.type}]=${f.param}`;
            build += u;
        }
        return build;
    }
    //Sort
    SetSorter(type: SortType, field: Field): NicoSnapshot {
        this.sort = new Sorter(type, field);
        return this;
    }
    private BuildSorter(): string {
        return `&_sort=${this.sort.type}${this.sort.field}`;
    }
    //context
    SetContext(p: string): NicoSnapshot {
        this.context = p;
        return this;
    }
    private BuildContext(): string {
        return `&_context=${this.context}`;
    }
    //limit
    SetLimit(p: number): NicoSnapshot {
        this.limit = p;
        return this;
    }
    private BuildLimit(): string {
        return `&_limit=${this.limit}`;
    }
    //offset
    SetOffset(p: number): NicoSnapshot {
        this.offset = p;
        return this;
    }
    AddOffset(p: number): NicoSnapshot {
        this.offset += p;
        return this;
    }
    private BuildOffset(): string {
        return `&_offset=${this.offset}`;
    }
    //url
    BuildURL(): string {
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
    async Fetch(): Promise<any> {
        const res = await fetch(this.BuildURL()).then((e) => e.json());
        return res;
    }
}
