import type { TChat } from '../../../../utils/types';
import MessengerBody from './messenger-body';
import MessagesWithData from '../messages';
import { connect } from '../../../../services/store';

const withChat = connect(({ chat }: { chat?: TChat }) => ({
    messages: chat ? new MessagesWithData({}) : undefined
}));

export { MessengerBody };
export default withChat(MessengerBody);
