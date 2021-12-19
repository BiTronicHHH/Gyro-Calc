import { number } from 'prop-types';
import {
    StakeDetail,
    Calculator,
    GetData
} from '../components/stake'
function Stake ({gyroBalance}) {
    return (
        <>
            <StakeDetail/>
            <Calculator gyroBalance={gyroBalance} />
            <GetData/>
        </>
    );
}

Stake.propTypes = {
    gyroBalance: number.isRequired
}

export default Stake;