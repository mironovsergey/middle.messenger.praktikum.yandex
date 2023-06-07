import type { TChat } from '../../../../utils/types';
import MessengerFoot from './messenger-foot';
import Message from '../message';
import { connect } from '../../../../services/store';

const withChat = connect(({ chat }: { chat?: TChat }) => ({
    message: chat ? new Message() : undefined
}));

export { MessengerFoot };
export default withChat(MessengerFoot);
