import type { TChat } from '../../../../utils/types';
import MessengerSide from './messenger-side';
import Chats from '../chats';
import { connect } from '../../../../services/store';

const withChats = connect(({ chats }: { chats?: TChat[] }) => ({
    chats: Array.isArray(chats) && chats.length !== 0
        ? new Chats({ chats }) : undefined
}));

export { MessengerSide };
export default withChats(MessengerSide);
