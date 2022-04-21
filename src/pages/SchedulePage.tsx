import StandardPage from '../components/StandardPage';
import Snowman from '../components/Snowman';

const SchedulePage = () => {
    // TODO: add schedule hook here

    return (
        <StandardPage
            title="My Schedule"
            // onPullToRefresh={refresh}
        >
            My schedule!!!
            <Snowman />
        </StandardPage>
    );
};

export default SchedulePage;
