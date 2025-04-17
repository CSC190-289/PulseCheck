import {BarChart} from '@mui/x-charts/BarChart'

import { DocumentReference } from "firebase/firestore";
import { SessionQuestion } from "@/core/types";
import { getDoc } from 'firebase/firestore';
import { useEffect } from 'react';

import api from '@/core/api/firebase';

interface Props {
    answers: {qref: DocumentReference<SessionQuestion>, map: Map<string, Object>}
}

export default function ResultsChart(props: Props) {
    
    const fetchOptions = async () => {
        const responseFreq = new Map()
        
        const qsnap = await api.sessions.questions.options.getAllByRef(props.answers.qref)
        qsnap.docs.forEach(x => console.debug(x.data()))
    }
    
    useEffect(()=> {void fetchOptions()}, [props.answers.qref])

    return(
    <BarChart
        series={[
            { data: [35, 44, 24, 34] },
            { data: [51, 6, 49, 30] },
            { data: [15, 25, 30, 50] },
            { data: [60, 50, 15, 25] },
          ]}
          height={290}
          xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
        />
      );
}