import type { Indexed } from '../../utils/types';
import Block from '../block';
import Store, { StoreEvents } from './store';
import { isEqual } from '../../utils';

export default function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return (Component: typeof Block<any>) => {
        return class extends Component {
            constructor(props: any) {
                const store = Store.getInstance();
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    state = newState;
                });
            }
        };
    };
}
