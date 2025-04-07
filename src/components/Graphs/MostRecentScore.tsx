import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Box, Card, CardContent, Typography } from "@mui/material"
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/core/api/firebase';
export default function MostRecentScores() {

return(

        <Card variant="outlined" sx={{marginTop:4, }}>     

                <Typography variant='h5' component="div" sx={{marginTop:2}}>
                    Most recent poll:
                </Typography>    

            <CardContent sx={{display: 'flex',alignItems:'center'}}>

                <Gauge width={250} height={200} value={60} startAngle={-110} endAngle={110} sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 40,
                    transform: 'translate(0px, 0px)',
                    },}}
                    text={({ value, valueMax }) => `${value} / ${valueMax}`
                }/>

            </CardContent>    
        </Card>

    )
}