import type { TChat } from '../../../../utils/types';
import MessengerHead from './messenger-head';
import Chat from '../chat';
import { connect } from '../../../../services/store';

const withChat = connect(({ chat }: { chat?: TChat }) => ({
    chat: chat ? new Chat(chat) : undefined
}));

export { MessengerHead };
export default withChat(MessengerHead);
