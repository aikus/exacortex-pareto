export type idGenerator = () => string;

export default function idGenerator():string {
    const now = new Date(),
        rand = Math.round(Math.random() * 10000000);
    return [
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds(),
        rand
    ].join('');
}