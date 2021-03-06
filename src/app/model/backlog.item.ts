export class BacklogItem {
    id: string;
    title: string;
    value: number;
    type: BacklogItemType;

    constructor(id: string, title: string, value: number, type?: BacklogItemType) {
        this.title = title;
        this.value = value;
        this.type = type || BacklogItemType.HISTORY_TYPE;
    }

    isNew() {
      return !this.id;
    }
}

export enum BacklogItemType {
    HISTORY_TYPE,
    BUG
}
