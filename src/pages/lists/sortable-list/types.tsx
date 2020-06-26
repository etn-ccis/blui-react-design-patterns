export type President = {
    firstName: string;
    lastName: string;
    year: number;
};

export type SortableListItemProps = {
    president: President;
};

export type SortableListEditProps = {
    presidents: President[];
};

export type OnSortEndProps = {
    oldIndex: number;
    newIndex: number;
};
