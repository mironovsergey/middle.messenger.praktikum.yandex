import type { TMessage } from '../../../../utils/types';
import Messages from './messages';
import MessagesItem from '../messages-item';
import MessagesDate from '../messages-date';
import { connect } from '../../../../services/store';
import { formatDate } from '../../../../utils';

const withData = connect(({ messages }: { messages?: TMessage[] }) => {
    if (!messages) {
        return {};
    }

    // Сортировка сообщений по дате и времени
    messages.sort((a, b) => {
        const aTime = new Date(a.time).getTime();
        const bTime = new Date(b.time).getTime();

        return aTime > bTime ? 1 : (aTime < bTime ? -1 : 0);
    });

    // Группировка сообщений по дате
    const messageGroups: { [key: string]: TMessage[] } = messages.reduce((acc, curr) => {
        const date = formatDate(new Date(curr.time).getTime());

        // @ts-ignore
        return { ...acc, [date]: [...(acc[date] ?? []), curr] };
    }, {});

    // Список сообщений, разделенных датами
    const messageList = Object.entries(messageGroups).reduce((acc, [date, items]) => ([
        ...acc,
        new MessagesDate({ date }),
        ...items.map((item) => new MessagesItem(item))
    ]), []);

    return {
        messageList
    };
});

export { Messages };
export default withData(Messages);
