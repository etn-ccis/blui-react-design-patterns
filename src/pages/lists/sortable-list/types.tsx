import { InfoListItemProps } from '@pxblue/react-components';

export type President = {
    firstName: string;
    lastName: string;
    year: number;
};

export type SortableListItemProps = Partial<InfoListItemProps> & {
    listItem: string;
};

export type SortableListEditProps = {
    list: string[];
};

export type OnSortEndProps = {
    oldIndex: number;
    newIndex: number;
};
