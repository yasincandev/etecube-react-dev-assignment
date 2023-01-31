import CompanyTable from '@/pages/companies/CompanyTable'
import { Card, Table } from 'antd'
import { Pie } from 'react-chartjs-2'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
  overflow-y: auto;
  -webkit-animation: Container 0.5s cubic-bezier(0.47, 0, 0.745, 0.715) both;
  animation: Container 0.5s cubic-bezier(0.47, 0, 0.745, 0.715) both;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @-webkit-keyframes Container {
    0% {
      -webkit-transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
      transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
      -webkit-filter: blur(40px);
      filter: blur(40px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0) scaleY(1) scaleX(1);
      transform: translateX(0) scaleY(1) scaleX(1);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
      -webkit-filter: blur(0);
      filter: blur(0);
      opacity: 1;
    }
  }
  @keyframes Container {
    0% {
      -webkit-transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
      transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
      -webkit-filter: blur(40px);
      filter: blur(40px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0) scaleY(1) scaleX(1);
      transform: translateX(0) scaleY(1) scaleX(1);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
      -webkit-filter: blur(0);
      filter: blur(0);
      opacity: 1;
    }
  }
`

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 1em;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    flex-direction: column;
  }
`

export const StyledPie = styled(Pie)`
  background-color: white;
  padding: 10px;
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 5px;
  }
`

export const StyledTable = styled(Table)`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  overflow-x: auto;
  max-width: 200px;
`
