import { useState, useEffect } from "react";
import { createClient } from 'urql'

export default function Stake() {
    const APIURL = 'https://api.thegraph.com/subgraphs/name/gyro-defi/gyro-subgraph'

    const tokensQuery = `
    query {
        protocolMetrics(first: 1, orderBy: timestamp, orderDirection: desc) {
            totalSupply
            gyroPrice
            totalValueLocked
            currentAPY
            nextEpochRebase
            nextRebaseRewards
        }
    }
    `

    const client = createClient({
    url: APIURL,
    })

    const getdata = async () => {
        console.log('asdf');
        const data = await client.query(tokensQuery).toPromise()
        console.log(data)
    }

    useEffect(() => {
        getdata()
    })

    return (
        <>

        </>
    );
  }
