import { useState, useEffect } from "react";
import axios from 'axios';
import { createClient } from 'urql'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import SliderUnstyled from '@mui/base/SliderUnstyled';
import styled from 'styled-components';
import './css/calculator.css';
import InputGroup from './components/inputGroup';
import Slider from './components/slider';


export default function Calculator() {
    
    
    const [gyroPrice, setGyroPrice] = useState(0);
    const [sGyroBalance, setsGyroBalance] = useState(0);
    const [gyroAPY, setGyroAPY ] = useState (0);
    const [gyroCurrentAPY, setGyroCurrentAPY ] = useState (0);
    const [gyroPricePurchase, setGyroPricePurchase] = useState(0);
    const [gyroMarketPrice, setGyroMarketPrice] = useState(0);
    const [days, setDays] = useState(30);
    /**
       @ GET DATA FROM API
    */
    const APIURL = 'https://api.thegraph.com/subgraphs/name/gyro-defi/gyro-subgraph'

    const tokensQuery = `
    query {
        protocolMetrics(first: 1, orderBy: timestamp, orderDirection: desc) {
            gyroPrice
            currentAPY
        }
    }
    `
    const client = createClient({
        url: APIURL,
    })

    const getdata = async () => {
        const data = await client.query(tokensQuery).toPromise()
        setGyroCurrentAPY(Math.round(Number(data.data.protocolMetrics[0].currentAPY)).toFixed(1))
        setGyroPrice(Math.round(Number(data.data.protocolMetrics[0].gyroPrice)).toFixed(2))
    }

    useEffect(() => {
        getdata()
    })

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
       @ Handlers
    */

    const handleInput = (e) => {
        let value = (e.target.value);
        switch (e.target.name) {
            case 'sGYRO': setsGyroBalance(value); break;
            case 'APY': setGyroAPY(value); break;
            case 'purchase': setGyroPricePurchase(value); break;
            case 'market': setGyroMarketPrice(value);  break;
            default : break;
        }
    }

    const handleGyroBalance = () => {
        setsGyroBalance(0);
    }
    const handleGyroAPY = () => {
        setGyroAPY(gyroCurrentAPY);
    }
    const handleGyroPricePurchase = () => {
        setGyroPricePurchase(gyroPrice);
    }
    const handleGyroMarketPrice = () => {
        setGyroMarketPrice(gyroPrice);
    }
    const handleSlider = (e) => {
        setDays(e.target.value)
    }
    return (
        <>
            <Title>
                <h3>Calculator</h3>
                <span>Estimate your returns</span>
            </Title>

            <Hr/>

            <StackSection
                direction="row"
                spacing={{xs:1, sm:2}}
                justifyContent="space-between"
                alignItems="center"
                mt={3}
                p={3}
            >
                <Section item xs={6}>
                    <span>GYRO Price</span>
                    <div>{`$${gyroPrice}`}</div>
                </Section>
                <Section item xs={1}>
                    <VericalHR/>
                </Section>
                <Section item xs={5}>
                    <span>Current APY</span>
                    <div>{`${numberWithCommas(gyroCurrentAPY)}%`}</div>
                </Section>
            </StackSection>

            <InputGroup
                value={sGyroBalance}
                button='Max'
                title='sGYRO Balance: 15'
                name='sGYRO'
                handleButton = {handleGyroBalance}
                handleInput = {handleInput}
            />

            <InputGroup
                value={gyroAPY}
                button='Current'
                title='APY (%)'
                name='APY'
                handleButton = {handleGyroAPY}
                handleInput = {handleInput}
            />

            <InputGroup
                value={gyroPricePurchase}
                button='Current'
                title='GYRO price at purchase ($)'
                name='purchase'
                handleButton = {handleGyroPricePurchase}
                handleInput = {handleInput}
            />

            <InputGroup
                value={gyroMarketPrice}
                button='Current'
                title='Projected GYRO market price ($)'
                name='market'
                handleButton = {handleGyroMarketPrice}
                handleInput = {handleInput}
            />

            <SliderStackSection
                mt={3}
                pl={3}
                pr={3}
                pt={1}
                pb={3}
            >
                <h3>{days} days</h3>
                <StyledSlider defaultValue={30} max={365} min={1} step={1} onChange={handleSlider}/>
            </SliderStackSection>

            <StackSection
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                width= "100%"
                mt={3}
                p={3}
            >
                <StatusStake
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <div>Your Initial investment</div>
                    <div>{`$${sGyroBalance*gyroPricePurchase}`}</div>
                </StatusStake>
                <StatusStake
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <div>Current value</div>
                    <div>{`$${gyroPrice*sGyroBalance}`}</div>
                </StatusStake>
                <StatusStake
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <div>GYRO rewards estimate</div>
                    <div>0 GYRO</div>
                </StatusStake>
                <StatusStake
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <div>Projected return</div>
                    <div>$0</div>
                </StatusStake>
            </StackSection>
        </>
    );
}


const Title = styled.div`
    margin-top: 20px;
    margin-left: 15px;
    h3{
        margin : 0px;
    }
    span {
        font-weight: 500;
        font-size: 11px;
        color:#9A9A9D;
    }
`
const Hr = styled.hr`
    background: linear-gradient(90deg, #FF2680 4.22%, #932CE3 93.12%);
    margin-top: 16px;
    border: 0;
    height: 1px;
    width: 100%;
    font-size: 14px;
`
const VericalHR = styled.div`
    border-left: 1px solid #9A9A9D;
    height: 36px;
    width: 1px;
`

const StackSection = styled(Stack)`
    background: ${({ theme }) => theme.section};
    border-radius: 6px;
    box-shadow: 0px 20px 40px rgb(57 57 57 / 3%);
`
const Section = styled(Grid)`
    margin-left: 0px!important;
    span{
        font-weight: 500;
        font-size: 11px;
        color: #9A9A9D;
    }
    div{
        font-weight: 600;
        font-size: 24px;
        color: ${({ theme }) => theme.text}; 
    }
`
const StatusStake = styled(Stack)`
  width: 100%;
  div {
    font-size: 14px;
    &:first-child {
      color: #9A9A9D;
    }
    &:nth-child(2) {
      font-weight: 600;
      color: ${({theme}) => theme.greyText};
    }
  }
`
const SliderStackSection = styled(Stack)`
  background: ${({ theme }) => theme.section};
  border-radius: 6px;
  h3{
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 20px;
  }
  box-shadow: 0px 20px 40px rgb(57 57 57 / 3%);
`
const StyledSlider = styled(SliderUnstyled)`
  color: #1976d2;
  height: 4px;
  width: 100%;
  padding: 13px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }

  & .MuiSlider-rail {
    display: block;
    position: absolute;
    width: 100%;
    height: 6px;
    border-radius: 6px;
    background-color: transparent;
    opacity: 0.38;
    border: 2px solid #cb96f4;
  }

  & .MuiSlider-track {
    display: block;
    position: absolute;
    height: 6px;
    background: linear-gradient(90deg, #FF2680 4.22%, #932CE3 93.12%);
    border-radius: 10px;
  }

  & .MuiSlider-thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    margin-left: -6px;
    margin-top: -7px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 2px solid #932CE3;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`
