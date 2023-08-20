const itemsList: TopLevelItem[] = [
    { id: 'item-1', text: 'Item 1', children: [], },
    {
        id: 'item-2',
        text: 'Item 2',
        children: [
            { id: 'item-2-1', text: 'Nested Item 1' },
            { id: 'item-2-2', text: 'Nested Item 2' },
        ],
    },
    { id: 'item-3', text: 'Item 3', children: [] },
];
export default itemsList