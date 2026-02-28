
type PreviewMessage = {
    id: number;
    content: string;
    isSent: boolean;
};
const PREVIEW_MESSAGES: PreviewMessage[] = [
    { id: 1, content: 'Hey! How are you doing?', isSent: false },
    { id: 2, content: "I'm doing great, thanks!", isSent: true },
    { id: 3, content: 'Want to catch up later?', isSent: false },
    { id: 4, content: 'Sure! How about 7 PM?', isSent: true },
];

export default PREVIEW_MESSAGES;
