import ChangePassword from './change-password';
import { requireAuth } from '../../services/auth';

export default requireAuth(ChangePassword);
