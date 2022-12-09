export const getSnakes = () => {
    return [
        {
            head: 42,
            tail: 18,
            imgClass: "snake4",
        },
        {
            head: 77,
            tail: 57,
            imgClass: "snake2",
        },
        {
            head: 50,
            tail: 33,
            imgClass: "snake3",
        },
        {
            head: 96,
            tail: 52,
            imgClass: "snake5",
        },
    ];
}
export const getLadder = () => {
    return [
        {
            from: 6,
            to: 34,
            imgClass: "ladder1",
        },
        {
            from: 66,
            to: 94,
            imgClass: "ladder2",
        },
    ];
}
export const getPlayer = () => {
    return [
        {
            name: "Player1",
            id: 1,
            status: 0,
            imgClass: "P1",
            start: false,
            color: 'text-yellow-500 bg-yellow-200 border-yellow-500',
            colorName: 'bg-yellow-500'
        }
    ];
}
