import Messenger from './messenger';
import { requireAuth } from '../../services/auth';

export default requireAuth(Messenger);
