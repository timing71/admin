import { Page, Card, useDataProvider } from '@devfamily/admiral'
import React, { useEffect, useState } from 'react'

const Home: React.FC = () => {
    const dp  = useDataProvider();
    const [sessions, setSessions] = useState<number>();
    const [replays, setReplays] = useState<number>();

    useEffect(
        () => {
            dp.getList('sessions', {}).then(
                ({ meta }) => {
                    setSessions(meta.total)
                }
            )
        },
        [dp]
    );

    useEffect(
        () => {
            dp.getList('replays', {}).then(
                ({ meta }) => {
                    setReplays(meta.total)
                }
            )
        },
        [dp]
    );

    return (
        <Page title="Timing71 Admin">
            <Card>
                <h2>Scheduled sessions</h2>
                <h1>{sessions?.toLocaleString()}</h1>
            </Card>
            <Card>
                <h2>Replays</h2>
                <h1>{replays?.toLocaleString()}</h1>
            </Card>
        </Page>
    )
}

export default Home
