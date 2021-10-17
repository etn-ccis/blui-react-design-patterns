import { InfoListItemProps } from '@pxblue/react-components';

export type SortableListItemProps = Partial<InfoListItemProps> & {
    listItem: string;
    classes: Record<string, any>;
};

export type SortableListEditProps = {
    list: string[];
    isSorting: boolean;
    classes: Record<string, any>;
};

export type OnSortEndProps = {
    oldIndex: number;
    newIndex: number;
};
