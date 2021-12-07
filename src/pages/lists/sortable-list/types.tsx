import { InfoListItemProps } from '@brightlayer-ui/react-components';

export type SortableListItemProps = Partial<InfoListItemProps> & {
    listItem: string;
    classes: Record<string, any>;
};

export type SortableListEditProps = {
    list: string[];
    isMobile: boolean;
    isSorting: boolean;
    classes: Record<string, any>;
};

export type OnSortEndProps = {
    oldIndex: number;
    newIndex: number;
};
