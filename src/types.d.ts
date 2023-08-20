interface NestedItem {
    id: string;
    text: string;
}

interface TopLevelItem {
    id: string;
    text: string;
    children: NestedItem[];
}
interface DraggableListProps {
    items: Item[];
}